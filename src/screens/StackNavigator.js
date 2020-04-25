import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NoInternetErrorScreen from './NoInternetErrorScreen';
import Home from './Home';
import SplashScreen from './SplashScreen';

const AppNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: () => ({
        header: null,
      }),
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        header: null,
      }),
    },
    NoInternetErrorScreen: {
      screen: NoInternetErrorScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Home: {
      screen: Home,
      navigationOptions: () => ({
        header: null,
      }),
    },
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'SplashScreen',
  },
);
const AppContainer = createAppContainer(AppNavigator);

export default class StackNavigator extends Component {
  render() {
    return <AppContainer />;
  }
}
