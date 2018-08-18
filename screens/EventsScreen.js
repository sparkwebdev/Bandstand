import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import Colours from '../constants/Colors';
import NavigationHelpers from "../helpers/NavigationHelpers";

import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";
import NavButton from "../navigation/NavButton";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
    // title: 'Events'
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <MonoTextBold style={styles.title}>Events</MonoTextBold>
          <View style={styles.paragraph}>
            <MonoTextBold>Performances are scheduled for:</MonoTextBold>
          </View>
          <View style={styles.paragraph}>
            <MonoTextBold style={styles.strong}>Sat 1st Sept, 3pm</MonoTextBold>
            <MonoText>
              site of Portobello Prom’s old bandstand (Community Garden),{"\n"}
              John Street{"\n"}
              Edinburgh EH15 2EB
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
            <MonoTextBold style={styles.strong}>Sat 8th Sept, 3pm</MonoTextBold>
            <MonoText>
              Princes Street Gardens,{"\n"}
              Edinburgh EH2 2HG{"\n"}
              (live performances from Ross Whyte & Portobello Community Choir)
            </MonoText>
          </View>
          <View style={styles.paragraph}>
            <MonoText>
              You can also download a copy of the event newspaper from our
              website:
            </MonoText>
            <MonoTextBold
              style={styles.link}
              onPress={() =>
                NavigationHelpers.openWebPage("http://www.artwalkporty.co.uk")
              }
            >
              artwalkporty.co.uk
            </MonoTextBold>
          </View>
        </ScrollView>
        <NavButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
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
    color: Colours.brandPurple,
    fontSize: 20
  },
  paragraph: {
    marginBottom: 20
  }
});
