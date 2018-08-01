import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MonoText } from "../components/StyledText";
import Colours from "../constants/Colors";

export default class BandstandDistance extends React.Component {
  render() {
    const { kmToNext, timeToNext } = this.props;
    return (
      <View>
        <MonoText style={[styles.distance]}>
          <Ionicons style={styles.ionicon} name="ios-walk" size={18} />{" "}
          {kmToNext !== 0 ? kmToNext + " km" : null}
          {timeToNext !== 0 ? " ~ " + timeToNext + " min" : null}
          {timeToNext !== 1 ? "s" : null}
        </MonoText>
        {kmToNext !== 0 ? (
          <Ionicons style={styles.ionicon} name="ios-arrow-down" size={14} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  distance: {
    fontStyle: "italic",
    color: Colours.tone60,
    fontSize: 14,
    paddingLeft: 10
  },
  ionicon: {
    marginLeft: 10,
    color: Colours.tone60
  }
});
