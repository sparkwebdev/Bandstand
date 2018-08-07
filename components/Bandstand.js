import React from 'react';
import { ScrollView, View, StyleSheet, Text, Button, Image, AsyncStorage } from 'react-native';
import Expo, { BarCodeScanner, Location, Permissions, Audio} from 'expo';

import bandStands from '../constants/Bandstands';
import geolib from 'geolib'


export default class BandstandScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.visited = visited;
    this.audioPlayer = new Audio.Sound();
    this.audioPlayerLoop = new Audio.Sound();
    this.state = {
      selectedBandstand: null,
      currentlyPlaying: null,
      currentlyLooping: null,
      isPlaying: false,
      isPlayingLoop: false,

      // foundBandstand: 0,

      hasCameraPermission: null,
      doingQR: false,
      // flash: 'off',

      gotNear: false,
      watchLocation: null,
      watchHeading: null,
      subscription: null,
      headingSubscription: null,

      distance: 999,
      distanceReport: "calculating distance",
    };

  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  componentWillUnmount() {
    this.audioPlayerLoop.unloadAsync();
    this.audioPlayer.unloadAsync();
    this.audioPlayer = null;
    this.audioPlayerLoop = null;
  }


  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });
      // this._loadAudio();
    } catch (error) {
      console.error(`Error setting the audio mode::: ${error}`);
    }
    this.startWatchingLocation();
    this.startWatchingHeading();
    this.playLoop(this.state.selectedBandstand);
  }

  playLoop = async (id) => {
      try {
        // await this.audioPlayerLoop.stopAsync();
        await this.audioPlayerLoop.unloadAsync();
        await this.audioPlayerLoop.loadAsync(
          bandStands[id - 1].song.loop
        );
        await this.audioPlayerLoop.setIsLoopingAsync(true);
        await this.audioPlayerLoop.setVolumeAsync(1);
        // await this.audioPlayer.setAudioModeAsync({playsInSilentModeIOS: true});
        await this.audioPlayerLoop.playAsync();
        this.state.isPlayingLoop = true;
        this.state.currentlyLooping = id;
        this.playSound(this.state.selectedBandstand);
      } catch (err) {
        console.warn("Couldn't Play audio", err);
      }
  }

  playSound = async (id) => {
      try {
        // await this.audioPlayer.stopAsync();
        await this.audioPlayer.unloadAsync();
        await this.audioPlayer.loadAsync(
          bandStands[id - 1].song.sound
        );
        await this.audioPlayer.setIsLoopingAsync(true);
        await this.audioPlayer.setVolumeAsync(0.1);
        await this.audioPlayer.playAsync();
        this.state.isPlaying = true;
        this.state.currentlyPlaying = id;
      } catch (err) {
        console.warn("Couldn't Play audio", err);
      }
  }

  handleBarCodeRead = ({ type, data }) => {
    this.setQrState;
    if (data) {
      let id = data.substr(data.length - 1);
      //this.setFoundBandstand(Number(id));
    } else {
      alert('Sorry not found');
    }
  }

  // setFoundBandstand = (id) => {
  //   this.setState({
  //     foundBandstand: id
  //   });
  //   var currentVisited = this.state.visited.filter(function(num) {
  //     return num !== id;
  //   });
  //   currentVisited.push(id);
  //   console.log(JSON.stringify(currentVisited));
  //   this.saveVisited(JSON.stringify(currentVisited));
  // }

  // async saveVisited(value) {
  //   try {
  //     await AsyncStorage.setItem('@VisitedStore:key', value);
  //   } catch (error) {
  //     console.log("Error saving data" + error);
  //   }
  // }

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
    return [distKm.toFixed(2), distMiles.toFixed(3)];
  }


  startWatchingLocation = async () => {
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

  stopWatchingLocation = async () => {
    this.state.subscription.remove();
    this.setState({ subscription: null, watchLocation: null });
  };

  startWatchingHeading = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }

    let subscription = await Location.watchHeadingAsync(heading => {
      this.setState({ watchHeading: heading });
    });
    this.setState({ headingSubscription: subscription });
  };

  stopWatchingHeading = async () => {
    this.state.headingSubscription.remove();
    this.setState({ headingSubscription: null, watchHeading: null });
  };

  renderWatchLocation = (item) => {
    if (this.state.watchLocation) {
      const dist = this.getDistance(
        this.state.watchLocation.coords.latitude,
        this.state.watchLocation.coords.longitude,
        item.coordsTest.lat,
        item.coordsTest.lng,
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
          <Text style={[styles.distance]}>Distance: </Text>
          <Text style={[styles.distance]}>{dist[0]}km</Text>
          <Text style={[styles.miles]}>({dist[1]} miles)</Text>
          {/* <Button onPress={this.stopWatchingLocation} title="Stop Watching Location" /> */}
        </View>
      );
    }
  };

//   renderWatchCompass = () => {
//     if (this.state.watchHeading) {
//       return (
//         <View>
//           <Text>Location.watchHeadingAsync:</Text>
//           <Text>Magnetic North: {this.state.watchHeading.magHeading}</Text>
//           <Text>True North: {this.state.watchHeading.trueHeading}</Text>
//           <Text>Accuracy: {this.state.watchHeading.accuracy}</Text>
//           {/* <Button onPress={this.stopWatchingHeading} title="Stop Watching Heading" /> */}
//         </View>
//       );
//     }
//   };

  render() {

    const selectedBandstand = this.props.selectBandstand;
    this.state.selectedBandstand = selectedBandstand;
    const item = bandStands[selectedBandstand - 1];
    const { hasCameraPermission } = this.state;

    if (this.state.doingQR) {
      if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={styles.container}>
            <Text style={[styles.title]}>{item.title}</Text>
            <View style={styles.qrContainer}>
              {this.state.doingQR ? <BarCodeScanner onBarCodeRead={this.handleBarCodeRead} style={styles.qr} /> : null}
            </View>
            <Text style={[styles.button]} onPress={this.setQrState}>back</Text>
          </View>
        );
      }
    } else {
      return (
        <ScrollView>
          <Text style={[styles.title]}>{item.title}</Text>
          <Text style={[styles.description]}>{item.description}</Text>
          <Image
              source={item.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
          {this.renderWatchLocation(item)}
          {/* {this.renderWatchCompass()} */}
          <Text style={[styles.title]}>{this.state.distanceReport}</Text>
          {this.state.distance < 10 ? 
            <Text style={[styles.button]} onPress={this.setQrState}>scan code</Text>
          : null}
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
  cardImage: {
    borderColor: '#62d3a2',
    borderWidth: 3,
    margin: 15,
    width: '50%',
    height: 200,
    alignSelf: 'center',
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