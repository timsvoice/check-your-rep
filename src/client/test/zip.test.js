import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import ZipInput from '../components/zipcode/index.js';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import StepperNavigaiton from '../components/buttons/index.js';

describe('ZipInput', function() {
  beforeEach(function() {
    component = shallow(<ZipInput/>);
  }),
  it('imports a zipcode component with a container div', function() {
    expect(component.find('div.zip-input-container')).to.have.length(1);
  }),
  it('has a form field', function() {
    expect(component.children().find('form')).to.have.length(1);
  })
})
