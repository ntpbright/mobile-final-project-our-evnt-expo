import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Color from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import MyEventScreen from '../screens/MyEventScreen';
import ProfileScreen from '../screens/ProfileScreen'
import CreateEventScreen from '../screens/CreateEventScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  EventDetail: EventDetailScreen,
  CreateEvent: CreateEventScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
  tabBarOptions: {
    showLabel: false,
    iconStyle: {
      width: 100,
      height: 100
    },
    headerLeftContainerStyle: {
      color: Color.tintColor,
    }
  }
};

const MyEventStack = createStackNavigator({
  MyEvent: MyEventScreen,
  EventDetailInMyEvnet: EventDetailScreen,
});

MyEventStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
  tabBarOptions: {
    showLabel: false,
    iconStyle: {
      width: 100,
      height: 100
    }
  }
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
  tabBarOptions: {
    showLabel: false,
    iconStyle: {
      width: 100,
      height: 100
    }
  }
};

export default createBottomTabNavigator({
  HomeStack,
  MyEventStack,
  ProfileStack,
});
