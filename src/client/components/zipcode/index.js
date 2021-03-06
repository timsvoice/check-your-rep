import React from 'react';
import { browserHistory, Link } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import StepperNavigaiton from '../buttons/index.js';

import './style.scss';

const ZipInput = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log(this);
    const zipQuery = e.target.zipcode.value;
    if (zipQuery.length < 5 ) {
      alert('Please enter valid 5 digit zipcode')
    } else {
      this.props.updateZipcode(zipQuery);
      this.props.handleNext();
    }
  },
  render() {
    return (
        <div className="zip-input-container">
          <form onSubmit={this.handleSubmit}>
            <h2>Zip Code</h2>
            <TextField
              id="zipcode"
              hintText="Your Zip Code"
              defaultValue={this.props.zipcode}
            />
            <StepperNavigaiton
              handlePrev={ this.handlePrev }
              nextType="submit"
              prevIsDisabled={true}
            />
          </form>
        </div>
    );
  }
});

export default ZipInput;
