import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { AppLoading, Asset, Font, Notifications, Audio } from 'expo';
import LoadingIndicator from "./navigation/LoadingIndicator";
import Colours from './constants/Colors';
import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import BandstandsScreen from './screens/BandstandsScreen';
import LocationsScreen from './screens/LocationsScreen';
import BandstandScreen from './screens/BandstandScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import EventsScreen from './screens/EventsScreen';
import QrCodeScreen from './screens/QrCodeScreen';

const Screens = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
    },
    Bandstands: {
      screen: BandstandsScreen,
    },
    Locations: {
      screen: LocationsScreen,
    },
    Bandstand: {
      screen: BandstandScreen,
    },
    Playlist: {
      screen: PlaylistScreen,
    },
    Events: {
      screen: EventsScreen,
    },
    QrCode: {
      screen: QrCodeScreen,
    },
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      visited: [],
    };
  }

  async componentDidMount() {
    // this.resetVisited();
    // this.resetWelcomed();
    // Notifications.setBadgeNumberAsync(visited.length);
    try {
      const value = await AsyncStorage.getItem('visited');
      const valueParsed = JSON.parse(value);
      this.setState({visited: valueParsed || []});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
    // Audio.setIsEnabledAsync(true);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
  }

  saveVisited = async (id) => {
    const visited = this.state.visited.includes(id) ? this.state.visited : [...this.state.visited, id];
    const visitedStr = JSON.stringify(visited);
    try {
      await AsyncStorage.setItem('visited', visitedStr);
      this.setState({visited: visited});
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  resetVisited = async () => {
    try {
      await AsyncStorage.removeItem('visited');
      const value = await AsyncStorage.getItem('visited');
      this.setState({visited: value || []});
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }

  resetWelcomed = async () => {
    try {
      await AsyncStorage.removeItem('welcomed');
    } catch (error) {
      console.log("Error resetting data" + error);
    }
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
    }
    return (
      <View style={styles.container}>
        {/* {Platform.OS === 'ios' && <StatusBar hidden />} */}
        {Platform.OS === 'ios' && <StatusBar />}
        <Screens screenProps={{visited: this.state.visited, saveVisited: this.saveVisited}}  />
      </View>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // Welcome Screens
        require('./assets/images/screens/welcome-00.jpg'),
        require('./assets/images/screens/welcome-00.png'),
        require('./assets/images/screens/welcome-01.png'),
        require('./assets/images/screens/welcome-02.png'),
        require('./assets/images/screens/welcome-03.png'),
        require('./assets/images/screens/welcome-04.png'),

        // Banstand Screens
        require('./assets/images/bandstand-01-00.jpg'),
        require('./assets/images/bandstand-02-00.jpg'),
        require('./assets/images/bandstand-03-00.jpg'),
        require('./assets/images/bandstand-04-00.jpg'),
        require('./assets/images/bandstand-05-00.jpg'),
        require('./assets/images/bandstand-06-00.jpg'),
        require('./assets/images/bandstand-07-00.jpg'),
        require('./assets/images/bandstand-08-00.jpg'),
        require('./assets/images/bandstand-01-01.jpg'),
        require('./assets/images/bandstand-02-01.jpg'),
        require('./assets/images/bandstand-03-01.jpg'),
        require('./assets/images/bandstand-04-01.jpg'),
        require('./assets/images/bandstand-05-01.jpg'),
        require('./assets/images/bandstand-06-01.jpg'),
        require('./assets/images/bandstand-07-01.jpg'),
        require('./assets/images/bandstand-08-01.jpg'),
        require('./assets/images/bandstand-01-02.jpg'),
        require('./assets/images/bandstand-02-02.jpg'),
        require('./assets/images/bandstand-03-02.jpg'),
        require('./assets/images/bandstand-04-02.jpg'),
        require('./assets/images/bandstand-05-02.jpg'),
        require('./assets/images/bandstand-06-02.jpg'),
        require('./assets/images/bandstand-07-02.jpg'),
        require('./assets/images/bandstand-08-02.jpg'),
        require('./assets/images/bandstand-01-03.jpg'),
        require('./assets/images/bandstand-02-03.jpg'),
        require('./assets/images/bandstand-03-03.jpg'),
        require('./assets/images/bandstand-04-03.jpg'),
        require('./assets/images/bandstand-05-03.jpg'),
        require('./assets/images/bandstand-06-03.jpg'),
        require('./assets/images/bandstand-07-03.jpg'),
        require('./assets/images/bandstand-08-03.jpg'),
        require('./assets/images/bandstand-02-04.jpg'),
        require('./assets/images/bandstand-03-04.jpg'),
        require('./assets/images/bandstand-04-04.jpg'),
        require('./assets/images/bandstand-05-04.jpg'),
        require('./assets/images/bandstand-06-04.jpg'),
        require('./assets/images/bandstand-07-04.jpg'),
        require('./assets/images/bandstand-02-05.jpg'),
        require('./assets/images/bandstand-06-05.jpg'),
        require('./assets/images/bandstand-07-05.jpg'),
        require('./assets/images/bandstand-06-06.jpg'),
        require('./assets/images/bandstand-07-06.jpg'),
        require('./assets/images/bandstand-06-07.jpg'),
        require('./assets/images/bandstand-07-07.jpg'),
        require('./assets/images/bandstand-06-08.jpg'),
        require('./assets/images/bandstand-07-08.jpg'),

        // Events Screens
        require('./assets/images/screens/events-00.jpg'),
        require('./assets/images/screens/events-01.jpg'),

        // Icons - Main Menu
        require('./assets/images/icons/icon_menu.png'),
        require('./assets/images/icons/icon_menu_close.png'),
        require('./assets/images/icons/icon_menu_bandstand.png'),
        require('./assets/images/icons/icon_menu_marker.png'),
        require('./assets/images/icons/icon_menu_play.png'),
        require('./assets/images/icons/icon_menu_playlist.png'),
        require('./assets/images/icons/icon_menu_info.png'),

        // Icons - Interactions
        require('./assets/images/icons/icon_action_bandstand.png'),
        require('./assets/images/icons/icon_action_marker.png'),
        require('./assets/images/icons/icon_action_qr.png'),
        require('./assets/images/icons/icon_action_compass.png'),

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
    backgroundColor: Colours.brandGreen,
    // paddingTop: 20,
  }
});
