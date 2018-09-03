import React from "react";
import {
  TouchableWithoutFeedback,
  Image,
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
    const { item, hasVisited, hasAudio, hasDescription } = this.props;
    return (
      <TouchableWithoutFeedback

          onPress={() =>
            !hasAudio ? 
              this.props.navigation.navigate("Bandstand", {
                itemId: item.id,
                item: item
              })
            : null
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
                <View style={styles.cardContent}>
                  <MonoTextBold style={styles.title}>{item.title}</MonoTextBold>
                  {hasAudio ?
                    <View>
                      {/* <MonoTextBold style={styles.title}>{item.song.duration}{"\n"}</MonoTextBold> */}
                      <MonoTextBold style={styles.dates}>{item.dates}{"\n"}</MonoTextBold>
                    </View>
                  : 
                    <View>
                      <MonoTextBold style={styles.subtitle}>{item.location}</MonoTextBold>
                      <MonoTextBold style={styles.dates}>{item.dates}</MonoTextBold>
                    </View>
                  }
                  {hasDescription ? (
                    <MonoText style={styles.description}>{item.description}</MonoText>
                  ) : null}
                </View>
                <View style={styles.cardActions}>
                  {hasAudio ?
                      <BandstandCardPlayer item={item} />
                  : null}
                  {hasVisited && !hasAudio ?
                    <Image
                      style={styles.icon}
                      source={require("../assets/images/icons/icon_action_bandstand.png")}
                    />
                  : null}
                  {!hasVisited && !hasAudio ?
                    <Image
                      style={styles.icon}
                      source={require("../assets/images/icons/icon_action_marker.png")}
                    />
                  : null}
                </View>
                {hasVisited ?
                  <Image
                    style={styles.tick}
                    source={require("../assets/images/icons/icon_tick_corner.png")}
                  />
                : null}
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
    // flex: 1,
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
    width: "100%",
    // flex: 1,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardContent: {
    width: "80%",
  },
  cardActions: {
    width: 56,
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  icon: {
    width: 56,
    height: 56,
  },
  visited: {
    borderLeftColor: Colours.brandGreen
  },
  notvisited: {
    borderColor: Colours.tone40
  },
  title: {
    fontSize: 17,
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
  },
  tick: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 0,
    right: 0
  }
});
