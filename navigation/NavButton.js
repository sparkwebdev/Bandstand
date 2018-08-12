
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import BlurView from "../components/BlurView";
import { withNavigation } from 'react-navigation';
import Colours from '../constants/Colors';

// import { MonoTextBold } from "./components/StyledTextBold";

class NavButton extends React.Component {
    constructor(props) {
      super(props);
    }

    menuIcon(active) {
      return active ? <Image style={styles.marker} source={require("../assets/images/icon_close.png")} /> : <Image style={styles.marker} source={require("../assets/images/icon_menu.png")} />;
    }

    render() {
      return (
        <ActionButton buttonColor={Colours.brandPurple} bgColor="rgba(0,0,0,0.5)" degrees={0} renderIcon={this.menuIcon} hideShadow={true} verticalOrientation="down" offsetY={40} position="right" spacing={20} backdrop={<BlurView />}>
          <ActionButton.Item buttonColor="transparent" textStyle={styles.textStyle} textContainerStyle={styles.textContainerStyle} hideLabelShadow={true} spaceBetween={0} title="Bandstands" onPress={() => this.props.navigation.navigate('Bandstands')}>
            <Image style={styles.marker} source={require("../assets/images/icon_bandstand_marker.png")} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="transparent" textStyle={styles.textStyle} textContainerStyle={styles.textContainerStyle} hideLabelShadow={true} spaceBetween={0} title="Locations" onPress={() => this.props.navigation.navigate('Locations')}>
            <Image style={styles.marker} source={require("../assets/images/icon_marker.png")} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="transparent" textStyle={styles.textStyle} textContainerStyle={styles.textContainerStyle} hideLabelShadow={true} spaceBetween={0} title="Playlist" onPress={() => this.props.navigation.navigate('Playlist')}>
            <Image style={styles.marker} source={require("../assets/images/icon_playlist.png")} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="transparent" textStyle={styles.textStyle} textContainerStyle={styles.textContainerStyle} hideLabelShadow={true} spaceBetween={0} title="Events" onPress={() => this.props.navigation.navigate('Events')}>
            <Image style={styles.marker} source={require("../assets/images/icon_info.png")} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="transparent" textStyle={styles.textStyle} textContainerStyle={styles.textContainerStyle} hideLabelShadow={true} spaceBetween={0} title="Bandstand" onPress={() =>
            this.props.navigation.navigate("Bandstand", {
              // itemId: item.id
              itemId: 1
              })
            }>
            <Image style={styles.marker} source={require("../assets/images/icon_bandstand_alt.png")} />
            {/* <MonoTextBold style={styles.markerText}>1</MonoTextBold> */}
          </ActionButton.Item>
          {/* <ActionButton.Item buttonColor="transparent" title="Welcome" onPress={() => this.props.navigation.navigate('Welcome')}>
            <Image style={styles.marker} source={require("../assets/images/icon_bandstand_alt.png")} />
          </ActionButton.Item> */}
        </ActionButton>
      )
    }
}

const styles = StyleSheet.create({
  marker: {
    width: '100%',
    height: '100%',
  },
  textStyle: {
    color: '#fff',
    fontFamily: 'space-mono-bold'
  },
  textContainerStyle: {
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: Colours.brandPurple,
  },
});

export default withNavigation(NavButton);