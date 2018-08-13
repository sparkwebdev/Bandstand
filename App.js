import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { AppLoading, Asset, Font, Notifications, Audio } from 'expo';
import LoadingIndicator from "./navigation/LoadingIndicator";
import Colours from './constants/Colors';
import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import LocationsScreen from './screens/LocationsScreen';
import BandstandsScreen from './screens/BandstandsScreen';
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
    initialRouteName: 'Bandstand',
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

  componentWillMount() {
    // this.resetVisited();
    this.getVisited();
    // Notifications.setBadgeNumberAsync(visited.length);
  }

  getVisited = async () => {
    try {
      const value = await AsyncStorage.getItem('visited');
      this.setState({visited: value || []});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  saveVisited = async (id) => {
    let visited = this.state.visited;
    if (id && !visited.includes(id)) {
      visited.push(id);
    }
    try {
      const visitedStr = JSON.stringify(visited);
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
      const propsForTheScreen = {
        visited      : this.state.visited || [],
        getVisited   : this.getVisited, 
        saveVisited  : this.saveVisited, 
        resetVisited : this.resetVisited, 
      };
      return (
        <View style={styles.container}>
          {/* {Platform.OS === 'ios' && <StatusBar hidden />} */}
          {Platform.OS === 'ios' && <StatusBar />}
          <Screens screenProps={propsForTheScreen} />
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
        require('./assets/images/icons/icon_menu_play.png'),
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
    backgroundColor: Colours.brandGreen,
    // paddingTop: 20,
  }
});
