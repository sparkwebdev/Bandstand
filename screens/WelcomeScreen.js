import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Expo, { Font } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';


const slides1 = [
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
const slides2 = [
  {
    key: 'welcome-2',
    image: require('../assets/images/welcome-02.png'),
    imageResizeMode: 'contain',
  },
];

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewed: false,
      fontLoaded: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        'Source Code Pro': require('../assets/fonts/SourceCodePro-Light.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
  }

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
        {props.key === "welcome-4" ? 
        <Text style={[styles.button, { fontFamily: 'Source Code Pro' }]} 
        onPress={() => {
          this.setState({ viewed: true });
          this.props.navigation.navigate('Bandstands');
        }}>choose bandstand</Text>
         : null }
    </View>
  );

  render() {
    return !this.state.fontLoaded ? null : (
        <AppIntroSlider
          slides={this.state.viewed ? slides2 : slides1}
          renderItem={this._renderItem}
          dotColor='rgb(115,63,216)'
          activeDotColor='rgb(255,255,0)'
          hideNextButton
          hideDoneButton
        />
    );
  }
}


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
  },
  button: {
    backgroundColor: '#62d3a2',
    color: "#7f47dd",
    fontSize: 24,
    position: 'absolute',
    bottom: 200,
    left: "20%",
    width: '60%',
    padding: 20,
    textAlign: 'center',
  }
});