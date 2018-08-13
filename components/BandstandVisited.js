import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import bandStands from '../constants/Bandstands';
import Colours from '../constants/Colors';

export default class BandstandVisited extends React.Component {

  renderItem = props => (
    <View
      style={[styles.container, {
        width: props.width,
        height: props.height,
      }]}
    >
        {props.image ? <Image style={[styles.image, {resizeMode: props.imageResizeMode,}]} source={props.image} /> : null }
        {props.content ? props.content : null}
    </View>
  );

  render() {
    const selectedBandstand = this.props.navigation.getParam('itemId', 0);
    const item = bandStands[selectedBandstand - 1];
    return (
        <AppIntroSlider
            slides={item.slides}
            renderItem={this.renderItem}
            dotColor={Colours.brandPurple}
            activeDotColor={Colours.brandYellow}
            hideNextButton
            hideDoneButton
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  image: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
  },
  // button: {
  //   backgroundColor: '#62d3a2',
  //   color: "#7f47dd",
  //   fontSize: 24,
  //   marginLeft: "20%",
  //   width: '60%',
  //   padding: 20,
  //   textAlign: 'center',
  // },
});