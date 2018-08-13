import React from 'react';
import { ScrollView, View, StyleSheet, Text, Button, TouchableWithoutFeedback, Image, AsyncStorage } from 'react-native';
import Expo, { BarCodeScanner, Location, Permissions, Audio} from 'expo';

import bandStands from '../constants/Bandstands';
import geolib from 'geolib'

import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";
import { BlurView } from 'expo';
import Colours from '../constants/Colors';
import { withNavigation } from 'react-navigation';
import Prompt from "../components/Prompt";



class BandstandScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    // this.audioPlayer = new Audio.Sound();
    // this.audioPlayerLoop = new Audio.Sound();
    this.state = {

      audioPlayerSoundscape : new Audio.Sound(),
      hasLoadedSoundscape   : false,
      isPlayingSoundscape   : false,

      audioPlayerLoop : new Audio.Sound(),
      hasLoadedLoop   : false,
      isPlayingLoop   : false,

      watchLocation   : null,
      watchHeading    : null,
      subscription    : null,
      headingSubscription : null,
      gotNear         : false,
      hasFound        : false,

      distance        : 999,
      distanceReport  : "calculating distance",
    };

  }

  async componentWillMount() {
    try {
      const item = this.props.item;

      await Audio.setIsEnabledAsync(true);

      await this.state.audioPlayerSoundscape.loadAsync(
        item.song.soundscape
      );
      await this.state.audioPlayerSoundscape.setIsLoopingAsync(true);
      await this.state.audioPlayerSoundscape.setVolumeAsync(1);
      await this.state.audioPlayerSoundscape.playAsync();

      await this.state.audioPlayerLoop.loadAsync(
        item.song.loop
      );
      await this.state.audioPlayerLoop.setIsLoopingAsync(true);
      await this.state.audioPlayerLoop.setVolumeAsync(0);
      
      this.setState({
        hasLoadedSoundscape : true,
        // isPlayingSoundscape : true,
        hasLoadedLoop       : true,
        isPlayingLoop       : true
      });

    } catch(error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    this.startWatchingLocation();
    // this.startWatchingHeading();
    // this.playLoop(this.state.selectedBandstand);
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

  getDistance = (a, b, c, d) => {
    const dist = geolib.getDistance(
      {latitude: a, longitude: b},
      {latitude: c, longitude: d}
    );
    this.setState({
      distance : dist
    });

    this.setFeedback(dist);
    if (dist <= 100) {
      this.state.gotNear = true;
      this.setVolume(dist);
    }
    if (dist <= 10) {
      this.stopWatchingLocation();
      this.setState({
        hasFound : true
      });
    }
    let distKm = dist / 1000;
    let distMiles = distKm * 0.621371;
    return [distKm.toFixed(2), distMiles.toFixed(3)];
  }

  setFeedback = (dist) => {
    let feedback = "";
    if (dist > 500) {
      feedback = "Still far away :(";
    } else if (dist <= 500 && dist > 100) {
      feedback = "Getting closer...";
    } else if (dist <= 100 && dist > 50) {
      feedback = "You're not far...";
    } else if (dist <= 50 && dist > 10) {
      feedback = "You're close...";
    } else if (dist <= 10) {
      feedback = "You found it! :)";
    }
    this.state.distanceReport = feedback;
  }

  setVolume = (dist) => {
    if (this.state.gotNear === false) {
      // await this.state.audioPlayerLoop.playAsync();
      this.setState({
        isPlayingSoundscape : true
      });
    }
    if (this.state.isPlaying) {
      // this.audioPlayer.setVolumeAsync(1 - (dist / 100));
    }
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

  // startWatchingHeading = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     return;
  //   }

  //   let subscription = await Location.watchHeadingAsync(heading => {
  //     this.setState({ watchHeading: heading });
  //   });
  //   this.setState({ headingSubscription: subscription });
  // };

  // stopWatchingHeading = async () => {
  //   this.state.headingSubscription.remove();
  //   this.setState({ headingSubscription: null, watchHeading: null });
  // };

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
          <MonoText style={[styles.distance]}>Distance: </MonoText>
          <MonoText style={[styles.distance]}>{dist[0]}km</MonoText>
          <MonoText style={[styles.miles]}>({dist[1]} miles)</MonoText>
          {/* <Text>
            {this.state.polyfill
              ? 'navigator.geolocation.watchPosition'
              : 'Location.watchPositionAsync'}
            :
          </Text>
          <Text>Latitude: {this.state.watchLocation.coords.latitude}</Text>
          <Text>Longitude: {this.state.watchLocation.coords.longitude}</Text>
          <Button onPress={this.stopWatchingLocation} title="Stop Watching Location" /> */}
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
    const selectedBandstand = this.props.navigation.getParam('itemId', 0);
    console.log(selectedBandstand);
    // this.state.selectedBandstand = selectedBandstand;
    const item = bandStands[selectedBandstand];
    // const navigation = this.props.navigation;
    return (
      <View style={styles.card}>
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <MonoTextBold style={[styles.title]}>{item.title}</MonoTextBold>
          <MonoTextBold style={[styles.location]}>{item.location}</MonoTextBold>
          {/* {this.renderWatchCompass()} */}
          <MonoTextBold style={[styles.title, styles.distanceReport]}>{this.state.distanceReport}</MonoTextBold>
          {this.renderWatchLocation(item)}
          {!this.state.hasFound ? 
            <View>
              <MonoTextBold>scan QR code</MonoTextBold>
              <Prompt target={"QrCode"} source={require("../assets/images/icons/icon_action_qr.png")} />
            </View>
          : 
            <Prompt text={"View Bandstand"} target={"Bandstand"} source={require("../assets/images/icons/icon_action_bandstand.png")} />
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15,
  },
  cardImage: {
    marginBottom: 15,
    width: '100%',
    height: 250,
    alignSelf: 'center',
  },
  cardContent: {
    marginTop: -100,
    width: '85%',
    backgroundColor: '#fff',
    paddingTop: 20,
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    // borderColor: Colours.brandGreen,
    // borderWidth: 3,
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
    textAlign: 'center',
  },
  location: {
    textAlign: 'center',
    marginTop: 5,
  },
  distanceReport: {
    marginTop: 50,
  },
  description: {
    padding: 10,
  },
});


export default withNavigation(BandstandScreen);