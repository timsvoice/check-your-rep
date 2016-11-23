import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import _ from 'underscore';

import ZipInput from '../../components/zipcode/index.js';
import RepresentativeData from '../../components/representatives/index.js';
import KeywordsList from '../../components/keywords/index.js';
import SignupPage from '../../components/signup/index.js';

const StepperContainer = React.createClass({
  componentWillMount() {
    this.setState({
      finished: false,
      stepIndex: 0,
      userZipcode: null,
      userRepresentatives: [],
      userKeywords: [],
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
  },
  updateZipcode(zipcode) {
    this.setState({
      userZipcode: zipcode
    })
  },
  addRecord(record, type) {
    switch(type) {
      case 'userRepresentatives':
        this.state.userRepresentatives.push(record);
        break;
      case 'userKeywords':
        this.state.userKeywords.push(record);
        break;
    }
  },
  removeRecord(record, type) {
    switch(type) {
      case 'userRepresentatives':
        const recordId = _.indexOf(_.pluck(this.state.userRepresentatives, 'id'), record.id);
        this.state.userRepresentatives.splice(recordId, 1);
        break;
      case 'userKeywords':
        this.state.userKeywords.splice(record, 1);
        break;
    }
  },
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return  <ZipInput
                  handleNext={this.handleNext}
                  updateZipcode={this.updateZipcode}
                  zipcode={this.state.userZipcode}
                />;
      case 1:
        return  <RepresentativeData
                  handleNext={this.handleNext}
                  handlePrev={this.handlePrev}
                  userRepresentatives={this.state.userRepresentatives}
                  addRepresentative={this.addRecord}
                  removeRepresentative={this.removeRecord}
                  zipcode={this.state.userZipcode}
                />;
      case 2:
        return  <KeywordsList
                  handleNext={this.handleNext}
                  handlePrev={this.handlePrev}
                  userKeywords={this.state.userKeywords}
                  addKeyword={this.addRecord}
                  removeKeyword={this.removeRecord}

                />;
      case 3:
        return  <SignupPage
                  handleNext={this.handleFinished}
                  handlePrev={this.handlePrev}
                  userRepresentatives={this.state.userRepresentatives}
                  userKeywords={this.state.userKeywords}
                />;
      default:
        return  <ZipInput
                  handleNext={this.handleNext}
                />;
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
          <Step>
            <StepLabel>
              Signup
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
