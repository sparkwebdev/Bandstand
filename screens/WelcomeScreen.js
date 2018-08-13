import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import Colours from '../constants/Colors';
import NavigationHelpers from '../helpers/NavigationHelpers';

import Prompt from "../components/Prompt";
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
      style={[styles.container,
        {
          width: props.width,
          height: props.height
        }
      ]}
    >
      {props.bgImage ? props.bgImage : null}
      {props.bgImageOverlay ? props.bgImageOverlay : null}
      {props.content ? props.content : null}
    </View>
  );

  render() {
    return (
      <AppIntroSlider
        slides={this.state.beenWelcomed ? slides1.slice(3, 4) : slides1 }
        renderItem={this.renderItem}
        dotColor={Colours.brandPurple}
        activeDotColor={Colours.brandYellow}
        hideNextButton
        hideDoneButton
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  contentContainer: {
    // backgroundColor: "rgba(255,255,255,0.7)",
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
    fontSize: 13
  },
  textLarge: {
    fontSize: 25,
    lineHeight: 50,
    textAlign: "center"
  },
  textBold: {
    fontSize: 18,
    color: Colours.brandGreen,
  },
  textLink: {
    color: Colours.brandPurple
  },
  logos: {
    width: 212,
    height: 45,
    alignSelf: "center",
  },
  headphones: {
    width: 120,
    height: 68,
    alignSelf: "center",
  },
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
      <View style={styles.contentContainer}>
        <MonoTextBold style={[styles.textBold, styles.textLarge]}>
          as i walk{"\n"}
          i glimpse{"\n"}
          i hear
        </MonoTextBold>
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
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textBold}>
            8 locations of bandstand soundspaces across edinburgh and
            musselburgh, with accompanied sound, imagery and text{"\n"}{"\n"}
          </MonoTextBold>
          <MonoText>
            Marking the spaces of where bandstands once stood, and some that still do, this project brings together a sense of discovery through sound, to replicate the sense of hearing music playing at a bandstand in a public park.{"\n"}{"\n"}
            Each location contains a marker representing as near as possible the location of the actual bandstand. Once you visit please use the QR code on the marker to find out more about that site.{"\n"}
          </MonoText>
        </MonoText>
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
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textBold}>
          Ross Whyte is a Glasgow based composer and sound artist.{"\n"}{"\n"}
          </MonoTextBold>
          <MonoTextBold style={styles.textSmall}>
            His composition is inspired by the early 1900s era of seaside entertainment, relating to Portobello and of the work of Harry Lauder.{"\n"}{"\n"}
          </MonoTextBold>
          <MonoText style={styles.textSmall}>
            The Great Exhibition combines recent sound recording with both archival and newly-composed material to present an abstract reimagining of the kinds of sounds and music that might have been heard at the various bandstands around Edinburgh.{"\n"}{"\n"}
            The work contains 8 melodic lines performed by the Portobello Community Choir. The melodies can be ‘unlocked’ by visiting each of the 8 bandstand locations. They can be listened to individually or layered on top of each other, as each new melody is discovered. Together they form a complete song: The Great Exhibition.{"\n"}{"\n"}
            The Great Exhibition is romantic, sentimental, light-hearted, and hopeful, and aims to evoke an atmosphere of a more innocent time.{"\n"}
          </MonoText>
        </MonoText>
      </View>
    )
  },
  {
    key: "welcome-4",
    bgImage: (
      <Image
        style={styles.bgImage}
        source={require("../assets/images/screens/welcome-02.png")}
      />
    ),
    content: (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textBold}>Commissioned and conceived by{"\n"}</MonoTextBold>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.artwalkprojects.co.uk')}>artwalkprojects.co.uk</MonoTextBold>
          <MonoText style={styles.textSmall}>{"\n"}{"\n"}composition:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.rosswhyte.com')}>rosswhyte.com</MonoTextBold>
          <MonoText style={styles.textSmall}>{"\n"}{"\n"}performed by:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.portobellocommunitychoir.org/')}>portobellocommunitychoir.org</MonoTextBold>
          <MonoText style={styles.textSmall}>{"\n"}{"\n"}curation+lyrics:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.rosynaylor.com/')}>rosynaylor.com</MonoTextBold>
          <MonoText style={styles.textSmall}>{"\n"}{"\n"}app creation:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.stevenpark.co.uk')}>stevenpark.co.uk{"\n"}{"\n"}</MonoTextBold>
          <MonoText style={styles.textSmall}>Enquiries:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openMailto('mailto:rosy@artwalkporty.co.uk')}>rosy@artwalkporty.co.uk{"\n"}{"\n"}</MonoTextBold>
          <MonoText style={styles.textSmall}>This project is sponsored by The Royal Edinburgh Military Tattoo and The City of Edinburgh Council.{"\n"}</MonoText>
        </MonoText>
        <Image
          style={styles.logos}
          source={require("../assets/images/screens/additional/sponsor-logos.jpg")}
        />
      </View>
    )
  },
  {
    key: "welcome-5",
    content: (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={[styles.textBold, styles.textLink, styles.textLarge]}>
          Get Started!
          </MonoTextBold>
        </MonoText>
        <MonoTextBold style={[styles.text, styles.textBold]}>
        {"\n"}We recommend you{"\n"} wear headphones...{"\n"}
        </MonoTextBold>
        <Image
          style={styles.headphones}
          source={require("../assets/images/screens/additional/headphones.png")}
        />
        <MonoTextBold style={[styles.text, styles.textBold]}>
          {"\n"}Then,{"\n"}choose a{"\n"}bandstand...
        </MonoTextBold>
        <Prompt target={"Bandstands"} source={require("../assets/images/icons/icon_action_marker.png")} />
      </View>
    )
  }
];