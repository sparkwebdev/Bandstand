import React from 'react';
import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import LocationsScreen from '../screens/LocationsScreen';
import BandstandsScreen from '../screens/BandstandsScreen';
import BandstandScreen from '../screens/BandstandScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import EventsScreen from '../screens/EventsScreen';

const RootStack = createStackNavigator(
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
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default class Nav extends React.Component {
  render() {
    return <RootStack />;
  }
}
