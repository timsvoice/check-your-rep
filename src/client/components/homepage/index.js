import React from 'react';
import { browserHistory } from 'react-router';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const HomePage = (props) => {
  const start = (e) => {
    browserHistory.push('/start');
  };
  return (
    <div>
    <Paper zDepth={1} rounded={false}>
      <h1>Check Your Rep</h1>
      <p>Welcome to Check Your Rep!</p>
      <RaisedButton
        label="Get Started"
        primary={true}
        onClick={start}
      />
    </Paper>
    </div>
  )
}

export default HomePage;
