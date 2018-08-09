
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import BlurView from "../components/BlurView";
import { withNavigation } from 'react-navigation';

// import { MonoTextBold } from "./components/StyledTextBold";

class NavButton extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <ActionButton buttonColor="rgba(231,76,60,1)" bgColor="rgba(0,0,0,0.5)" offsetY={22} position="center" backdrop={<BlurView />}>
          <ActionButton.Item buttonColor='transparent' title="Welcome" onPress={() => this.props.navigation.navigate('Welcome')}>
            <Image style={styles.marker} source={require("../assets/images/icon_bandstand_alt.png")} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='transparent' title="Bandstands" onPress={() => this.props.navigation.navigate('Bandstands')}>
            <Image style={styles.marker} source={require("../assets/images/icon_bandstand_alt.png")} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='transparent' title="Locations" onPress={() => this.props.navigation.navigate('Locations')}>
            <Image style={styles.marker} source={require("../assets/images/icon_bandstand_alt.png")} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='transparent' title="Bandstand" onPress={() =>
            this.props.navigation.navigate("Bandstand", {
              // itemId: item.id
              itemId: 1
              })
            }>
            <Image style={styles.marker} source={require("../assets/images/icon_bandstand_alt_3.png")} />
            <Text style={styles.markerText}>1</Text>
          </ActionButton.Item>
        </ActionButton>
      )
    }
}

const styles = StyleSheet.create({
  // <View style={styles.gradient}></View>
  // gradient: {
  //   position: 'absolute',
  //   backgroundColor: '#fff',
  //   width: '100%',
  //   height: 100,
  // },
  marker: {
    width: 48,
    height: 48,
  },
  markerText: {
    width: 48,
    height: 48,
    color: '#fff',
    position: 'absolute',
    fontSize: 26,
    lineHeight: 48,
    alignSelf: 'center'
  }
});

export default withNavigation(NavButton);