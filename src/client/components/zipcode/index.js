import React from 'react';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import './style.scss';

const ZipInput = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    const zipQuery = e.target.zipcode.value;
    console.log(e);
    browserHistory.push(`zipcode=${zipQuery}`);
  },
  render() {
    return (
      <Paper>
        <div className="zip-input-container">
          <form onSubmit={this.handleSubmit}>
            <h2>Zip Code</h2>
            <TextField
              id="zipcode"
              hintText="Your Zip Code"
            />
            <RaisedButton
              label="Find"
              primary={true}
              className="primary-button"
              type="submit"
            />
          </form>
        </div>
      </Paper>
    );
  }
});

export default ZipInput;
