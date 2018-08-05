import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

import BandstandCardPlayer from "./BandstandCardPlayer";

import Colours from "../constants/Colors";
import { MonoText } from "./StyledText";
import { MonoTextBold } from "./StyledTextBold";
import { withNavigation } from 'react-navigation';

class BandstandCard extends React.Component {
  render() {
    const item = this.props.item;
    const hasVisited = this.props.hasVisited || false;
    const hasAudio = this.props.hasAudio || false;
    const hasLink = this.props.hasLink || false;
    const hasDescription = this.props.hasLink || false;
    return (
      <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate("Bandstand", {
              itemId: item.id
            })
          }
          >
          <View
              style={[
              styles.card,
              !hasVisited ? styles.notvisited : null,
              this.props.style
              ]}
          >
              <View
              style={[
                  styles.cardInner,
                  hasVisited ? styles.visited : null
              ]}
              >
              <MonoTextBold style={styles.title}>{item.title}</MonoTextBold>
              <MonoTextBold style={styles.subtitle}>{item.location}</MonoTextBold>
              <MonoTextBold style={styles.dates}>{item.dates}</MonoTextBold>
              {hasDescription ? (
                <MonoText style={styles.description}>{item.description}</MonoText>
              ) : null}
              {hasLink ? (
                <MonoTextBold style={styles.link}>Link</MonoTextBold>
              ) : null}
              {hasVisited && hasAudio ? (
                  <BandstandCardPlayer item={item} />
              ) : null}
              </View>
          </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(BandstandCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderColor: Colours.brandGreen,
    borderWidth: 2,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 8
  },
  cardInner: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    borderLeftColor: "#fff",
    borderLeftWidth: 10,
    width: "100%"
  },
  visited: {
    borderLeftColor: Colours.brandGreen
  },
  notvisited: {
    borderColor: Colours.tone40
  },
  title: {
    fontSize: 18,
    marginBottom: 5
  },
  subtitle: {
    fontSize: 15
  },
  dates: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10
  },
  actions: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  link: {
    color: Colours.brandPurple,
    fontSize: 15
  }
});
