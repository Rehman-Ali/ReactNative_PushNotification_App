import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAT_gXVc-tV0sa_OOHcxDQM_lGVMhA8T90',
  authDomain: 'react-native-app-38ac1.firebaseapp.com',
  databaseURL: 'https://react-native-app-38ac1.firebaseio.com',
  projectId: 'react-native-app-38ac1',
  storageBucket: 'react-native-app-38ac1.appspot.com',
  messagingSenderId: '483629287553',
  appId: '1:483629287553:web:1ca33bbc22300df5b22580',
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
