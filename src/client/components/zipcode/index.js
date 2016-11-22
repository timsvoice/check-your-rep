import React from 'react';
import { browserHistory, Link } from 'react-router';
import store from 'store';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import './style.scss';

const ZipInput = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    const zipQuery = e.target.zipcode.value;
    store.set('zipcode', zipQuery);
    this.props.handleNext();
  },
  render() {
    return (
        <div className="zip-input-container">
          <form onSubmit={this.handleSubmit}>
            <h2>Zip Code</h2>
            <TextField
              id="zipcode"
              hintText="Your Zip Code"
              defaultValue={store.get('zipcode')}
            />
            <RaisedButton
              label="Find"
              primary={true}
              className="primary-button"
              type="submit"
            />
          </form>
        </div>
    );
  }
});

export default ZipInput;
