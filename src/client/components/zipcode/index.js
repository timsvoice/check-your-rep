import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './style.scss';

const ZipInput = () => (
  <div className="zip-input-container">
    <h2>Zip Code</h2>
    <TextField
      hintText="Your Zip Code"
    />
    <RaisedButton
      label="Find"
      primary={true}
      className="primary-button"
    />
  </div>
);

export default ZipInput;
