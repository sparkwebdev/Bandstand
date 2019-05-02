import React from "react";
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet
} from "react-native";

export default class BandstandCardPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }
  render() {
    const item = this.props.item;
    return (
      <TouchableHighlight onPress={this._onPlayPausePressed}>
      <Image
          style={styles.icon}
          source={
          this.state.isPlaying
              ? require("../assets/images/icons/icon_pause.png")
              : require("../assets/images/icons/icon_play.png")
          }
      />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 56,
    height: 56,
  }
});
