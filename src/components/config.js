// import firebase from 'firebase';
// import * as firebase from 'firebase';
// import 'firebase/firestore';

import * as firebase from 'firebase/app';

// // Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCguJwEKockNpGzFkz68yX_4VKnVlz1rOk',
  authDomain: 'awesomeproject-133aa.firebaseapp.com',
  databaseURL: 'https://awesomeproject-133aa.firebaseio.com',
  projectId: 'awesomeproject-133aa',
  storageBucket: 'awesomeproject-133aa.appspot.com',
  messagingSenderId: '774515974437',
  appId: '1:774515974437:web:eb2a9b8c9c01c67a8b3acc',
  measurementId: 'G-FQW7VT411V',
};
var k = firebase.initializeApp(firebaseConfig);
// export default firebase.initializeApp(firebaseConfig);

const d = k.firestore();
d.settings({timestampsInSnapshots: true});

export const api = d;
export const f = k;
