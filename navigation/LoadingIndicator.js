import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import BlurView from "../components/BlurView";

import { MonoTextBold } from "../components/StyledTextBold";
import Colours from "../constants/Colors";

export default class LoadingIndicator extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <BlurView /> */}
        <ActivityIndicator size="large" color={Colours.brandPurple} />
        {/* <Text style={styles.loading}>loading...</Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  loading: {
    color: Colours.brandGreen,
    justifyContent: 'center'
  }
})
