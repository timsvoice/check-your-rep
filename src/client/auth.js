import * as firebase from 'firebase';

module.exports.auth = firebase.auth().onAuthStateChanged(function(user) {
  if (user) return user;
  return null;
});
