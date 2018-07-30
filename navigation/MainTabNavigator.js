import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WelcomeScreen from '../screens/WelcomeScreen';
import LocationsScreen from '../screens/LocationsScreen';
import BandstandsScreen from '../screens/BandstandsScreen';
import BandstandScreen from '../screens/BandstandScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import EventsScreen from '../screens/EventsScreen';

const WelcomeStack = createStackNavigator({
  Welcome: WelcomeScreen,
});

WelcomeStack.navigationOptions = {
  tabBarLabel: 'Welcome',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const BandstandsStack = createStackNavigator({
  Bandstands: BandstandsScreen,
});

BandstandsStack.navigationOptions = {
  tabBarLabel: 'Bandstands',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const LocationsStack = createStackNavigator({
  Locations: LocationsScreen,
});

LocationsStack.navigationOptions = {
  tabBarLabel: 'Locations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const BandstandStack = createStackNavigator({
  Bandstand: BandstandScreen,
});

BandstandStack.navigationOptions = {
  tabBarLabel: 'Bandstand',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const PlaylistStack = createStackNavigator({
  Playlist: PlaylistScreen,
});

PlaylistStack.navigationOptions = {
  tabBarLabel: 'Playlist',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const EventsStack = createStackNavigator({
  Events: EventsScreen,
});

EventsStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  WelcomeStack,
  BandstandsStack,
  LocationsStack,
  BandstandStack,
  PlaylistStack,
  EventsStack,
});
