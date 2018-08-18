import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, AsyncStorage } from 'react-native';
import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";
import { BarCodeScanner, BlurView, Permissions } from 'expo';
import NavBackButton from "../navigation/NavButton";
import Colours from '../constants/Colors';
import { withNavigation } from 'react-navigation';


class QrCode extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    // this.audioPlayer = new Audio.Sound();
    // this.audioPlayerLoop = new Audio.Sound();
    this.state = {
      doingQR: true,
      hasCameraPermission: null,
      // flash: 'off',
    };

  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  handleBarCodeRead = ({ type, data }) => {
    this.setQrState;
    if (data) {
      let id = data.substr(data.length - 1);
      selectedBandstand = this.props.navigation.getParam('itemId', 0);
      console.log(selectedBandstand);
      console.log(id);
      if (id == selectedBandstand) {
        this.setState({
          doingQR: !this.state.doingQR
        });
        alert('Well done!');
        this.props.screenProps.saveVisited(selectedBandstand);
        this.props.navigation.goBack();
        // console.log(this.props.navigation);
      } else {
        alert('Sorry, that\'s the wrong Bandstand');
        this.props.navigation.goBack();
      }
      // this.setFoundBandstand(Number(id));
    } else {
      alert('Sorry not found');
    }
  }

  setQrState = (id) => {
    this.setState({
      doingQR: !this.state.doingQR
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <MonoText>Requesting for camera permission</MonoText>;
    } else if (hasCameraPermission === false) {
      return <MonoText>No access to camera</MonoText>;
    } else {
      return (
        <View style={styles.container}>
          {/* Adjust the tint and intensity */}
          <BlurView tint="dark" intensity={65} style={StyleSheet.absoluteFill}></BlurView>
            <MonoTextBold style={[styles.title]}>Scan the QR Code</MonoTextBold>
            <View style={styles.qrContainer}>
              {this.state.doingQR ? <BarCodeScanner onBarCodeRead={this.handleBarCodeRead} style={styles.qr} /> : null}
            </View>
            {/* <NavBackButton /> Why not working? */}
            <TouchableOpacity style={styles.backButton} 
            onPress={() =>
              this.props.navigation.goBack(null)
            }>
              <Image
                style={styles.backButtonImg}
                source={require("../assets/images/icons/icon_back.png")}
              />
            </TouchableOpacity>
        </View>
      )
    }
  }
}

export default withNavigation(QrCode);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },
  backButton: {
    width: 46,
    height: 46,
    position: "absolute",
    zIndex: 9999999,
    left: 30,
    top: 46
  },
  title: {
    fontSize: 20,
    color: Colours.brandGreen,
    textAlign: 'center',
  },
  backButtonImg: {
    width: '100%',
    height: '100%',
  },
  qrContainer: {
    margin: 20,
    borderColor: Colours.brandGreen,
    borderWidth: 3,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  qr: {
    width: "100%",
    height: 320,
  },
});