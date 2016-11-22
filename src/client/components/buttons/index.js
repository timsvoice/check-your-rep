import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const StepperNavigaiton = React.createClass({
  render() {
    return (
      <div>
        <FlatButton
          label="Back"
          className="back-button"
          onClick={ this.props.handlePrev }
          disabled={ this.props.prevIsDisabled || false }
        />
        <RaisedButton
          label="Next"
          primary={true}
          className="next-button"
          onClick={ this.props.handleNext }
          disabled={ this.props.nextIsDisabled || false }
          type={ this.props.nextType || 'button' }
        />
      </div>
    )
  }
});

export default StepperNavigaiton;
