import * as firebase from 'firebase';

// Firebase config
var config = {
  apiKey: "AIzaSyCXK-7Gi1q6y-5tDgnk0Orr4MNCH_Qj7fU",
  authDomain: "checkyourrep-bbfa4.firebaseapp.com",
  databaseURL: "https://checkyourrep-bbfa4.firebaseio.com",
  storageBucket: "checkyourrep-bbfa4.appspot.com",
  messagingSenderId: "1069063112434"
};
firebase.initializeApp(config);

module.exports.database = firebase.database();
