import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import bandStands from '../constants/Bandstands';

export default class BandstandVisited extends React.Component {

  renderItem = props => (
    <View
      style={[styles.mainContent, {
        // paddingTop: props.topSpacer,
        // paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
    >
        {props.image ? <Image style={[styles.image, {resizeMode: props.imageResizeMode,}]} source={props.image} /> : null }
        {props.image2 ? <Image style={[styles.image, {resizeMode: props.image2ResizeMode,}]} source={props.image2} /> : null }
        {props.key === "welcome-4" ? <Text style={[styles.button]}>choose bandstand</Text> : null }
    </View>
  );

  render() {
    const selectedBandstand = this.props.selectBandstand;
    const item = bandStands[selectedBandstand - 1];
    return (
        <AppIntroSlider
            slides={item.slides}
            renderItem={this.renderItem}
            dotColor='rgb(115,63,216)'
            activeDotColor='rgb(255,255,0)'
            hideNextButton
            hideDoneButton
        />
    )
  }
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
    button: {
      backgroundColor: '#62d3a2',
      color: "#7f47dd",
      fontSize: 24,
      marginLeft: "20%",
      width: '60%',
      padding: 20,
      textAlign: 'center',
    },
});