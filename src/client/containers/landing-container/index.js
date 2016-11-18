import React from 'react';
import Paper from 'material-ui/Paper';

import ZipInput from '../../components/zipcode/index.js';
import RepresentativeListWithData from '../../components/representatives/index.js';
import './style.scss';

const LandingContainer = () => {
  return (
    <Paper zDepth={1} className="landing-container">
      <ZipInput />
    </Paper>
  )
};

export default LandingContainer;
