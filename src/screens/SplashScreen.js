import React from 'react';
import {View, Animated, SafeAreaView} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';

class SplashScreen extends React.Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(0.4);
  }

  checkUser = () => {
    this.props.reduxActions.checkUser(this.props.navigation);
  };

  componentDidMount() {
    this.spring();
    let timeOutNavigate = setTimeout(() => {
      this.props.reduxActions.internetListener(
        this.props.navigation,
        this.checkUser,
      );
      clearTimeout(timeOutNavigate);
    }, 3000);
  }
  spring() {
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#2c094c'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Image
            style={{
              width: 150,
              height: 150,
              transform: [{scale: this.springValue}],
            }}
            source={require('../../assets/images/welcome.png')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = dispatch => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
