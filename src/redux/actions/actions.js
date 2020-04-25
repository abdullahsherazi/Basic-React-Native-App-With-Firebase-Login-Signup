import * as actionTypes from './types';
import * as firestoreCollections from '../../constants/firestoreCollections';
// import * as paginationConstants from "../../constants/paginationConstants";
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions, StackActions} from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const signup = (navigation, userdata, toast) => async dispatch => {
  dispatch({type: actionTypes.START_LOADING});

  auth()
    .createUserWithEmailAndPassword(userdata.emailAddress, userdata.password)
    .then(res => {
      console.log('SignUp Response', res.user.uid);
      const ref = firestore()
        .collection('users')
        .doc(res.user.uid);
      auth()
        .currentUser.sendEmailVerification()
        .then(async () => {
          await ref.set({
            emailAddress: userdata.emailAddress,
            userName: userdata.userName,
            avatar:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQG-GWp9R0p9UrshUAZRiOiH-62eKWwyBOlInissnsMS3PeiPp0',
          });

          await auth().signOut();
          await navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'SignIn',
                }),
              ],
            }),
          );
          dispatch({type: actionTypes.NOT_LOADING});
          alert(
            'Your account has been created and verification email has been sent to your email: ' +
              res.user.email +
              ', Kindly first verify your email from there.',
          );
        })
        .catch(() => {
          dispatch({type: actionTypes.NOT_LOADING});
          auth().currentUser.delete();
          auth().signOut();
          toast.show(
            'Some error occured in sending the verification email, Kindly signup again',
            2500,
          );
        });
    })
    .catch(err => {
      dispatch({type: actionTypes.NOT_LOADING});
      toast.show(err.message, 2500);
    });
};

export const signin = (navigation, userdata, toast) => async dispatch => {
  dispatch({type: actionTypes.START_LOADING});
  auth()
    .signInWithEmailAndPassword(userdata.emailAddress, userdata.password)
    .then(res => {
      console.log('SignIn Response', res);
      if (res.user.emailVerified === true) {
        const loginRef = firestore()
          .collection(firestoreCollections.users)
          .doc(res.user.uid);
        loginRef
          .get()
          .then(doc => {
            if (doc.exists) {
              dispatch({
                type: actionTypes.SET_USER_DATA,
                payload: {...doc.data(), uid: res.user.uid},
              });
              dispatch({type: actionTypes.NOT_LOADING});
              navigation.dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({
                      routeName: 'Home',
                    }),
                  ],
                }),
              );
            } else {
              dispatch({type: actionTypes.NOT_LOADING});
              toast.show('Your data is not available.', 1500);
            }
          })
          .catch(error => {
            dispatch({type: actionTypes.NOT_LOADING});
            toast.show(error.message, 1500);
          });
      } else if (res.user.emailVerified === false) {
        auth().signOut();
        dispatch({type: actionTypes.NOT_LOADING});
        toast.show(
          'Verification email has been sent to your email: ' +
            res.user.email +
            ', Kindly first verify your email from there.',
          2500,
        );
      }
    })
    .catch(err => {
      dispatch({type: actionTypes.NOT_LOADING});
      toast.show(err.message, 2000);
    });
};

export const signout = navigation => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'SignIn',
          }),
        ],
      });
      navigation.dispatch(resetAction);
    })
    .catch(err => {
      alert('Unable to signout because', err.message);
    });
};

export const checkUser = (navigation, toast) => async dispatch => {
  dispatch({type: actionTypes.START_LOADING});
  var user = auth().currentUser;
  if (user) {
    if (user._user.emailVerified === true) {
      const loginRef = firestore()
        .collection(firestoreCollections.users)
        .doc(user._user.uid);
      loginRef
        .get()
        .then(doc => {
          // console.log(doc);
          if (doc.exists) {
            dispatch({
              type: actionTypes.SET_USER_DATA,
              payload: {...doc.data(), uid: user._user.uid},
            });
            dispatch({type: actionTypes.NOT_LOADING});
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Home',
                }),
              ],
            });
            navigation.dispatch(resetAction);
          } else {
            dispatch({type: actionTypes.NOT_LOADING});

            navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'SignIn',
                  }),
                ],
              }),
            );
            // toast.show('Your data is not available.', 1500);
          }
        })
        .catch(error => {
          // console.log("Error getting document:", error.message);
          dispatch({type: actionTypes.NOT_LOADING});
          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'SignIn',
                }),
              ],
            }),
          );
          // toast.show(error.message, 1500);
        });
    } else if (user._user.emailVerified === false) {
      dispatch({type: actionTypes.NOT_LOADING});
      // toast.show(
      //   'Verification email has been sent to your email: ' +
      //     user._user.email +
      //     ', Kindly first verify you email from there.',
      //   2500,
      // );
    }
  } else {
    dispatch({type: actionTypes.NOT_LOADING});
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'SignIn',
          }),
        ],
      }),
    );
  }
};

export const internetListener = (navigation, checkUser) => async dispatch => {
  NetInfo.fetch().then(state => {
    if (!state.isConnected) {
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'NoInternetErrorScreen',
            }),
          ],
        }),
      );
    } else {
      checkUser();
    }
  });
  NetInfo.addEventListener(async state => {
    connected = state.isConnected;
    if (!connected) {
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'NoInternetErrorScreen',
            }),
          ],
        }),
      );
    }
  });
};
