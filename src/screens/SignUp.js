import React from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Loader from '../components/Loader';
import GlobalHeader from '../components/GlobalHeader';
import GlobalInput from '../components/GlobalInput';
import GlobalButton from '../components/GlobalButton';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';

class SignIn extends React.Component {
  state = {
    emailAddress: '',
    password: '',
    error: false,
    validEmail: false,
    userName: '',
  };

  signup = () => {
    if (
      this.state.emailAddress === '' ||
      this.state.password === '' ||
      this.state.userName === ''
    ) {
      this.setState({error: 'Kindly Fill All The Fields'});
    } else if (this.state.validEmail === false) {
      this.setState({error: 'Kindly Enter Correct Email'});
    } else if (this.state.password.length < 8) {
      this.setState({error: 'password length should be 8 or greater!'});
    } else {
      this.setState({error: false});
      let userdata = {
        emailAddress: this.state.emailAddress.trim(),
        password: this.state.password.trim(),
        userName: this.state.userName,
      };
      this.props.reduxActions.signup(
        this.props.navigation,
        userdata,
        this.refs.toast,
      );
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#2c094c',
        }}>
        <GlobalHeader
          backArrow={true}
          headingText={'Create Account'}
          navigation={this.props.navigation}
        />
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 30,
              overflow: 'hidden',
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={{width: '20%', height: 40}}>
              <Image
                source={require('../../assets/images/facebook.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{width: '20%', height: 40}}>
              <Image
                source={require('../../assets/images/twitter.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{width: '20%', height: 40}}>
              <Image
                source={require('../../assets/images/google-plus.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <Text style={{color: 'white', textAlign: 'center', marginTop: 30}}>
            or be classical
          </Text>
          <GlobalInput
            borderColor="black"
            marginTop={40}
            borderRadius={20}
            placeholder="Username"
            changeText={userName => this.setState({userName})}
          />

          <GlobalInput
            marginTop={10}
            borderColor="black"
            placeholder="Email Address"
            changeText={email => {
              const emailCheckRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              this.setState({emailAddress: email});
              if (emailCheckRegex.test(String(email)) === true) {
                this.setState({validEmail: true});
              } else if (emailCheckRegex.test(String(email)) === false) {
                this.setState({validEmail: false});
              }
            }}
          />
          <GlobalInput
            borderColor="black"
            password={true}
            marginTop={10}
            borderRadius={20}
            placeholder="Password"
            changeText={password => this.setState({password})}
            secureTextEntry={true}
          />

          <GlobalButton
            backgroundColor="#4a1679"
            marginTop={20}
            marginBottom={10}
            borderRadius={5}
            width={'90%'}
            text={'SIGN UP'}
            textColor="white"
            fontWeight="bold"
            submit={() => this.signup()}
          />

          {this.state.error ? (
            <Text
              style={{
                marginTop: 5,
                color: 'red',
                textAlign: 'center',
                fontSize: 10,
              }}>
              {this.state.error}
            </Text>
          ) : null}

          <View
            style={{
              width: '90%',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
              }}>
              Already have an account?
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                marginLeft: 4,
                fontWeight: 'bold',
              }}
              onPress={() => {
                this.props.navigation.navigate('SignIn');
              }}>
              Sign in
            </Text>
          </View>
        </ScrollView>

        <Toast
          ref="toast"
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
            width: '90%',
            alignSelf: 'center',
          }}
          useNativeDriver={true}
          position="center"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{
            color: 'white',
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 'bold',
          }}
        />
        {this.props.reduxState.loading ? <Loader /> : null}
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
)(SignIn);
