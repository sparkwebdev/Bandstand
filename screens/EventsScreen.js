import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
// import { Constants, WebBrowser } from 'expo';
import NavigationHelpers from '../helpers/NavigationHelpers';

import Colours from '../constants/Colors';
import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";
import NavButton from "../navigation/NavButton";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
    // title: 'Events'
  };

  renderItem = props => (
    <View
      style={[styles.container,
        {
          width: props.width,
          height: props.height
        }
      ]}
    >
      {props.image ? <Image style={[styles.image, {resizeMode: props.imageResizeMode,}]} source={props.image} /> : null }
      {props.content ? <props.content /> : null}
      
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <AppIntroSlider
          slides={slides}
          renderItem={this.renderItem}
          dotColor={Colours.brandPurple}
          activeDotColor={Colours.brandYellow}
          hideNextButton
          hideDoneButton
        />
        <NavButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
    contentContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      alignSelf: "center",
      alignContent: "center",
      maxWidth: 420,
    },
    text: {
      fontSize: 17,
      lineHeight: 24,
      textAlign: "center"
    },
    textSmall: {
      fontSize: 15
    },
    textLarge: {
      fontSize: 24,
      lineHeight: 24,
      textAlign: "center"
    },
    textLarger: {
      fontSize: 35,
      lineHeight: 45,
    },
    textLargest: {
      fontSize: 55,
      lineHeight: 65,
    },
    textBold: {
      fontSize: 24,
      color: Colours.brandPurple,
    },
    textYellow: {
      color: Colours.brandYellow,
      textAlign: "center"
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
});

const slides = [
  {
    key: '0',
    image: require('../assets/images/screens/events-00.jpg'),
    imageResizeMode: 'cover',
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          {/* <MonoTextBold style={[styles.textYellow, styles.textLargest]}>
          Performances{"\n"}
          </MonoTextBold> */}
          <MonoTextBold style={[styles.textYellow, styles.textLarger]}>
          Performances{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}
          </MonoTextBold>
        </MonoText>
      </View>
    )
  },
  {
    key: '1',
    image: require('../assets/images/screens/events-01.jpg'),
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textBold}>
          The Great Exhibition</MonoTextBold>
          <MonoTextBold>
          {"\n"}{"\n"}composed by Ross Whyte{"\n"}
          &amp; performed by Portobello Community Choir{"\n"}{"\n"}</MonoTextBold>
          <MonoTextBold>A series of live performances took place during Art Walk Porty Festival 2018 and at the reopening of Saughton Park in 2019.{"\n"}</MonoTextBold>
        </MonoText>
      </View>
    )
  },
  {
    key: '2',
    image: require('../assets/images/screens/events-02.jpg'),
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textLarge}>
          Listen:{"\n"}
          </MonoTextBold>
          <MonoTextBold style={styles.textBold} onPress={() => NavigationHelpers.openWebPage('https://soundcloud.com/rosswhyte/the-great-exhibition')}>
          Ross Whyte{"\n"}
          'The Great Exhibition'{"\n"}
          </MonoTextBold>
          <MonoTextBold>
          [soundcloud.com]{"\n"}{"\n"}
          </MonoTextBold>
          <MonoTextBold style={styles.textLarge}>
          Watch:{"\n"}
          </MonoTextBold>
          <MonoTextBold style={styles.textBold} onPress={() => NavigationHelpers.openWebPage('https://vimeo.com/315866291')}>
          'The BandStand Project'{"\n"}
          </MonoTextBold>
          <MonoTextBold>
          [vimeo.com]{"\n"}{"\n"}
          </MonoTextBold>
          <MonoTextBold style={styles.textLarge}>
          Read:{"\n"}
          </MonoTextBold>
          <MonoTextBold style={styles.textBold} onPress={() => NavigationHelpers.openWebPage('https://www.artwalkporty.co.uk/2018/Bandstand/Bandstand-newspaper.pdf')}>
          The Bandstand{"\n"}
          Project Newspaper{"\n"}
          </MonoTextBold>
          <MonoTextBold>
          [PDF]
          </MonoTextBold>
        </MonoText>
      </View>
    )
  },
  {
    key: '3',
    image: require('../assets/images/bandstand-01-06.jpg'),
    content: () => (
      <View style={styles.contentContainer}>
      <MonoText style={styles.text}>
        <MonoTextBold style={styles.textLarge}>
        Visit:{"\n"}
        </MonoTextBold>
        <MonoTextBold style={styles.textBold} onPress={() => NavigationHelpers.openWebPage('https://www.thequaichproject.org/your-gardens/moiras-story')}>
        'Moira's Story'{"\n"}{"\n"}
        </MonoTextBold>
        <MonoTextBold onPress={() => NavigationHelpers.openWebPage('https://www.thequaichproject.org/your-gardens/moiras-story')}>
        Auntie Moira, Ross Theatre{"\n"} pianist for Children’s Hour{"\n"}{"\n"}
        [thequaichproject.org]
        </MonoTextBold>
      </MonoText>
      </View>
    )
  },
  {
    key: '4',
    image: require('../assets/images/screens/events-04.jpg'),
    content: () => (
      <View style={styles.contentContainer}>
      </View>
    )
  },
]