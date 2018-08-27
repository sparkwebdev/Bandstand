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
      visited : null,
      current : null,

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

  async componentDidMount() {
    this.state.hasFound = false;
    const item = this.props.navigation.getParam('item', 0);
    this.state.current = item.id;
    try {
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
      await this.state.audioPlayerLoop.playAsync();
      
      this.setState({
        hasLoadedSoundscape : true,
        isPlayingSoundscape : true,
        hasLoadedLoop       : true,
        isPlayingLoop       : true
      });

    } catch(error) {
      console.log(error);
    }
    // this.getVisited();
    this.startWatchingLocation();
  }

  componentWillUnmount() {

    this.stopWatchingLocation();
    // if (!this.state.hasFound && this.props.navigation.state.routeName !== 'Bandstand') {
      this.state.audioPlayerSoundscape.stopAsync();
      this.state.audioPlayerLoop.stopAsync();
    // }
  }


  getDistance = (a, b, c, d) => {
    const dist = geolib.getDistance(
      {latitude: a, longitude: b},
      {latitude: c, longitude: d}
    );

    if (dist > 500) {
      this.state.distanceReport = "Still far away :(";
    } else if (dist <= 500 && dist > 100) {
      this.state.distanceReport = "Getting closer...";
    } else if (dist <= 100 && dist > 50) {
      this.state.distanceReport = "You're not far...";
    } else if (dist <= 50 && dist > 10) {
      this.state.distanceReport = "You're close...";
    } else if (dist <= 10) {
      this.state.distanceReport = "You found it! :)";
    }

    if (dist <= 150) {
      this.state.gotNear = true;
      this.setVolume(dist);
    }
    if (dist <= 20) {
      this.state.hasFound = true;
      this.props.saveVisited();
    }
    let distKm = dist / 1000;
    let distMiles = distKm * 0.621371;
    return [distKm.toFixed(2), distMiles.toFixed(3)];
  }

  setVolume = (dist) => {
    if (this.state.isPlayingLoop) {
      this.state.audioPlayerLoop.setVolumeAsync(1 - (dist / 150));
    }
  }

  getVisited = async () => {
    try {
      const value = await AsyncStorage.getItem('visited');
      const valueParsed = JSON.parse(value);
      this.state.visited = valueParsed || [];
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  startWatchingLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Bandstands would like to use your current location within the app to direct you to the bandstand locations. We do not store or share any location data.');
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
        item.coords.lat,
        item.coords.lng,
      );
      return (
        <View>
          {/* <MonoText style={[styles.distance]}>Distance: </MonoText> */}
          <MonoTextBold style={[styles.distance]}>{dist[0]}km</MonoTextBold>
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
    const item = this.props.navigation.getParam('item', 0);
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
          <MonoTextBold style={[styles.distanceReport]}>{this.state.distanceReport}</MonoTextBold>
          {this.renderWatchLocation(item)}
        </View>
        <View>
          {!this.state.hasFound ? 
            <View>
              <Prompt text={"Can you see this marker?\nScan QR code to activate..."} targetId={item.id} target={"QrCode"} source={require("../assets/images/icons/icon_action_qr.png")} />
            </View>
          : 
            <Prompt text={"View Bandstand"} target={"Bandstand"} targetId={item.id} source={require("../assets/images/icons/icon_action_bandstand.png")} />
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
      flex: 1,
      backgroundColor: '#fff',
  },
  cardImage: {
    marginBottom: 15,
    width: '100%',
    height: 250,
    alignSelf: 'center',
  },
  cardContent: {
    marginTop: -125,
    width: '85%',
    // backgroundColor: 'rgba(98,211,162,0.9)',
    backgroundColor: 'rgba(255,255,255,1)',
    paddingTop: 20,
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    // borderColor: Colours.brandGreen,
    // borderWidth: 3,
  },
  distance: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  miles: {
    textAlign: 'center',
    fontSize: 15,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: Colours.brandGreen,
  },
  location: {
    textAlign: 'center',
    marginTop: 5,
  },
  distanceReport: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
});


export default withNavigation(BandstandScreen);