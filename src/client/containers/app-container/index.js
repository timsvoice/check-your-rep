import React from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import { database } from '../../data';
import auth from '../../auth';

import AppBar from 'material-ui/AppBar';
import './style.scss';

const AppContainer = React.createClass({
  componentWillMount() {
    console.log(this.state);
    firebase.auth().onAuthStateChanged((auth) => {
      this.setState({
        user: auth
      })
    })
  },
  signOut() {
    firebase.auth().signOut()
      .then(() => {
        browserHistory.push('/');
      })
      .catch(err => { throw err; })
  },
  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  },
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className="app-container">
          <AppBar
            title="Title"
            iconClassNameLeft="muidocs-icon-navigation-expand-more"
            iconElementRight={ (this.state && this.state.user === null) ?
              <FlatButton
                label="Sign In"
                onClick={ this.signIn }
              /> :
              <FlatButton
                label="Sign Out"
                primary={ true }
                onClick={ this.signOut }
              />
            }
          />
          <div className="app-content">
            { this.state ?
              React.cloneElement(this.props.children, { user: this.state.user }) :
              <CircularProgress />
            }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
});

export default AppContainer;
