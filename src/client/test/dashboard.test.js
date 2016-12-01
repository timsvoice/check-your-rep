import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import casual from 'casual';
import _ from 'underscore';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Dashboard from '../components/dashboard/index.js';
import * as firebase from 'firebase';

describe('<Dashbaord />', function() {
  const muiTheme = getMuiTheme();

  const mountWithContext = (node) => mount(
    node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    }
  );

  const component = <Dashboard
        userKeywords={ keywords }
        userRepresentatives={ representatives }
        userPreferences={ preferences }
        />;

  const keywords = [
    casual.words(2), casual.words(1)
  ];

  const representatives = [
    {
      id: '1234',
      first_name: casual.first_name,
      last_name: casual.last_name,
      chamber: 'house',
      state: casual.state_abbr,
    },
    {
      id: '5678',
      first_name: casual.first_name,
      last_name: casual.last_name,
      chamber: 'house',
      state: casual.state_abbr,
    }
  ];

  const preferences = {
    frequency: 'weekly'
  };

  const user = { keywords, representatives, preferences };

  it('calls componentWillMount once', function() {
    const spy = sinon.spy(Dashboard.prototype, 'componentWillMount');
    const wrapper = mountWithContext(component);
    wrapper.setState({ user });
    expect(wrapper.state('user')).to.be.instanceOf(Object);
    expect(spy.calledOnce).to.equal(true);
  }),
  it('loads the user representative list', function() {
    const wrapper = mountWithContext(component);
    wrapper.setState({ user });
    const repList = wrapper.find('.representative-list');
    expect(repList.children()).to.have.length(2);
  }),
  it('loads the user keyword list', function() {
    const wrapper = mountWithContext(component);
    wrapper.setState({ user });
    const keywordList = wrapper.find('.keyword-list-container');
    expect(keywordList.children()).to.have.length(2);
  }),
  it('loads the user email preferences', function() {
    const wrapper = mountWithContext(component);
    wrapper.setState({ user });
    const preferencesList = wrapper.find('.preferences-list-container');
    expect(preferencesList.children()).to.have.length(3);

  }),
  it('has the weekly toggle toggled', function() {
    const wrapper = mountWithContext(component);
    wrapper.setState({ user });
    const preference = wrapper.find('.preferences-list-container');
    expect(preference.childAt(1).node.props.defaultToggled).to.equal(true);
  })
})
