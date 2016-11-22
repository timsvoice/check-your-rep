import React from 'react';
import Paper from 'material-ui/Paper';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MapsPinDrop from 'material-ui/svg-icons/maps/pin-drop';
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance';
import ActionSpeakerNotes from 'material-ui/svg-icons/action/speaker-notes';

import ZipInput from '../../components/zipcode/index.js';
import RepresentativeData from '../../components/representatives/index.js';
import KeywordsList from '../../components/keywords/index.js';

const StepperContainer = React.createClass({
  componentWillMount() {
    this.setState({
      finished: false,
      stepIndex: 0,
    });
  },
  handleNext() {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  },
  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  },
  handleFinished() {
    this.setState({
      finished: true
    });
    browserHistory.push('/signup')
  },
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ZipInput handleNext={this.handleNext} />;
      case 1:
        return <RepresentativeData handleNext={this.handleNext} handlePrevious={this.handlePrevious} />;
      case 2:
        return <KeywordsList handleNext={this.handleFinished} handlePrevious={this.handlePrevious} />;
      default:
        return <ZipInput handleNext={this.handleNext} />;
    }
  },
  render() {
    const {finished, stepIndex} = this.state;
    return (
      <div className="stepper-container">
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>
              Enter Zipcode
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Find Your Reps
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Pick Your Issues
            </StepLabel>
          </Step>
        </Stepper>
        <div className="stepper-content">
          { this.getStepContent(stepIndex) }
        </div>
      </div>
    )
  }
})

export default StepperContainer;
