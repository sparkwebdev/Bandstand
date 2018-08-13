import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";
import { BlurView } from 'expo';
import NavBackButton from "../navigation/NavButton";
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
      doingQR: false,
      hasCameraPermission: null,
      // flash: 'off',
    };

  }


  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
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
  setQrState = () => {
    this.setState({
      doingQR: !this.state.doingQR
    });
  }


  render() {

    // const { hasCameraPermission } = this.state;

    // if (hasCameraPermission === null) {
    //     return <Text>Requesting for camera permission</Text>;
    //   } else if (hasCameraPermission === false) {
    //     return <Text>No access to camera</Text>;
    //   } else {
    //     return (
    //       <View style={styles.container}>
    //         <Text style={[styles.title]}>{item.title}</Text>
    //         <View style={styles.qrContainer}>
    //           {this.state.doingQR ? <BarCodeScanner onBarCodeRead={this.handleBarCodeRead} style={styles.qr} /> : null}
    //         </View>
    //         <Text style={[styles.button]} onPress={this.setQrState}>back</Text>
    //       </View>
    //     );
    //   }
    return (
      <View style={{ flex: 1 }}>
        {/* Adjust the tint and intensity */}
        <BlurView tint="dark" intensity={65} style={StyleSheet.absoluteFill}></BlurView>
        <MonoText>Testing</MonoText>
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
    );
  }
}

export default withNavigation(QrCode);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 46,
    height: 46,
    position: "absolute",
    zIndex: 9999999,
    left: 30,
    top: 46
  },
  backButtonImg: {
    width: '100%',
    height: '100%',
  }
});