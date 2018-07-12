import React from 'react';
import { ActivityIndicator, ScrollView, Platform, View, StyleSheet, Text, Button, Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { BarCodeScanner, Constants, Location, Permissions } from 'expo';
import bandStands from '../constants/Bandstands';

// const slides = bandStands.bandStands[0].slides;

export default class BandstandScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  

  state = {
    hasCameraPermission: null,
    doingQR: false,
    selectedBandstand: 1,
    foundBandstand: 0,
    flash: 'off',
    visited: null,
    watchLocation: null,
    watchHeading: null,
    subscription: null,
    headingSubscription: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }


  componentDidMount() {
    this.getKey();
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

  setFoundBandstand = (id) => {
    this.setState({
      foundBandstand: id
    });
    var currentVisited = this.state.visited.filter(function(num) {
      return num !== id;
    });
    currentVisited.push(id);
    console.log(JSON.stringify(currentVisited));
    this.saveKey(JSON.stringify(currentVisited));
  }

  setSelectBandstand = (id) => {
    this.setState({
      selectedBandstand: id
    });
  }

  async saveKey(value) {
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

  
  async getKey() {
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
        timeInterval: 1000,
        distanceInterval: 1,
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
      return (
        <View>
          <Text>
            {this.state.polyfill
              ? 'navigator.geolocation.watchPosition'
              : 'Location.watchPositionAsync'}
            :
          </Text>
          <Text>Latitude: {this.state.watchLocation.coords.latitude}</Text>
          <Text>Longitude: {this.state.watchLocation.coords.longitude}</Text>
          <Button onPress={this._stopWatchingLocation} title="Stop Watching Location" />
        </View>
      );
    } else if (this.state.subscription) {
      return (
        <View style={{ padding: 10 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Button
        onPress={
          this.state.polyfill
            ? this._startWatchingLocationWithPolyfill
            : this._startWatchingLocation
        }
        title="Watch my location"
      />
    );
  };

  renderWatchCompass = () => {
    if (this.state.watchHeading) {
      return (
        <View>
          <Text>Location.watchHeadingAsync:</Text>
          <Text>Magnetic North: {this.state.watchHeading.magHeading}</Text>
          <Text>True North: {this.state.watchHeading.trueHeading}</Text>
          <Text>Accuracy: {this.state.watchHeading.accuracy}</Text>
          <Button onPress={this._stopWatchingHeading} title="Stop Watching Heading" />
        </View>
      );
    }

    return <Button onPress={this._startWatchingHeading} title="Watch my heading (compass)" />;
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
          return (
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
        return (
          <View>
            <Text style={[styles.title]}>{bandStands.bandStands[this.state.selectedBandstand - 1].title}</Text>
            <Text style={[styles.description]}>{bandStands.bandStands[this.state.selectedBandstand - 1].description}</Text>
            {this.renderWatchLocation()}
            {this.renderWatchCompass()}
            <Text style={[styles.title]}>You are very close!</Text>
            <Text style={[styles.button]} onPress={this.setQrState}>scan code</Text>
          </View>
        )
      }
    } else {
      return (
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
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
  },
  description: {
    padding: 10,
  }
});