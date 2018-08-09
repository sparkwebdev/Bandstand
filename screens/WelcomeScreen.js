import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import ActionButton from 'react-native-action-button';
import BlurView from "../components/BlurView";
import NavButton from "../navigation/NavButton";

import Colours from '../constants/Colors';
import NavigationHelpers from '../helpers/NavigationHelpers';

import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beenWelcomed: false
    };
  }

  static navigationOptions = {
    header: null
  };

  renderItem = props => (
    <View
      style={[
        styles.mainContent,
        {
          // paddingTop: props.topSpacer,
          // paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height
        }
      ]}
    >
      {props.bgImage ? props.bgImage : null}
      {props.bgImageOverlay ? props.bgImageOverlay : null}
      {props.content ? props.content : null}
      {props.key === "welcome-5" ? 
        <TouchableHighlight
          onPress={() => {
            this.setState({ beenWelcomed: true });
            this.props.navigation.navigate("Bandstands");
          }}
        >
          <Image
            style={styles.btnChoose}
            source={require("../assets/images/buttons/btn-choose.png")}
          />
        </TouchableHighlight>
      : null}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
      <AppIntroSlider
        slides={this.state.beenWelcomed ? slides1.slice(3, 4) : slides1 }
        renderItem={this.renderItem}
        dotColor="rgb(115,63,216)"
        activeDotColor="rgb(255,255,0)"
        hideNextButton
        hideDoneButton
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  screenContainer: {
    marginTop: 20,
    marginBottom: 120,
    paddingRight: 20,
    paddingLeft: 30
  },
  textContainer: {
    backgroundColor: "rgba(255,255,255,0.65)",
    padding: 10,
    maxWidth: 480,
    alignSelf: "center",
    display: "flex"
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center"
  },
  textLarge: {
    fontSize: 25,
    lineHeight: 50
  },
  textSmall: {
    fontSize: 16,
    lineHeight: 21
  },
  textBold: {
    color: Colours.brandPurple,
    fontSize: 16,
    lineHeight: 21
  },
  link: {
    color: Colours.brandPurple,
    fontSize: 20,
    marginBottom: 15
  },
  logos: {
    width: 280,
    height: 59,
    marginTop: 20
  },
  btnChoose: {
    width: 200,
    height: 92,
    alignSelf: "center",
    marginBottom: 140
  },
  headphones: {
    width: 120,
    height: 68,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  marker: {
    width: 48,
    height: 48,
  }
});

