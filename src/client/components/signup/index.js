import React from 'react';
import store from 'store';
import _ from 'underscore';

import { List, ListItem } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { red500, blue500 } from 'material-ui/styles/colors';
import StepperNavigaiton from '../buttons/index.js';
import './style.scss';

const SignupPage = React.createClass({
  signUp() {

  },
  render() {
    return (
      <div className="signup-container">
        <form className="singup-fields">
          <TextField
            hintText="email"
          /><br />
          <TextField
            hintText="password"
          /><br />
        <RaisedButton
            label="Signup"
            labelPosition="before"
            primary={true}
            type="submit"
          />
        </form>
        <FlatButton
          label="Google"
          labelPosition="before"
          backgroundColor={ red500 }
        />
        <FlatButton
          label="Twitter"
          labelPosition="before"
          backgroundColor={ blue500 }
        />
        <StepperNavigaiton
          handlePrev={ this.props.handlePrev }
          handleNext={ this.props.handleNext }
          nextLabel="Signup"
        />
      </div>
    )
  }
})

export default SignupPage;
