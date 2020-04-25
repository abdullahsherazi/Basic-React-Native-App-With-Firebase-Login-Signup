import React from 'react';
import StackNavigator from './src/screens/StackNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {StatusBar} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#4a1679"
          // translucent={true}
        />
        <StackNavigator />
      </Provider>
    );
  }
}
