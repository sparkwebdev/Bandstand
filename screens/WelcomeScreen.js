import React from "react";
import { View, StyleSheet, Text, Image, TouchableHighlight } from "react-native";
import Expo, { Font } from "expo";
import AppIntroSlider from "react-native-app-intro-slider";

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewed: false,
      fontLoaded: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        "Source Code Pro": require("../assets/fonts/SourceCodePro-Light.ttf")
      });
      this.setState({ fontLoaded: true });
    })();
  }

  _renderItem = props => (
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
    </View>
  );

  render() {
    return !this.state.fontLoaded ? null : (
      <AppIntroSlider
        slides={this.state.viewed ? slides2 : slides1}
        renderItem={this._renderItem}
        dotColor="rgb(115,63,216)"
        activeDotColor="rgb(255,255,0)"
        hideNextButton
        hideDoneButton
      />
    );
  }
}

const styles = StyleSheet.create({
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
    fontFamily: "Source Code Pro",
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
    color: "#7f47dd",
    fontSize: 16,
    lineHeight: 21
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
    marginTop: 20
  },
  headphones: {
    width: 120,
    height: 68,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
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
          <Text style={[styles.text, styles.textLarge]}>
            as i walk{"\n"}
            i glimpse{"\n"}
            i hear
          </Text>
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
          <Text style={[styles.text, styles.text01]}>
            8 locations of bandstand soundspaces across edinburgh and
            musselburgh, with accompanied sound, imagery and text
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textSmall]}>
            Marking the spaces of where bandstands once stood, and some that
            still do, this project brings together a sense of discovery through
            sound, to replicate the sense of hearing music playing at a
            bandstand in a public park.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textSmall]}>
            Each location contains a marker representing as near as possible the
            location of the actual bandstand. Once you visit please use the QR
            code on the marker to find out more about that site.
          </Text>
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
          <Text style={styles.text}>
            Commissioned and conceived by Art Walk Projects
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textSmall]}>
            composition: ross whyte{"\n"}
            performed by: portobello community choir{"\n"}
            curation+lyrics: rosy naylor{"\n"}
            app creation: steven park
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textSmall]}>
            Ross Whyte is a Glasgow based composer and sound artist. His
            composition is inspired by the early 1900s era of seaside
            entertainment, relating to Portobello and of the work of Harry
            Lauder.
          </Text>
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
          <Text style={styles.text}>
            This project is sponsored by The Royal Edinburgh Military Tattoo and
            The City of Edinburgh Council.
          </Text>
          <Image
            style={styles.logos}
            source={require("../assets/images/screens/additional/sponsor-logos.jpg")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Contacts:</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textSmall]}>
            www.artwalkprojects.co.uk{"\n"}
            www.rosswhyte.com{"\n"}
            www.stevenpark.co.uk
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Enquiries:</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textSmall]}>
            rosy@artwalkporty.co.uk
          </Text>
        </View>
      </View>
    )
  },
  {
    key: "welcome-5",
    content: (
      <View style={styles.screenContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Get Started
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Image
            style={styles.headphones}
            source={require("../assets/images/screens/additional/headphones.png")}
          />
          <Text style={[styles.text, styles.textBold]}>
            wear your headphones to start
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textBold]}>
          listen to the immersive sound as you walk around each park, to help find each bandstand zone
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => {
            //this.setState({ viewed: true });
            this.props.navigation.navigate("Bandstands");
          }}
        >
          <Image
            style={styles.btnChoose}
            source={require("../assets/images/buttons/btn-choose.png")}
          />
        </TouchableHighlight>
      </View>
    )
  }
];
const slides2 = [
  {
    key: "welcome-2"
    // image: require('../assets/images/screens/welcome-02.png'),
    // imageResizeMode: 'contain',
  }
];
