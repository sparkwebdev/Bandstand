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

export default class BandstandCard extends React.Component {
  render() {
    const item = this.props.item;
    const hasVisited = this.props.hasVisited;
    const hasAudio = this.props.hasAudio;
    const hasLink = this.props.hasLink;
    const hasDescription = this.props.hasLink;
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
              {/* <View style={styles.actions}>
                  <MonoTextBold style={styles.link}>More Info</MonoTextBold>
                  <MonoTextBold style={styles.link}>Link</MonoTextBold>
              </View> */}
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
