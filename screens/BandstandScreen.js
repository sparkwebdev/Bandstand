import React from 'react';
import { Platform, View, StyleSheet, Text, Image } from 'react-native';

import { BarCodeScanner, Constants, Location, Permissions } from 'expo';

const slides = [
  {
    key: 'bandstand-0',
    image: require('../assets/images/bandstand-01-00.jpg'),
    imageResizeMode: 'cover',
  },
  {
    key: 'bandstand-1',
    image: require('../assets/images/bandstand-01-01.jpg'),
    imageResizeMode: 'cover',
  },
  {
    key: 'bandstand-2',
    image: require('../assets/images/bandstand-01-02.png'),
    imageResizeMode: 'contain',
  },
  {
    key: 'bandstand-3',
    image: require('../assets/images/bandstand-01-03.png'),
    imageResizeMode: 'contain',
  },
  {
    key: 'bandstand-4',
    image: require('../assets/images/bandstand-01-04.png'),
    imageResizeMode: 'contain',
  },
];

export default class BandstandScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    location: null,
    errorMessage: null,
    hasCameraPermission: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    this.setState({ location });
  };

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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  render() {
    if (1 == 1) {
      const { hasCameraPermission } = this.state;
      let text = 'Waiting..';
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        text = JSON.stringify(this.state.location);
      }
      if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={styles.container}>
          <Text>{text}</Text>
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={styles.qr}
            />
          </View>
        );
      }
    } else {
      return (
        <AppIntroSlider
          slides={slides}
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
  qr: {
    width: 200,
    height: 200,
  },
});