import React from 'react';
import store from 'store';
import _ from 'underscore';

import { List, ListItem } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import StepperNavigaiton from '../buttons/index.js';
import SignupForm from './signup-form.js'
import './style.scss';

const SignupPage = React.createClass({
  render() {
    return (
      <div className="signup-container">
        <SignupForm
          userRepresentatives={ this.props.userRepresentatives }
          userKeywords={ this.props.userKeywords }
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
