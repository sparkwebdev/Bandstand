import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Expo, { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  _handleLinkPress = () => {
    WebBrowser.openBrowserAsync("http://www.artwalkporty.co.uk");
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <MonoTextBold style={styles.title}>Events</MonoTextBold>
        <View style={styles.paragraph}>
          <MonoTextBold style={styles.strong}>Weds 5th Sept, 8pm</MonoTextBold>
          <MonoText>
            The Skylark, 243 Portobello High Street,{"\n"}
            Edinburgh EH15 2AW{"\n"}
            (livemix from Ross Whyte with recordings of the composition together
            with collected archive sound and film to accompany Bandstand Project
            exhibition)
          </MonoText>
        </View>
        <View style={styles.paragraph}>
          <MonoTextBold style={styles.strong}>Sat 8th Sept, 3pm</MonoTextBold>
          <MonoText>
            Ross Theatre Bandstand,{"\n"}
            Princes Street Gardens,{"\n"}
            Edinburgh EH2 2HG{"\n"}
            (live performances from Ross Whyte & Portobello Community Choir)
          </MonoText>
        </View>
        <View style={styles.paragraph}>
          <MonoTextBold style={styles.strong}>Weds 5th Sept, 8pm</MonoTextBold>
          <MonoText>
            The Skylark, 243 Portobello High Street,{"\n"}
            Edinburgh EH15 2AW{"\n"}
            (livemix from Ross Whyte with recordings of the composition together
            with collected archive sound and film to accompany Bandstand Project
            exhibition)
          </MonoText>
        </View>
        <View style={styles.paragraph}>
          <MonoText>
            You can also download a copy of the event newspaper from our
            website:
          </MonoText>
          <MonoTextBold style={styles.link} onPress={this._handleLinkPress}>
            artwalkporty.co.uk
          </MonoTextBold>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    marginBottom: 20
  },
  strong: {
    fontSize: 20
  },
  link: {
    color: "#7f47dd",
    fontSize: 20
  },
  paragraph: {
    marginBottom: 20
  }
});
