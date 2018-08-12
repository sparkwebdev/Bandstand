import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { AppLoading, Asset, Font, Notifications, Audio } from 'expo';
import Nav from "./navigation/Nav";
import LoadingIndicator from "./navigation/LoadingIndicator";
import NavButton from "./navigation/NavButton";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      visited: [],
      // sound: new Audio.Sound(),
      // loop: new Audio.Sound()
    };

  }

  componentDidMount() {
    visited = [7,8];
    const visitedStr = JSON.stringify(visited);
    AsyncStorage.setItem("visited", visitedStr);
    AsyncStorage.getItem("visited").then((value) => {
        this.setState({"visited": value});
    }).done();
    // Notifications.setBadgeNumberAsync(visited.length);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <View style={styles.container}>
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
        <LoadingIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container} visited={this.state.visited}>
          {/* {Platform.OS === 'ios' && <StatusBar hidden />} */}
          {Platform.OS === 'ios'}
          <Nav />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/screens/welcome-00.jpg'),
        require('./assets/images/screens/welcome-00.png'),
        require('./assets/images/screens/welcome-01.png'),
        require('./assets/images/screens/welcome-02.png'),
        require('./assets/images/screens/welcome-03.png'),
        require('./assets/images/screens/welcome-04.png'),

        // Icons - Main Menu
        require('./assets/images/icons/icon_menu.png'),
        require('./assets/images/icons/icon_menu_close.png'),
        require('./assets/images/icons/icon_menu_bandstand.png'),
        require('./assets/images/icons/icon_menu_marker.png'),
        require('./assets/images/icons/icon_menu_playlist.png'),
        require('./assets/images/icons/icon_menu_info.png'),

        // Icons - Interactions
        require('./assets/images/icons/icon_action_bandstand.png'),
        require('./assets/images/icons/icon_action_marker.png'),

        // Icons - Media Player
        require('./assets/images/icons/icon_play.png'),
        require('./assets/images/icons/icon_pause.png'),

        // Icons - Bandstand Markers
        require('./assets/images/icons/icon_bandstand_hollow_grey.png'),
        require('./assets/images/icons/icon_bandstand_hollow_green.png'),

        // Icons - Interface
        require('./assets/images/icons/icon_tick_key.png'),
        require('./assets/images/icons/icon_tick_corner.png'),
        require('./assets/images/icons/icon_back.png'),
      ]),
      Font.loadAsync({
        // ...Icon.Ionicons.font, // This is the font that we are using for our tab bar
        'space-mono': require('./assets/fonts/SourceCodePro-Light.ttf'),
        'space-mono-bold': require('./assets/fonts/SourceCodePro-Medium.ttf'),
      }),
    ]);
  };

  handleLoadingError = error => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
