import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {Header, Body, Left, Right} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import DrawerView from './DrawerView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class GlobalHeader extends Component {
  state = {
    visible: false,
  };
  hideDrawer = () => {
    this.setState({visible: false});
  };
  render() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <Header
        androidStatusBarColor="#4a1679"
        style={{
          backgroundColor: 'transparent',
          elevation: 0,
        }}>
        <Left
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {this.props.backArrow ? (
            <TouchableOpacity
              style={{
                marginLeft: 10,
              }}
              onPress={() => this.props.navigation.goBack()}>
              <FontAwesome name={'chevron-left'} size={15} color="white" />
            </TouchableOpacity>
          ) : this.props.drawerIcon === true ? (
            <TouchableOpacity
              style={styles.arrowView}
              onPress={() => this.setState({visible: true})}>
              <Image
                source={require('../../assets/images/drawer.png')}
                style={{
                  width: 10,
                  height: 18,
                  tintColor: '#2c094c',
                }}
              />
            </TouchableOpacity>
          ) : null}

          <Text style={[styles.Text, {color: 'white', marginLeft: 20}]}>
            {this.props.headingText}
          </Text>
        </Left>

        <Right style={{flex: 1, justifyContent: 'center'}} />

        <Modal
          isVisible={this.state.visible}
          onBackdropPress={this.hideDrawer}
          onBackButtonPress={this.hideDrawer}
          style={{
            backgroundColor: 'transparent',
            margin: 0,
          }}
          animationInTiming={800}
          animationOutTiming={800}
          animationOut="slideOutLeft"
          animationIn="slideInLeft">
          <View style={{width: deviceWidth * 0.73, height: '100%'}}>
            <DrawerView
              hideDrawer={this.hideDrawer}
              navigation={this.props.navigation}
            />
          </View>
        </Modal>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  avatarImage: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: "hidden",
    backgroundColor: 'red',
  },
  arrowView: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.52,
    shadowRadius: 5,

    elevation: 8,
  },
  searchImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
    alignSelf: 'flex-end',
  },
});

const mapStateToProps = state => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = dispatch => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalHeader);
