import React from "react";
import {
  Text,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Audio } from "expo";
import bandStands from "../constants/Bandstands";
import BandstandCard from "../components/BandstandCard";

export default class PlaylistScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.audioPlayer = new Audio.Sound();
    this.state = {
      currentlyPlaying: null,
      isPlaying: false,
      isPaused: false,
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
    console.log('componentWillUnmount');
    this.audioPlayer.unloadAsync();
    this.state.isPlaying = false;
    this.state.currentlyPlaying = null;
  }

  onPressPlayPause = async (id, e) => {
    if (!this.state.isPaused && this.state.currentlyPlaying === id) {
      this.audioPlayer.pauseAsync();
      this.state.isPaused = true;
    } else if (this.state.currentlyPlaying === id) {
      this.audioPlayer.playAsync();
      this.state.isPaused = false;
    } else {
      try {
        this.audioPlayer.stopAsync();
        await this.audioPlayer.unloadAsync();
        await this.audioPlayer.loadAsync(
          bandStands[id - 1].song.sound
        );
        await this.audioPlayer.playAsync();
        this.state.isPlaying = true;
        this.state.isPaused = false;
        this.state.currentlyPlaying = id;
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
