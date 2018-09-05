import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, AsyncStorage, TouchableWithoutFeedback } from "react-native";
import Expo, { Audio} from 'expo';
import Bandstand from "../components/Bandstand";
import BandstandVisited from "../components/BandstandVisited";
import { withNavigation } from 'react-navigation';

class BandstandScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      // visited : null,

      audioPlayerSoundscape : new Audio.Sound(),
      hasLoadedSoundscape   : false,
      isPlayingSoundscape   : false,

      audioPlayerLoop : new Audio.Sound(),
      hasLoadedLoop   : false,
      isPlayingLoop   : false,

      // watchLocation   : null,
      // watchHeading    : null,
      // subscription    : null,
      // headingSubscription : null,
      // gotNear         : false,
      // hasFound        : false,

      distance        : 999,
      // distanceReport  : "calculating distance",
      // markerHeading    : null,
    };

  }

  async componentDidMount() {
    this.state.hasFound = false;
    const item = this.props.navigation.getParam('item', 0);
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
  }

  componentWillUnmount() {
    this.state.audioPlayerSoundscape.stopAsync();
    this.state.audioPlayerLoop.stopAsync();
  }

  setVolume = (dist) => {
    if (this.state.isPlayingLoop) {
      targetVolume = 1 - (dist / 150);
      if (targetVolume >= 0 && targetVolume <= 1) {
        this.state.audioPlayerLoop.setVolumeAsync(targetVolume);
      } else {
        this.state.audioPlayerLoop.setVolumeAsync(0);
      }
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

  setDistance = async (distance) => {
    this.setState({distance: distance});
    setVolume(distance);
  }

  render() {
    const visited = this.props.screenProps.visited;
    const selectedBandstand = this.props.navigation.getParam('itemId', 0);
    const hasVisited = visited.includes(selectedBandstand);
    if (hasVisited || visited.length > 2) {
      this.setVolume(0);
      return (
        <View style={styles.container}>
          <BandstandVisited navigation={this.props.navigation} />
          {/* <NavButton /> */}
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
    } else {
      this.setVolume(999);
      return (
        <View style={styles.container}>
          <Bandstand setVolume={this.setVolume.bind()} navigation={this.props.navigation} saveVisited={this.props.screenProps.saveVisited.bind(null, selectedBandstand)} />
          {/* <NavButton /> */}
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

export default withNavigation(BandstandScreen);

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