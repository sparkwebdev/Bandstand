import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon, Notifications } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    visited: []
  };

  // saveVisited(value) {
  //     AsyncStorage.setItem("visited", value);
  //     this.setState({"visited": value});
  // }

  componentDidMount() {
    visited = [2,3,5];
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
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container} visited={this.state.visited}>
          {Platform.OS === 'ios' && <StatusBar hidden />}
          <AppNavigator />
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
        require('./assets/images/icon_bandstand.png'),
        require('./assets/images/icon_bandstand_alt.png'),
        require('./assets/images/icon_bandstand_alt_2.png'),
        require('./assets/images/icon_play.png'),
        require('./assets/images/icon_pause.png'),
        require('./assets/images/buttons/btn-choose.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font, // This is the font that we are using for our tab bar
        'space-mono': require('./assets/fonts/SourceCodePro-Light.ttf'),
        'space-mono-bold': require('./assets/fonts/SourceCodePro-Medium.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
