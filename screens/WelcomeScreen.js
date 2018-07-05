import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    imageContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    image: {
        // width: 320,
        // height: 320,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '96%',
        resizeMode: 'stretch',
    }
});

const slides = [
  {
    key: 'welcome-0',
    image: require('../assets/images/welcome-00.jpg'),
    image2: require('../assets/images/welcome-00.png'),
  },
  {
    key: 'welcome-1',
    image: require('../assets/images/welcome-01.png'),
  },
  {
    key: 'welcome-2',
    image: require('../assets/images/welcome-02.png'),
  },
  {
    key: 'welcome-3',
    image: require('../assets/images/welcome-03.png'),
  },
  {
    key: 'welcome-4 ',
    image: require('../assets/images/welcome-04.png'),
  },
];

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  _renderItem = props => (
    <View
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={props.image} />
        <Image style={styles.image} source={props.image2} />
      </View>
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