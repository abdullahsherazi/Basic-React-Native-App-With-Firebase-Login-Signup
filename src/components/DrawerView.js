import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

class DrawerView extends React.Component {
  state = {
    switchValue: true,
  };
  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'white',
          },
        ]}>
        <View style={[styles.View1]}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              borderWidth: 0.5,
              borderColor: '#bfbfbf',
              overflow: 'hidden',
              backgroundColor: '#d9d9d9',
            }}>
            <Image
              source={{uri: this.props.reduxState.userdata.avatar}}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          </View>

          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              color: 'white',
              textTransform: 'capitalize',
            }}>
            {this.props.reduxState.userdata.userName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#fe337c',
                paddingHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text style={{color: 'white'}}>Pro</Text>
            </View>
            <Text style={{color: 'grey', marginLeft: 8}}>Seller</Text>
            <Text style={{color: '#dd922a', marginLeft: 8}}>4.8 *</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('Home');
          }}>
          <View style={styles.ContentViewInside1}>
            <AntDesign
              name="home"
              style={{marginLeft: 8}}
              size={20}
              color="black"
            />
          </View>
          <View style={styles.ContentViewInside2}>
            <Text style={[styles.ContentViewText, {color: 'black'}]}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('Home');
          }}>
          <View style={styles.ContentViewInside1}>
            <SimpleLineIcons
              name="people"
              style={{marginLeft: 8}}
              size={20}
              color="black"
            />
          </View>
          <View style={styles.ContentViewInside2}>
            <Text style={[styles.ContentViewText, {color: 'black'}]}>
              Women
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('Home');
          }}>
          <View style={styles.ContentViewInside1}>
            <SimpleLineIcons
              name="people"
              style={{marginLeft: 8}}
              size={20}
              color="black"
            />
          </View>
          <View style={styles.ContentViewInside2}>
            <Text style={[styles.ContentViewText, {color: 'black'}]}>Men</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('Home');
          }}>
          <View style={styles.ContentViewInside1}>
            <MaterialIcons
              name="child-care"
              style={{marginLeft: 8}}
              size={20}
              color="black"
            />
          </View>
          <View style={styles.ContentViewInside2}>
            <Text style={[styles.ContentViewText, {color: 'black'}]}>Kids</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('Home');
          }}>
          <View style={styles.ContentViewInside1}>
            <MaterialCommunityIcons
              name="cube-outline"
              style={{marginLeft: 8}}
              size={20}
              color="black"
            />
          </View>
          <View style={styles.ContentViewInside2}>
            <Text style={[styles.ContentViewText, {color: 'black'}]}>
              New Collection
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('Home');
          }}>
          <View style={styles.ContentViewInside1}>
            <AntDesign
              name="profile"
              style={{marginLeft: 8}}
              size={20}
              color="black"
            />
          </View>
          <View style={styles.ContentViewInside2}>
            <Text style={[styles.ContentViewText, {color: 'black'}]}>
              Profile
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ContentView}
          onPress={() => {
            this.props.hideDrawer();
            this.props.navigation.navigate('Home');
          }}>
          <View style={styles.ContentViewInside1}>
            <AntDesign
              name="setting"
              style={{marginLeft: 8}}
              size={20}
              color="black"
            />
          </View>
          <View style={styles.ContentViewInside2}>
            <Text style={[styles.ContentViewText, {color: 'black'}]}>
              Setting
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ContentView, {marginTop: 30}]}
          onPress={() => {
            this.props.hideDrawer();
            this.props.reduxActions.signout(this.props.navigation);
          }}>
          <View style={styles.ContentViewInside1}>
            <SimpleLineIcons
              name="logout"
              style={{marginLeft: 8}}
              size={20}
              color="black"
            />
          </View>
          <View style={styles.ContentViewInside2}>
            <Text style={[styles.ContentViewText, {color: 'black'}]}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  View1: {
    width: '100%',
    borderBottomWidth: 0.5,
    marginBottom: 20,
    backgroundColor: '#2c094c',
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  ContentView: {
    paddingLeft: 15,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
  },
  ContentViewInside1: {
    width: '15%',
    justifyContent: 'center',
    borderBottomWidth: 0,
    borderBottomColor: '#796a3f',
  },
  ContentViewInside2: {
    paddingLeft: 0,
    width: '85%',
    borderBottomWidth: 0,
    borderBottomColor: '#796a3f',
    justifyContent: 'center',
  },
  ContentViewText: {
    color: '#4e3b00',
    fontSize: 16,
  },
  Notification: {
    paddingLeft: 15,
    height: 50,
    flexDirection: 'row',
    width: '100%',
  },
  NotificationInside1: {
    width: '15%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#796a3f',
  },
  NotificationInside2: {
    paddingLeft: 0,
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: '#796a3f',
    justifyContent: 'center',
  },
  NotificationInside3: {
    width: '25%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#796a3f',
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
)(DrawerView);
