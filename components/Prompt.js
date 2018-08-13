import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Colours from '../constants/Colors';
import { withNavigation } from 'react-navigation';
import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";

class Prompt extends React.Component {
  render() {
    const text = this.props.text;
    const textAfter = this.props.textAfter;
    const target = this.props.target;
    const icon = this.props.source;
    return (
      <View style={styles.prompt}>
        {text ?
          <MonoTextBold style={styles.text}>{text}</MonoTextBold>
        : null }
        <View style={styles.arrows}>
          <Ionicons style={styles.ionicon} name="ios-arrow-down" size={18} />
          <Ionicons style={styles.ionicon} name="ios-arrow-down" size={24} />
          <Ionicons style={styles.ionicon} name="ios-arrow-down" size={30} />
        </View>
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate(target)
          }
        >
          <Image
            style={styles.marker}
            source={icon}
          />
        </TouchableWithoutFeedback>
        {textAfter ?
          <MonoTextBold style={styles.textAfter}>{textAfter}</MonoTextBold>
        : null }
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
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
  textAfter: {
    marginTop: 50,
    textAlign: 'center',
  },
  
});