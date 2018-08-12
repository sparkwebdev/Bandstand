import React from "react";
import {
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Audio } from "expo";
import bandStands from "../constants/Bandstands";
import BandstandCard from "../components/BandstandCard";
import NavButton from "../navigation/NavButton";
import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";
import Colours from "../constants/Colors";

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
    let notVisited = [];
    return (
      <View style={styles.containerOuter}>
        <ScrollView style={styles.container} visited={visited}>
          <View style={styles.key}>
            <MonoTextBold>Key{"\n"}</MonoTextBold>
            <MonoText style={styles.keyText}>
              <Image
                style={styles.keyIcon}
                source={require("../assets/images/icons/icon_tick_key.png")}
              /> Visited bandstand{"\n"}{"\n"}
              <Image
                style={styles.keyIcon}
                source={require("../assets/images/icons/icon_play.png")}
              /> Play soundscape{"\n"}{"\n"}
              <Image
                style={styles.keyIcon}
                source={require("../assets/images/icons/icon_pause.png")}
              /> Pause soundscape{"\n"}{"\n"}
              {/* <Image
                style={styles.keyIcon}
                source={require("../assets/images/icons/icon_marker.png")}
              /> Select next bandstand{"\n"}{"\n"} */}
            </MonoText>
          </View>
          {bandStands.filter((a) => {
            if (visited.includes(a.id)) {
              return true;
            } else {
              notVisited.push(a);
              return false;
            }
          }).map((item, index) => {
            return (
              <View
                key={index}
                style={styles.route}
              >
                <Image
                  style={styles.marker}
                  source={require("../assets/images/icons/icon_bandstand_hollow_green.png")}
                />
                <BandstandCard
                  item={item}
                  hasVisited={true}
                  hasAudio={true}
                />
              </View>
            );
          })}
          {notVisited.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.route, { marginTop: 30 }
                ]}
              >
                <Image
                  style={styles.marker}
                  source={require("../assets/images/icons/icon_bandstand_hollow_grey.png")}
                />
                <BandstandCard
                  item={item}
                />
              </View>
            );
          })}
        </ScrollView>
        <NavButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
  },
  key: {
    marginTop: 60,
  },
  keyText: {
    fontSize: 12
  },
  keyIcon: {
    width: 24,
    height: 24,
    marginTop: -8
  },
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    marginLeft: 23,
    paddingLeft: 25,
    paddingRight: 15,
    borderLeftColor: Colours.brandPurple,
    borderLeftWidth: 18,
    overflow: "visible"
  },
  route: {
    marginLeft: -25
  },
  marker: {
    width: 34,
    height: 34,
    position: "absolute",
    left: -26,
    top: 14
  }
});
