import React from "react";
import { View, StyleSheet, Image, AsyncStorage } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import Colours from '../constants/Colors';
import NavigationHelpers from '../helpers/NavigationHelpers';
import NavButton from "../navigation/NavButton";

import Prompt from "../components/Prompt";
import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomed: ''
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('welcomed');
      this.setState({welcomed: value});
      if (value === 'true') {
        this.props.navigation.navigate('Bandstands');
      }
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  setWelcomed = async (value) => {
    try {
      await AsyncStorage.setItem('welcomed', value);
      this.setState({welcomed: 'true'});
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  handlePromptNavigate = () => {
    this.setWelcomed('true');
  }

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
      {props.content ? <props.content onPromptNavigate={this.handlePromptNavigate} /> : null}
      
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <AppIntroSlider
          slides={this.state.welcomed === 'true' ? slides.slice(2,6) : slides  }
          renderItem={this.renderItem}
          dotColor={Colours.brandPurple}
          activeDotColor={Colours.brandYellow}
          hideNextButton
          hideDoneButton
          // onSlideChange={(index) => this.slidechange(index)}
        />
        {this.state.welcomed === "true" ? <NavButton /> : null}
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
  textLarge: {
    fontSize: 25,
    lineHeight: 50,
    textAlign: "center"
  },
  textBold: {
    fontSize: 18,
    color: Colours.brandGreen,
  },
  textSmall: {
    fontSize: 14
  },
  textSmaller: {
    fontSize: 12
  },
  textLink: {
    color: Colours.brandPurple,
    fontSize: 16
  },
  // logos: {
  //   width: 212,
  //   height: 45,
  //   marginTop: 15,
  //   alignSelf: "center",
  // },
  logos01: {
    width: 147,
    height: 80,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  logos02: {
    width: 197,
    height: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  logos03: {
    width: 120,
    height: 39,
    marginBottom: 20,
    alignSelf: "center",
  },
  headphones: {
    width: 80,
    height: 46,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
});

const slides = [
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
    content: () => (
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
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textBold}>
          8 locations of bandstand soundspaces across Edinburgh and Musselburgh, with commissioned music and archival imagery.{"\n"}{"\n"}
          </MonoTextBold>
          <MonoText>
          Find music once again as we stroll our public parks by visiting each location where bandstands once stood. Look out for the marker at each to unlock the melody and imagery. Visit 3 and you can gain access to the full composition.
          </MonoText>
          {/* <MonoText style={styles.textSmall}>
          {"\n"}{"\n"}Each location contains a marker representing as near as possible the location of the original bandstand. By visiting each of these, you can unlock the melody relating to that site, along with archive imagery and historical info. Visit 3 locations and you can access the complete composition.
          {"\n"}{"\n"}As you collect the melodies from each location they can be listened to, or layered together, by using the playlist area of this app. Visit 3 locations and you can access the complete composition.
          </MonoText> */}
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
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textBold}>
          The commissioned music by Ross Whyte, The Great Exhibition, is inspired by the early 1900s era of seaside entertainment and end-of-the-pier entertainers such as Harry Lauder.{"\n"}{"\n"}
          </MonoTextBold>
          <MonoText>
          Portobello Community Choir performs the work together with sound recordings of archival material, and lyrics by Rosy Naylor.{"\n"}{"\n"}
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
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoText style={styles.textSmall}>Commissioned and conceived by{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.artwalkprojects.co.uk')}>artwalkprojects.co.uk</MonoTextBold>
          <MonoText style={styles.textSmall}>{"\n"}{"\n"}composition:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.rosswhyte.com')}>rosswhyte.com</MonoTextBold>
          <MonoText style={styles.textSmall}>{"\n"}{"\n"}performed by:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.portobellocommunitychoir.org/')}>portobellocommunitychoir.org</MonoTextBold>
          <MonoText style={styles.textSmall}>{"\n"}{"\n"}curation+lyrics:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.rosynaylor.com/')}>rosynaylor.com</MonoTextBold>
          <MonoText style={styles.textSmall}>{"\n"}{"\n"}app creation:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openWebPage('http://www.stevenpark.co.uk')}>stevenpark.co.uk{"\n"}{"\n"}</MonoTextBold>
          <MonoText style={styles.textSmall}>enquiries:{"\n"}</MonoText>
          <MonoTextBold style={styles.textLink} onPress={() => NavigationHelpers.openMailto('mailto:rosy@artwalkporty.co.uk')}>rosy@artwalkporty.co.uk{"\n"}{"\n"}</MonoTextBold>
        </MonoText>
      </View>
    )
  },
  {
    key: "welcome-5",
    bgImage: (
      <Image
        style={styles.bgImage}
        source={require("../assets/images/screens/welcome-02.png")}
      />
    ),
    content: () => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textSmall}>This project is funded by The Royal Edinburgh Military Tattoo and The City of Edinburgh Council.</MonoTextBold>
        </MonoText>
        <Image
          style={styles.logos01}
          source={require("../assets/images/screens/additional/sponsor-logo-01.jpg")}
        />{"\n"}
        <Image
          style={styles.logos02}
          source={require("../assets/images/screens/additional/sponsor-logo-02.jpg")}
        />{"\n"}
        <Image
          style={styles.logos03}
          source={require("../assets/images/screens/additional/sponsor-logo-03.jpg")}
        />{"\n"}
        <MonoText style={styles.text}>
          <MonoTextBold style={styles.textSmall}>Thanks to:</MonoTextBold>
          <MonoText style={styles.textSmaller}>
          {"\n"}Historic Environment Scotland{"\n"}
          National Library of Scotland{"\n"}
          Portobello Heritage Trust{"\n"}{"\n"}</MonoText>
          {/* <MonoTextBold style={styles.textSmall}>Archive imagery credits:{"\n"}</MonoTextBold>
          <MonoText style={styles.textSmaller}>
          Copyright City of Edinburgh Council (Bandstand Dancing at Portobello){"\n"}
          from ‘Holidays at Home’ 1940s archive film.{"\n"}
          Copyright The Scotsman Publications Ltd (Meadows and Saughton){"\n"}
          Copyright Courtesy of Historic Environment Scotland (Victoria Park){"\n"}
          Copyright Valentines of Dundee (Victoria Park){"\n"}
          Portobello Heritage Trust & Peter Stubbs (Portobello Prom)
          </MonoText> */}
        </MonoText>
      </View>
    )
  },
  {
    key: "welcome-6",
    content: (props) => (
      <View style={styles.contentContainer}>
        <MonoText style={styles.text}>
          <MonoTextBold style={[styles.textBold, styles.textLink]}>
          Get Started!
          </MonoTextBold>
        </MonoText>
        <MonoTextBold style={[styles.text, styles.textBold]}>
        {"\n"}We recommend you{"\n"} wear headphones...
        </MonoTextBold>
        <Image
          style={styles.headphones}
          source={require("../assets/images/screens/additional/headphones.png")}
        />
        <MonoTextBold style={[styles.text, styles.textBold]}>
          Then, choose{"\n"}a bandstand...
        </MonoTextBold>
        <Prompt target="Bandstands" source={require("../assets/images/icons/icon_action_marker.png")} onNavigate={props.onPromptNavigate} />
      </View>
    )
  }
];