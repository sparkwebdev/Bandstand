import React from "react";
import {
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Audio } from "expo";
import bandStands from "../constants/Bandstands";
import BandstandCard from "../components/BandstandCard";
import NavButton from "../navigation/NavButton";
import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";
import Colours from "../constants/Colors";

export default class PlaylistScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  
  render() {
    let notVisited = [];
    const visited = this.props.screenProps.visited;
    return (
      <View style={styles.containerOuter}>
        <ScrollView style={styles.container} visited={visited}>
          <View style={styles.key}>
            <MonoTextBold>Key{"\n"}</MonoTextBold>
            <MonoText style={styles.keyText}>
              <Image
                style={styles.keyIcon}
                source={require("../assets/images/icons/icon_tick_key.png")}
              /> Visited bandstand{"\n"}{"\n"}
              {visited.length > 0 ? 
              <MonoText>
                <Image
                  style={styles.keyIcon}
                  source={require("../assets/images/icons/icon_play.png")}
                /> Play soundscape{"\n"}{"\n"}
                <Image
                  style={styles.keyIcon}
                  source={require("../assets/images/icons/icon_pause.png")}
                /> Pause soundscape{"\n"}{"\n"}
              </MonoText>
              :
              <MonoText>
                <Image
                  style={styles.keyIcon}
                  source={require("../assets/images/icons/icon_action_marker.png")}
                /> Select next bandstand{"\n"}{"\n"}
              </MonoText>
              }
            </MonoText>
          </View>
          <View style={styles.playlist}>
            {bandStands.filter((a) => {
              if (visited.length > 2) {
                return true;
              } else {
                if (visited.includes(a.id)) {
                  return true;
                } else {
                  notVisited.push(a);
                  return false;
                }
              }
            }).map((item, index) => {
              let hasVisited = visited.includes(item.id);
              return (
                <View key={index}>
                  {index === 0 && visited.length > 2 ? <MonoTextBold>Congratulations, you have unlocked all soundscapes...</MonoTextBold> : null}
                  {index === 0 && visited.length > 1 ? <MonoTextBold>{"\n"}You can play tracks one on top of the other to create your own composition. Just press play on each track.</MonoTextBold> : null}
                  <View
                    style={[
                      styles.route, { marginTop: 20 }
                    ]}
                  >
                    <Image
                      style={styles.marker}
                      source={require("../assets/images/icons/icon_bandstand_hollow_green.png")}
                    />
                    <BandstandCard
                      item={item}
                      hasVisited={hasVisited}
                      hasAudio={true}
                    />
                  </View>
                </View>
              );
            })}
            {notVisited.map((item, index) => {
              return (
                <View key={index}>
                  {index === 0 && visited.length === 0 ? <MonoTextBold>Visit some Bandstands to start unlocking soundscapes. Visit at least 3 to unlock them all...</MonoTextBold> : null}
                  {index === 0 && visited.length > 0 ? <MonoTextBold>{"\n"}{"\n"}Visit {3 - visited.length} more Bandstand{3 - visited.length > 1 ? "s" : null} to unlock all soundscapes...</MonoTextBold> : null}
                  <View
                    style={[
                      styles.route, { marginTop: 20 }
                    ]}
                  >
                    <Image
                      style={styles.marker}
                      source={require("../assets/images/icons/icon_bandstand_hollow_grey.png")}
                    />
                    <BandstandCard
                      item={item}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <NavButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
  },
  key: {
    marginTop: 60,
  },
  keyText: {
    fontSize: 12
  },
  keyIcon: {
    width: 24,
    height: 24,
    marginTop: -8
  },
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    marginLeft: 23,
    paddingLeft: 25,
    paddingRight: 15,
    borderLeftColor: Colours.brandPurple,
    borderLeftWidth: 18,
    overflow: "visible"
  },
  playlist: {
    paddingBottom: 60,
  },
  route: {
    marginLeft: -25
  },
  marker: {
    width: 34,
    height: 34,
    position: "absolute",
    left: -26,
    top: 14
  }
});
