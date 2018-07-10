import React from 'react';
import { Platform, View, StyleSheet, Text, Button, Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { BarCodeScanner, Constants, Location, Permissions } from 'expo';
import bandStands from '../constants/Bandstands';

// const slides = bandStands.bandStands[0].slides;

export default class BandstandScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  

  state = {
    location: null,
    errorMessage: null,
    hasCameraPermission: null,
    doingQR: false,
    selectedBandstand: 1,
    foundBandstand: 0,
    flash: 'off',
    visited: null,
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


  componentDidMount() {
    this.getKey();
    const { navigation } = this.props;
    const selectBandstand = navigation.getParam('itemId', 0);
    if (selectBandstand) {
      this.setSelectBandstand(selectBandstand);
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
    this.setQrState;
    if (data) {
      let id = data.substr(data.length - 1);
      this.setFoundBandstand(id);
      alert('Success!');
    } else {
      alert('Sorry not found');
    }
  }

  setFoundBandstand = (id) => {
    this.setState({
      foundBandstand: id
    });
  }

  setSelectBandstand = (id) => {
    this.setState({
      selectedBandstand: id
    });
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

  render() {
    let selected = this.state.selectedBandstand;

    if (!this.hasVisited(selected)) {
      const { hasCameraPermission } = this.state;
      let text = 'Waiting..';
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        text = JSON.stringify(this.state.location);
      }
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
            <Text>{text}</Text>
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