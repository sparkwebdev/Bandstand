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
      <View>
        <Text>Duration: {item.song.duration}</Text>
        <TouchableHighlight onPress={this._onPlayPausePressed}>
        <Image
            style={styles.icon}
            source={
            this.state.isPlaying
                ? require("../assets/images/icon_pause.png")
                : require("../assets/images/icon_play.png")
            }
        />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 34,
    height: 34,
    marginLeft: 10
  }
});
