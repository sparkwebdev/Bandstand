import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Colours from '../constants/Colors';
import { withNavigation } from 'react-navigation';

class Prompt extends React.Component {
  render() {
    return (
      <View style={styles.prompt}>
        <View style={styles.arrows}>
          <Ionicons style={styles.ionicon} name="ios-arrow-down" size={18} />
          <Ionicons style={styles.ionicon} name="ios-arrow-down" size={24} />
          <Ionicons style={styles.ionicon} name="ios-arrow-down" size={30} />
        </View>
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate("Bandstands")
          }
        >
          <Image
            style={styles.marker}
            source={require("../assets/images/icons/icon_bandstand_marker.png")}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default withNavigation(Prompt);

const styles = StyleSheet.create({
  prompt: {
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10
  },
  ionicon: {
    lineHeight: 20,
    alignSelf: 'center',
    color: Colours.brandPurple
  },
  marker: {
    width: 66,
    height: 66,
  },
  
});