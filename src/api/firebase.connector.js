import rp from 'request-promise';
import User from './connectors.js';
import * as firebase from "firebase";

// Firebase

module.exports.user = {
  update(id, mutation) {
    firebase.database().ref(`users/${id}`).set( mutation )
      .then((user) => { console.log(user) })
      .catch((err) => { console.log(err) });
  },
  delete(id) {
    firebase.database().ref(`users/${id}`).remove()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) });
  },
};
