import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Image,
  StyleSheet
} from "react-native";
import { Audio } from "expo";
import LoadingIndicator from "../navigation/LoadingIndicator";

export default class BandstandCardPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: true,
      hasLoaded: false,
      isPlaying: false,
      isPaused: true,
      audioPlayer: new Audio.Sound(),
      audioPlayerDuration: null,
    };
    // Bindings
    this.onPlayPausePressed = this.onPlayPausePressed.bind(this);

  }

  async componentWillMount(){
    try {
      await Audio.setIsEnabledAsync(true);
      const item = this.props.item;
      await this.state.audioPlayer.loadAsync(
        item.song.loop
      );
      await this.state.audioPlayer.setIsLoopingAsync(true);
      this.setState({hasLoaded: true});
    } catch(error) {
      console.log(error);
    }
  }

  onPlayPausePressed = async () => {
    if (this.state.hasLoaded === true) {
      try {
        await this.state.audioPlayer.setIsLoopingAsync(true);
        if (this.state.isPaused) {
          await this.state.audioPlayer.playAsync();
        } else {
          await this.state.audioPlayer.pauseAsync();
        }
        this.setState(prevState => ({
          isPlaying: !prevState.isPlaying,
          isPaused: !prevState.isPaused
        }));
      } catch (err) {
        console.warn("Couldn't Play audio", err);
      }
    }
  };

  render() {
    const item = this.props.item;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPlayPausePressed(item)}>
        <View>
        {!this.state.hasLoaded ? <LoadingIndicator /> : 
        <Image
            style={styles.icon}
            source={
            this.state.isPlaying
                ? require("../assets/images/icons/icon_pause.png")
                : require("../assets/images/icons/icon_play.png")
            }
        />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 56,
    height: 56,
  }
});
