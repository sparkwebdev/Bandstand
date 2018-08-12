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
        require('./assets/images/icon_bandstand_marker.png'),
        require('./assets/images/icon_menu.png'),
        require('./assets/images/icon_close.png'),
        require('./assets/images/icon_marker.png'),
        require('./assets/images/icon_info.png'),
        require('./assets/images/icon_playlist.png'),
        require('./assets/images/icon_bandstand.png'),
        require('./assets/images/icon_bandstand_alt.png'),
        require('./assets/images/icon_bandstand_alt_2.png'),
        require('./assets/images/icon_bandstand_alt_3.png'),
        require('./assets/images/icon_play.png'),
        require('./assets/images/icon_pause.png'),
        require('./assets/images/buttons/btn-choose.png'),
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
