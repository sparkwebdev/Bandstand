import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WelcomeScreen from '../screens/WelcomeScreen';
import LocationsScreen from '../screens/LocationsScreen';
import BandstandsScreen from '../screens/BandstandsScreen';
import BandstandScreen from '../screens/BandstandScreen';
import PlaylistScreen from '../screens/PlaylistScreen';

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

const BandstandsStack = createStackNavigator({
  Bandstands: BandstandsScreen,
});

BandstandsStack.navigationOptions = {
  tabBarLabel: 'Bandstands',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
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
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
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

export default createBottomTabNavigator({
  WelcomeStack,
  LocationsStack,
  BandstandsStack,
  BandstandStack,
  PlaylistStack,
});
