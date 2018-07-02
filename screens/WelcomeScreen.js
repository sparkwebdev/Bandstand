import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    image: {
        width: 320,
        height: 320,

    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    }
});

const slides = [
  {
    key: 'welcome-0',
    text: ' ',
    colors: ['#ffffff', '#ffffff'],
  },
  {
    key: 'welcome-1',
    text: '8 locations of bandstands across edinburgh and musselburgh, existing or no longer in use, with accompanied sound, imagery + text',
    colors: ['#ffffff', '#ffffff'],
  },
  {
    key: 'welcome-2',
    text: 'wear your headphones to start',
    colors: ['#ffffff', '#ffffff'],
  },
  {
    key: 'welcome-3',
    text: 'you will hear immersive sound as you walk around the park to help you locate each bandstand zone',
    colors: ['#ffffff', '#ffffff'],
  },
];

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  _renderItem = props => (
    <LinearGradient
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
      colors={props.colors}
      start={{x: 0, y: .1}} end={{x: .1, y: 1}}
    >
      <View>
        <Image
          source={require('../assets/images/welcome-01.jpg')}
          style={styles.image}
        />
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          dotColor='rgb(115,63,216)'
          activeDotColor='rgb(255,255,255)'
          hideNextButton
          hideDoneButton
        />
    );
  }
}