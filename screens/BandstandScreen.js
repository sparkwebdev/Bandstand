import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Bandstand from "../components/Bandstand";
import BandstandVisited from "../components/BandstandVisited";
import NavButton from "../navigation/NavButton";
import NavBackButton from "../navigation/NavButton";
import { withNavigation } from 'react-navigation';

class BandstandScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const selectBandstand = this.props.navigation.getParam('itemId', 0);
    const hasVisited = visited.includes(selectBandstand);
    if (!hasVisited) {
      return (
        <View style={styles.container}>
          <Bandstand selectBandstand={selectBandstand} />
          <NavButton />
          {/* <NavBackButton /> Why not working? */}
          <TouchableOpacity style={styles.backButton} 
          onPress={() =>
            this.props.navigation.navigate("Bandstands")
          }>
            <Image
              style={styles.backButtonImg}
              source={require("../assets/images/icons/icon_back.png")}
            />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <BandstandVisited selectBandstand={selectBandstand} />
          <NavButton />
          {/* <NavBackButton /> Why not working? */}
          <TouchableOpacity style={styles.backButton} 
          onPress={() =>
            this.props.navigation.navigate("Bandstands")
          }>
            <Image
              style={styles.backButtonImg}
              source={require("../assets/images/icons/icon_back.png")}
            />
          </TouchableOpacity>
        </View>
      )
    }
  }
}

export default withNavigation(BandstandScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 46,
    height: 46,
    position: "absolute",
    zIndex: 9999999,
    left: 30,
    top: 46
  },
  backButtonImg: {
    width: '100%',
    height: '100%',
  }
});