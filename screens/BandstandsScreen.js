import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

import Colours from "../constants/Colors";
import bandStands from "../constants/Bandstands";

import BandstandCard from "../components/BandstandCard";
import BandstandDistance from "../components/BandstandDistance";
import NavButton from "../navigation/NavButton";

export default class BandstandsScreen extends React.Component {
  static navigationOptions = {
    title: 'Bandstands',
    headerStyle: {
      backgroundColor: '#ff0000',
    },
    headerTintColor: '#ccc',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    //header: null
  };

  render() {
    return (
      <Text>123</Text>
      // <ScrollView style={styles.container} visited={visited}>
      //   {
      //     bandStands.map((item, index) => {
      //       let hasVisited = visited.includes(item.id);
      //       return (
      //         <View
      //           key={index}
      //           style={[
      //             styles.route,
      //             item.id == 1 ? { paddingTop: 60 } : null,
      //             item.id == bandStands.length ? { paddingBottom: 60 } : null
      //           ]}
      //         >
      //           <View style={[{ paddingBottom: 9 * (item.kmToNext + 3) }]}>
      //             <Image
      //               style={styles.marker}
      //               source={
      //                 hasVisited
      //                   ? require("../assets/images/icon_bandstand_alt.png")
      //                   : require("../assets/images/icon_bandstand_alt_2.png")
      //               }
      //             />
      //             <BandstandCard
      //               item={item}
      //               hasVisited={hasVisited}
      //             />
      //           </View>
      //           <View style={[{ paddingBottom: 10 * (item.kmToNext + 3) }]}>
      //             {item.id !== bandStands.length ? (
      //               <BandstandDistance
      //                 kmToNext={item.kmToNext}
      //                 timeToNext={item.timeToNext}
      //               />
      //             ) : null}
      //           </View>
      //         </View>
      //       )
      //     })
      //   }
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
  },
  container: {
    flex: 1,
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
