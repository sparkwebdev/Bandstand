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
    const targetId = this.props.targetId;
    const icon = this.props.source;
    return (
      <View style={styles.prompt}>
        {text ?
          <MonoTextBold style={styles.text}>{text}</MonoTextBold>
        : null }
        <View style={styles.arrows}>
          {/* <Ionicons style={[styles.ionicon, styles.ioniconSmall]} name="ios-arrow-down" size={15} />
          <Ionicons style={[styles.ionicon, styles.ioniconSmall]} name="ios-arrow-down" size={18} /> */}
          <Ionicons style={styles.ionicon} name="ios-arrow-down" size={24} />
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
              if (targetId) {
                this.props.navigation.navigate(target, {
                  itemId: targetId
                })
              } else {
                this.props.navigation.navigate(target)
              }
              if (this.props.onNavigate) {
                this.props.onNavigate();
              }
            }
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
    lineHeight: 18,
    alignSelf: 'center',
    color: Colours.brandPurple
  },
  ioniconSmall: {
    lineHeight: 15,
  },
  marker: {
    width: 64,
    height: 64,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  textAfter: {
    marginTop: 20,
    textAlign: 'center',
  },
  
});