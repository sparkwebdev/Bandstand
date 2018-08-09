import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo';


export default class BlurViewExample extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* Adjust the tint and intensity */}
        <BlurView tint="dark" intensity={65} style={StyleSheet.absoluteFill}></BlurView>
      </View>
    );
  }
}