import React from 'react';
import { ActivityIndicator, ScrollView, Platform, View, StyleSheet, Text, Button, Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Expo, { Font, BarCodeScanner, Constants, Location, Permissions, Asset, Audio} from 'expo';
import bandStands from '../constants/Bandstands';
import geolib from 'geolib'

// const slides = bandStands.bandStands[0].slides;



export default class BandstandScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.audioPlayer = new Audio.Sound();
    this.audioPlayerLoop = new Audio.Sound();
    this.state = {
      hasCameraPermission: null,
      doingQR: false,
      selectedBandstand: 1,
      foundBandstand: 0,
      flash: 'off',
      visited: null,
      isPlayingLoop: false,
      isPlaying: false,
      gotNear: false,
      watchLocation: null,
      watchHeading: null,
      subscription: null,
      headingSubscription: null,
      fontLoaded: false,
      distance: 1000000,
      distanceReport: "calculating distance",
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }


  componentDidMount() {
    this.getVisited();
    (async () => {
      await Font.loadAsync({
        'Source Code Pro': require('../assets/fonts/SourceCodePro-Light.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
    this._startWatchingLocation();
    this._startWatchingHeading();
    this._onPlayPausePressed();
  }


  componentWillReceiveProps() {
    const { navigation } = this.props;
    const selectBandstand = navigation.getParam('itemId', 0);
    if (selectBandstand) {
      this.setSelectBandstand(selectBandstand);
    }
  }


  _renderItem = props => (
    <View
      style={[styles.mainContent, {
        // paddingTop: props.topSpacer,
        // paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
    >
        {props.image ? <Image style={[styles.image, {resizeMode: props.imageResizeMode,}]} source={props.image} /> : null }
        {props.image2 ? <Image style={[styles.image, {resizeMode: props.image2ResizeMode,}]} source={props.image2} /> : null }
        {props.key === "welcome-4" ? <Text style={[styles.button]}>choose bandstand</Text> : null }
    </View>
  );

  _handleBarCodeRead = ({ type, data }) => {
    this.setQrState;
    if (data) {
      let id = data.substr(data.length - 1);
      this.setFoundBandstand(Number(id));
    } else {
      alert('Sorry not found');
    }
  }

  _onPlayPausePressed = async () => {
    if (this.state.isPlaying) {
      this.audioPlayerLoop.pauseAsync();
      this.audioPlayer.pauseAsync();
      this.state.isPlayingLoop = false;
      this.state.isPlaying = false;
    } else if (this.state.distance < 100000000) {
      try {
        await this.audioPlayerLoop.unloadAsync()
        await this.audioPlayerLoop.loadAsync(require("../assets/audio/01.mp3"));
        await this.audioPlayerLoop.setIsLoopingAsync(true);
        await this.audioPlayerLoop.setVolumeAsync(0.6);
        await this.audioPlayerLoop.playAsync();
        await this.audioPlayer.loadAsync(require("../assets/audio/choir-01.mp3"));
        await this.audioPlayer.setIsLoopingAsync(true);
        await this.audioPlayer.setVolumeAsync(0);
        this.state.isPlayingLoop = true;
      } catch (err) {
        console.warn("Couldn't Play audio", err);
      }
    }
  }

  setFoundBandstand = (id) => {
    this.setState({
      foundBandstand: id
    });
    var currentVisited = this.state.visited.filter(function(num) {
      return num !== id;
    });
    currentVisited.push(id);
    console.log(JSON.stringify(currentVisited));
    this.saveVisited(JSON.stringify(currentVisited));
  }

  setSelectBandstand = (id) => {
    this.setState({
      selectedBandstand: id
    });
  }

  async saveVisited(value) {
    try {
      await AsyncStorage.setItem('@VisitedStore:key', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  hasVisited(id) {
    if (this.state.visited !== null) {
      if (this.state.visited.includes(id)) {
        return true;
      }
    }
    return false;
  }

  setQrState = () => {
    this.setState({
      doingQR: !this.state.doingQR
    });
  }

  getDistance = (a, b, c, d) => {
    const dist = geolib.getDistance(
      {latitude: a, longitude: b},
      {latitude: c, longitude: d}
    );
    this.state.distance = dist;
    if (dist > 1000) {
      this.state.distanceReport = "You are far away :(";
    } else if (dist > 500) {
      this.state.distanceReport = "Still a bit to go...";
    } else if (dist <= 500 && dist > 100) {
      this.state.distanceReport = "Getting closer...";
    } else if (dist <= 100 && dist > 50) {
      this.state.distanceReport = "Not long now!";
    } else if (dist <= 50 && dist > 10) {
      this.state.distanceReport = "You are very close!";
    } else if (dist <= 10) {
      this.state.distanceReport = "You made it!! :)";
    }
    if (dist <= 100) {
      if (this.state.gotNear === false) {
        this.audioPlayer.playAsync();
        this.state.isPlaying = true;
        this.state.gotNear = true;
      }
      if (this.state.isPlaying) {
        this.audioPlayer.setVolumeAsync(1 - (dist / 100));
      }
    }
    let distKm = dist / 1000;
    let distMiles = distKm * 0.621371;
    return [distKm.toFixed(2), distMiles.toFixed(1)];
  }
  
  async getVisited() {
    try {
      const value = await AsyncStorage.getItem('@VisitedStore:key');
      let visited = JSON.parse(value);
      this.setState({visited: visited});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }


  _startWatchingLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }

    let subscription = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 6000,
        distanceInterval: 5,
      },
      location => {
        console.log(`Got location: ${JSON.stringify(location.coords)}`);
        this.setState({ watchLocation: location });
      }
    );

    this.setState({ subscription });
  };

  _stopWatchingLocation = async () => {
    this.state.subscription.remove();
    this.setState({ subscription: null, watchLocation: null });
  };

  _startWatchingHeading = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }

    let subscription = await Location.watchHeadingAsync(heading => {
      this.setState({ watchHeading: heading });
    });
    this.setState({ headingSubscription: subscription });
  };

  _stopWatchingHeading = async () => {
    this.state.headingSubscription.remove();
    this.setState({ headingSubscription: null, watchHeading: null });
  };

  renderWatchLocation = () => {
    if (this.state.watchLocation) {
      const dist = this.getDistance(
        this.state.watchLocation.coords.latitude,
        this.state.watchLocation.coords.longitude,
        bandStands.bandStands[this.state.selectedBandstand - 1].coords.lat,
        bandStands.bandStands[this.state.selectedBandstand - 1].coords.lng,
      );
      return (
        <View>
          {/* <Text>
            {this.state.polyfill
              ? 'navigator.geolocation.watchPosition'
              : 'Location.watchPositionAsync'}
            :
          </Text> */}
          {/* <Text>Latitude: {this.state.watchLocation.coords.latitude}</Text>
          <Text>Longitude: {this.state.watchLocation.coords.longitude}</Text> */}
          <Text style={[styles.distance, { fontFamily: 'Source Code Pro' }]}>Distance: </Text>
          <Text style={[styles.distance, { fontFamily: 'Source Code Pro' }]}>{dist[0]}km</Text>
          <Text style={[styles.miles, { fontFamily: 'Source Code Pro' }]}>({dist[1]} miles)</Text>
          {/* <Button onPress={this._stopWatchingLocation} title="Stop Watching Location" /> */}
        </View>
      );
    }
  };

  renderWatchCompass = () => {
    if (this.state.watchHeading) {
      return (
        <View>
          <Text>Location.watchHeadingAsync:</Text>
          <Text>Magnetic North: {this.state.watchHeading.magHeading}</Text>
          <Text>True North: {this.state.watchHeading.trueHeading}</Text>
          <Text>Accuracy: {this.state.watchHeading.accuracy}</Text>
          {/* <Button onPress={this._stopWatchingHeading} title="Stop Watching Heading" /> */}
        </View>
      );
    }
  };

  render() {
    let selected = this.state.selectedBandstand;

    if (!this.hasVisited(selected)) {
      const { hasCameraPermission } = this.state;
      if (this.state.doingQR) {
        if (hasCameraPermission === null) {
          return <Text>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return !this.state.fontLoaded ? null : (
            <View style={styles.container}>
              <Text style={[styles.title]}>{bandStands.bandStands[this.state.selectedBandstand - 1].title}</Text>
              <View style={styles.qrContainer}>
                {this.state.doingQR ? <BarCodeScanner onBarCodeRead={this._handleBarCodeRead} style={styles.qr} /> : null}
              </View>
              <Text style={[styles.button]} onPress={this.setQrState}>back</Text>
            </View>
          );
        }
      } else {
        return !this.state.fontLoaded ? null : (
          <ScrollView>
            <Text style={[styles.title, { fontFamily: 'Source Code Pro' }]}>{bandStands.bandStands[this.state.selectedBandstand - 1].title}</Text>
            <Text style={[styles.description, { fontFamily: 'Source Code Pro' }]}>{bandStands.bandStands[this.state.selectedBandstand - 1].description}</Text>
            <Image
                source={bandStands.bandStands[this.state.selectedBandstand - 1].image}
                style={styles.cardImage}
                resizeMode="cover"
              />

            {this.renderWatchLocation()}
            {/* {this.renderWatchCompass()} */}
            {/* You are very close! */}
            <Text style={[styles.title, { fontFamily: 'Source Code Pro' }]}>{this.state.distanceReport}</Text>
            {this.state.distance < 10 ? 
              <Text style={[styles.button, { fontFamily: 'Source Code Pro' }]} onPress={this.setQrState}>scan code</Text>
            : null}
          </ScrollView>
        )
      }
    } else {
      return !this.state.fontLoaded ? null : (
        <AppIntroSlider
          slides={bandStands.bandStands[this.state.selectedBandstand - 1].slides}
          renderItem={this._renderItem}
          dotColor='rgb(115,63,216)'
          activeDotColor='rgb(255,255,0)'
          hideNextButton
          hideDoneButton
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  mainContent: {
      backgroundColor: "#ffffff",
  },
  image: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
  },
  cardImage: {
    borderColor: '#62d3a2',
    borderWidth: 3,
    margin: 15,
    width: '50%',
    height: 200,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  qrContainer: {
    padding: 5,
    borderColor: '#62d3a2',
    borderWidth: 3,
    marginBottom: 10,
  },
  qr: {
    width: "100%",
    height: 320,
  },
  distance: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  miles: {
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#62d3a2',
    color: "#7f47dd",
    fontSize: 24,
    marginLeft: "20%",
    width: '60%',
    padding: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    padding: 10,
  }
});