import React from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import Colours from "../constants/Colors";
import bandStands from "../constants/Bandstands";
import BandstandCard from "../components/BandstandCard";
import BandstandDistance from "../components/BandstandDistance";
import NavButton from "../navigation/NavButton";
import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";

export default class BandstandsScreen extends React.Component {
  static navigationOptions = {
    // title: 'Bandstands',
    // headerStyle: {
    //   backgroundColor: '#ff0000',
    // },
    // headerTintColor: '#ccc',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
    header: null
  };

  render() {
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
              <Image
                style={styles.keyIcon}
                source={require("../assets/images/icons/icon_action_bandstand.png")}
              /> View visited bandstand{"\n"}{"\n"}
              <Image
                style={styles.keyIcon}
                source={require("../assets/images/icons/icon_action_marker.png")}
              /> Select next bandstand{"\n"}{"\n"}
            </MonoText>
          </View>
          {
            bandStands.map((item, index) => {
              let hasVisited = visited.includes(item.id);
              return (
                <View
                  key={index}
                  style={[
                    styles.route,
                    item.id == 1 ? { paddingTop: 30 } : null,
                    item.id == bandStands.length ? { paddingBottom: 60 } : null
                  ]}
                >
                  <View style={[{ paddingBottom: 9 * (item.kmToNext + 3) }]}>
                    <Image
                      style={styles.marker}
                      source={
                        hasVisited
                          ? require("../assets/images/icons/icon_bandstand_hollow_green.png")
                          : require("../assets/images/icons/icon_bandstand_hollow_grey.png")
                      }
                    />
                    <BandstandCard
                      item={item}
                      hasVisited={hasVisited}
                    />
                  </View>
                  <View style={[{ paddingBottom: 10 * (item.kmToNext + 3) }]}>
                    {item.id !== bandStands.length ? (
                      <BandstandDistance
                        kmToNext={item.kmToNext}
                        timeToNext={item.timeToNext}
                      />
                    ) : null}
                  </View>
                </View>
              )
            })
          }
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
