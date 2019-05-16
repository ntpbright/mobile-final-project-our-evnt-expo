import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator, } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen.js';
import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator({ Login: LogInScreen });

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));