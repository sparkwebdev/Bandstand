import React from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import NavButton from "../navigation/NavButton";

import WelcomeScreen from '../screens/WelcomeScreen';
import LocationsScreen from '../screens/LocationsScreen';
import BandstandsScreen from '../screens/BandstandsScreen';
import BandstandScreen from '../screens/BandstandScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import EventsScreen from '../screens/EventsScreen';

// import { MonoTextBold } from "./components/StyledTextBold";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Welcome"
          onPress={() => this.props.navigation.navigate('Welcome')}
        />
        <Button
          title="Go to Bandstands"
          onPress={() => this.props.navigation.navigate('Bandstands')}
        />
        <Button
          title="Go to Locations"
          onPress={() => this.props.navigation.navigate('Locations')}
        />
        <Button
          title="Go to Playlist"
          onPress={() => this.props.navigation.navigate('Playlist')}
        />
        <Button
          title="Go to Bandstand"
          onPress={() => this.props.navigation.navigate('Bandstand')}
        />
        <Button
          title="Go to EventsScreen"
          onPress={() => this.props.navigation.navigate('EventsScreen')}
        />
        <NavButton />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
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
    initialRouteName: 'Home',
  }
);

export default class Nav extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
