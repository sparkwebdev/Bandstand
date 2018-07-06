import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
    mainContent: {
        backgroundColor: "#ffffff",
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
    }
});

const slides = [
  {
    key: 'welcome-0',
    image: require('../assets/images/welcome-00.jpg'),
    imageResizeMode: 'cover',
    image2: require('../assets/images/welcome-00.png'),
    image2ResizeMode: 'contain',
  },
  {
    key: 'welcome-1',
    image: require('../assets/images/welcome-01.png'),
    imageResizeMode: 'contain',
  },
  {
    key: 'welcome-2',
    image: require('../assets/images/welcome-02.png'),
    imageResizeMode: 'contain',
  },
  {
    key: 'welcome-3',
    image: require('../assets/images/welcome-03.png'),
    imageResizeMode: 'contain',
  },
  {
    key: 'welcome-4',
    image: require('../assets/images/welcome-04.png'),
    imageResizeMode: 'contain',
  },
];

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _renderItem = props => (
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
    return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          dotColor='rgb(115,63,216)'
          activeDotColor='rgb(255,255,0)'
          hideNextButton
          hideDoneButton
        />
    );
  }
}