const slides1 = [
  {
    key: "welcome-0",
    bgImage: (
      <Image
        style={[styles.bgImage, { resizeMode: "cover" }]}
        source={require("../assets/images/screens/welcome-00.jpg")}
      />
    ),
    bgImageOverlay: (
      <Image
        style={styles.bgImage}
        source={require("../assets/images/screens/welcome-00.png")}
      />
    )
  },
  {
    key: "welcome-1",
    bgImage: (
      <Image
        style={styles.bgImage}
        source={require("../assets/images/screens/welcome-01.png")}
      />
    ),
    content: (
      <View style={[styles.screenContainer, styles.screenContainerBottom]}>
        <View style={styles.textContainer}>
          <MonoTextBold style={[styles.text, styles.textLarge]}>
            as i walk{"\n"}
            i glimpse{"\n"}
            i hear
          </MonoTextBold>
        </View>
      </View>
    )
  },
  {
    key: "welcome-2",
    bgImage: (
      <Image
        style={styles.bgImage}
        source={require("../assets/images/screens/welcome-02.png")}
      />
    ),
    content: (
      <View style={styles.screenContainer}>
        <View style={styles.textContainer}>
          <MonoTextBold style={[styles.text, styles.text01]}>
            8 locations of bandstand soundspaces across edinburgh and
            musselburgh, with accompanied sound, imagery and text
          </MonoTextBold>
        </View>
        <View style={styles.textContainer}>
          <MonoText style={[styles.text, styles.textSmall]}>
            Marking the spaces of where bandstands once stood, and some that
            still do, this project brings together a sense of discovery through
            sound, to replicate the sense of hearing music playing at a
            bandstand in a public park.
          </MonoText>
        </View>
        <View style={styles.textContainer}>
          <MonoText style={[styles.text, styles.textSmall]}>
            Each location contains a marker representing as near as possible the
            location of the actual bandstand. Once you visit please use the QR
            code on the marker to find out more about that site.
          </MonoText>
        </View>
      </View>
    )
  },
  {
    key: "welcome-3",
    bgImage: (
      <Image
        style={styles.bgImage}
        source={require("../assets/images/screens/welcome-03.png")}
      />
    ),
    content: (
      <View style={styles.screenContainer}>
        <View style={styles.textContainer}>
          <MonoTextBold style={styles.text}>
            Commissioned and conceived by Art Walk Projects
          </MonoTextBold>
        </View>
        <View style={styles.textContainer}>
          <MonoText style={[styles.text, styles.textSmall]}>
            composition: ross whyte{"\n"}
            performed by: portobello community choir{"\n"}
            curation+lyrics: rosy naylor{"\n"}
            app creation: steven park
          </MonoText>
        </View>
        <View style={styles.textContainer}>
          <MonoText style={[styles.text, styles.textSmall]}>
            Ross Whyte is a Glasgow based composer and sound artist. His
            composition is inspired by the early 1900s era of seaside
            entertainment, relating to Portobello and of the work of Harry
            Lauder.
          </MonoText>
        </View>
      </View>
    )
  },
  {
    key: "welcome-4",
    bgImage: (
      <Image
        style={styles.bgImage}
        source={require("../assets/images/screens/welcome-04.png")}
      />
    ),
    content: (
      <View style={styles.screenContainer}>
        <View style={styles.textContainer}>
          <MonoTextBold style={styles.text}>
            This project is sponsored by The Royal Edinburgh Military Tattoo and
            The City of Edinburgh Council.
          </MonoTextBold>
          <Image
            style={styles.logos}
            source={require("../assets/images/screens/additional/sponsor-logos.jpg")}
          />
        </View>
        <View style={styles.textContainer}>
          <MonoTextBold style={styles.text}>Contacts:</MonoTextBold>
        </View>
        <View style={styles.textContainer}>
          <MonoTextBold style={[styles.text, styles.textSmall, styles.link]} onPress={() => NavigationHelpers.openWebPage('http://www.artwalkprojects.co.uk')}>
            artwalkprojects.co.uk
          </MonoTextBold>
          <MonoTextBold style={[styles.text, styles.textSmall, styles.link]} onPress={() => NavigationHelpers.openWebPage('http://www.rosswhyte.com')}>
          rosswhyte.com
          </MonoTextBold>
          <MonoTextBold style={[styles.text, styles.textSmall, styles.link]} onPress={() => NavigationHelpers.openWebPage('http://www.stevenpark.co.uk')}>
          stevenpark.co.uk
          </MonoTextBold>
        </View>
        <View style={styles.textContainer}>
          <MonoTextBold style={styles.text}>Enquiries:</MonoTextBold>
        </View>
        <View style={styles.textContainer}>
          <MonoTextBold style={[styles.text, styles.textSmall, styles.link]} onPress={() => NavigationHelpers.openMailto('mailto:rosy@artwalkporty.co.uk')}>
            rosy@artwalkporty.co.uk
          </MonoTextBold>
        </View>
      </View>
    )
  },
  {
    key: "welcome-5",
    content: (
      <View style={styles.screenContainer}>
        <View style={styles.textContainer}>
          <MonoTextBold style={styles.text}>
            Get Started
          </MonoTextBold>
        </View>
        <View style={styles.textContainer}>
          <Image
            style={styles.headphones}
            source={require("../assets/images/screens/additional/headphones.png")}
          />
          <MonoText style={[styles.text, styles.textBold]}>
            wear your headphones to start{"\n"}
            listen to the immersive sound as you walk around each park, to help find each bandstand zone
          </MonoText>
        </View>
        <NavButton />
      </View>
    )
  }
];