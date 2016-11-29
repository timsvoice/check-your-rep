import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import casual from 'casual';
import _ from 'underscore';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import KeywordsList from '../components/keywords/index.js';
import * as firebase from 'firebase';

describe('<KeywordsList />', function() {
  const muiTheme = getMuiTheme();

  const mountWithContext = (node) => mount(
    node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    }
  );

  const keywords = [
    casual.words(2), casual.words(1)
  ]

  const component = <KeywordsList
        userKeywords={ keywords }
        addKeyword={ (keyword) => { keywords.push(keyword) }}
        removeKeyword={ (keyword) => { keywords.splice(keyword, 1) } }
      />;

    it('calls componentWillMount once', function() {
      const spy = sinon.spy(KeywordsList.prototype, 'componentWillMount');
      sinon.stub(firebase, 'initializeApp');
      const wrapper = mountWithContext(component);
      wrapper.setState({ keywords: keywords });
      expect(spy.calledOnce).to.equal(true);
    }),
    it('adds a keyword to the user list', function() {
      const wrapper = mountWithContext(component);
      wrapper.instance().keywordAdd('keyword');
      expect(keywords).to.have.length(3);
    })
    it('removes a keyword from the user list', function() {
      const wrapper = mountWithContext(component);
      wrapper.instance().keywordDelete('keyword');
      expect(keywords).to.have.length(2);
    })
})
