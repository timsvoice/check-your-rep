import React from 'react';
import firebase from 'firebase';
import database from '../../data.js';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { red500, blue500 } from 'material-ui/styles/colors';

const provider = new firebase.auth.GoogleAuthProvider();

const SignupForm = React.createClass({
  signupUser(e) {
    e.preventDefault();
    const userEmail = this.refs.userEmail.input.value;
    const userPassword = ths.refs.userPassword.input.value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        database.ref(`users`).set({
          name: null,
          email: user.email,
        })
      })
      .catch((err) => {
        throw err;
      })
  },
  signupGoogle(e) {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        const token = res.credential.accessToken;
        const user = res.user;
        database.ref(`users/${user.id}`).set({
          name: user.displayName,
          email: user.email,
          token,
        })
      })
      .catch((err) => { throw err; })
  },
  render() {
    return (
      <div className="signup-container">
        <form className="singup-fields" onSubmit={this.signupUser}>
          <TextField
            hintText="email"
            underlineShow={false}
            ref="userEmail"
          />
          <Divider />
          <TextField
            hintText="password"
            underlineShow={false}
            type="password"
            ref="userPassword"
          />
          <Divider />
          <FlatButton
            label="Google"
            labelPosition="before"
            backgroundColor={ red500 }
            onClick={this.signupGoogle}
          />
          <Divider />
          <RaisedButton
            label="Signup"
            labelPosition="before"
            primary={true}
            type="submit"
          />
        </form>
      </div>
    )
  }
})

export default SignupForm;
