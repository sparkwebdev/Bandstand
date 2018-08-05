import React from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Audio } from "expo";
import bandStands from "../constants/Bandstands";
import BandstandCard from "../components/BandstandCard";

// const soundObject = new Expo.Audio.Sound();
// try {
//   soundObject.loadAsync(require('../assets/audio/01.mp3'));
//   soundObject.playAsync();
//   // Your sound is playing!
// } catch (error) {
//   // An error occurred!
// }
export default class PlaylistScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.audioPlayer = new Audio.Sound();
    this.state = {
      isPlaying: false,
      playing: null,
      visited: null
    };
  }

  componentDidMount() {
    Audio.setIsEnabledAsync(true);
    // Audio.setAudioModeAsync({
    //   allowsRecordingIOS: true,
    //   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //   playsInSilentLockedModeIOS: false,
    //   shouldDuckAndroid: true,
    //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    // });
  }

  componentWillUnmount() {
    console.log('unmounting');
    this.audioPlayer.unloadAsync()
  }

  onPressPlayPause = async (id, e) => {
    if (this.state.isPlaying) {
      this.audioPlayer.pauseAsync();
      this.state.isPlaying = false;
    } else {
      try {
        await this.audioPlayer.unloadAsync();
        await this.audioPlayer.loadAsync(
          require("../assets/audio/choir-01.mp3")
        );
        await this.audioPlayer.playAsync();
        this.state.isPlaying = true;
      } catch (err) {
        console.warn("Couldn't Play audio", err);
      }
    }
  };

  render() {
    return (
      <ScrollView style={styles.container} visited={visited}>
        {bandStands.map((item, index) => {
          let hasVisited = visited.includes(item.id);
          return (
            <TouchableHighlight onPress={(e) => this.onPressPlayPause(item.id, e)} key={index}>
              <BandstandCard
                // key={index}
                item={item}
                hasVisited={hasVisited}
                hasLink={false}
                hasAudio={true}
              />
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff"
  }
});
