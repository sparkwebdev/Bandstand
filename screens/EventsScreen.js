import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import Colours from '../constants/Colors';
import NavigationHelpers from "../helpers/NavigationHelpers";

import Prompt from "../components/Prompt";
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
      fontSize: 25,
      lineHeight: 50,
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
      color: Colours.brandGreen,
    },
    textLink: {
      color: Colours.brandPurple
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
    key: '2',
    image: require('../assets/images/screens/events-01.jpg'),
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textBold}>
          Sat 1st Sept{"\n"}3pm</MonoTextBold>
          <MonoTextBold>
          {"\n"}{"\n"}Ross Whyte and Portobello Community Choir
          perform the complete work ‘The Great Exhibition’
          at Portobello Prom old bandstand space
          (Community Garden, by John Street){"\n"}{"\n"}</MonoTextBold>
        </MonoText>
      </View>
    )
  },
  {
    key: '3',
    image: require('../assets/images/screens/events-02.jpg'),
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textBold}>
          Wed 5th Sept{"\n"}8.30-10pm</MonoTextBold>
          <MonoTextBold>
          {"\n"}{"\n"}Ross Whyte performs a live mix of sound recordings together with archival material relating to the project
          The Skylark, 243 Portobello High Street, Edinburgh EH15 2AW
          (to accompany project exhibition){"\n"}</MonoTextBold>
        </MonoText>
      </View>
    )
  },
  {
    key: '4',
    image: require('../assets/images/screens/events-03.jpg'),
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textBold}>
          Sat 8th Sept{"\n"}3pm</MonoTextBold>
          <MonoTextBold>
          {"\n"}{"\n"}Ross Whyte and Portobello Community Choir
          perform the complete work ‘The Great Exhibition’
          at Ross Theatre Bandstand, Princes Street Gardens, Edinburgh
          {"\n"}{"\n"}All events are free.</MonoTextBold>
        </MonoText>
      </View>
    )
  },
]