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
  componentWillMount() {
    this.setState({
      open: false
    });
  },
  openDialog() {
    this.setState({
      open: true
    })
  },
  closeDialog() {
    this.setState({
      open: false
    })
  },
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.closeDialog}
      />,
      <FlatButton
          label="Signup"
          primary={true}
          onTouchTap={this.props.signUp}
        />
      ];
    return (
      <div className="signup-container">
        <List >
          { this.props.userRepresentatives.map((representative) =>
            <ListItem
              key={ representative.id }
              leftAvatar={<Avatar src={ `https://theunitedstates.io/images/congress/225x275/${representative.id}.jpg` } />}
              primaryText={ `${representative.first_name} ${representative.last_name}` }
              secondaryText={ `${representative.chamber.toUpperCase()} - ${representative.state}` }
              disabled={true}
            />
          )}
        </List>
        { this.props.userKeywords.map((keyword) =>
          <Chip key={keyword}>
            { keyword }
          </Chip>
        )}

        <Dialog
          title="Signup"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <SignupForm />
        </Dialog>

        <StepperNavigaiton
          handlePrev={ this.props.handlePrev }
          handleNext={ this.openDialog }
          nextLabel="Signup"
        />
      </div>
    )
  }
})

export default SignupPage;
