import React from 'react';
import { browserHistory, Link } from 'react-router';
import store from 'store';
import _ from 'underscore';

import CircularProgress from 'material-ui/CircularProgress';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

import StepperNavigaiton from '../buttons/index.js';
import { database } from '../../data.js';
import './style.scss';

const KeywordsList = React.createClass({
  componentWillMount() {
    this.state = { keywords: [] };
    database.ref('/keywords').once('value', function(keywords) {
      this.setState({
        keywords: keywords.val()
      });
    }.bind(this))
  },
  handleClick(e) {
    e.preventDefault();
    let keyword = this.refs.keywordValue.state.searchText;
    let keywordList, keywordObj, newKeywordList;

    keywordList = {};
    if (store.get('user_keywords')) keywordList = store.get('user_keywords');

    keywordObj = {};
    keywordObj[keyword] = true;
    newKeywordList = _.extend(keywordList, keywordObj);

    store.set('user_keywords', newKeywordList);

    this.refs.keywordValue.setState({
      searchText: ''
    })

    this.forceUpdate();
  },
  handleDelete(keyword) {
    let keywordsList = store.get('user_keywords');
    delete keywordsList[keyword];
    let newKeywordList = keywordsList;
    store.set('user_keywords', newKeywordList);
    this.forceUpdate();
  },
  nextIsDisabled() {
    if (
      store.get('user_keywords') === undefined ||
      Object.keys(store.get('user_keywords')).length > 0
    ) {
      return false;
    }

    return true;
  },
  userKeywords() {
    const user_keywords = store.get('user_keywords');
    if (
      store.get('user_keywords') === undefined ||
      Object.keys(store.get('user_keywords')).length > 0
    ) {
      let keywordArray = _.map(user_keywords, (keyword, key) => {
        return key;
      })
      console.log(keywordArray);
      return keywordArray;
    }
  },
  render() {
    const user_keywords = this.state.user_keywords;
    return (
      <div>
          { this.state.keywords ?
            <div>
              <AutoComplete
                hintText="Find an Issue (e.g. type academic)"
                dataSource={this.state.keywords}
                filter={AutoComplete.caseInsensitiveFilter}
                filter={AutoComplete.fuzzyFilter}
                maxSearchResults={5}
                ref="keywordValue"
              />
            <div>
            </div>
              <RaisedButton
                label="Add"
                primary={true}
                className="primary-button"
                onClick={this.handleClick}
              />
            </div>
          : <CircularProgress /> }

          { this.userKeywords() ?
            this.userKeywords().map((keyword) =>
              <Chip
                key={keyword}
                onRequestDelete={() => {this.handleDelete(keyword)}}
              >
                { keyword }
              </Chip>
            )
          : <h1>Select Your Keywords</h1> }
          <StepperNavigaiton
            handlePrev={ this.props.handlePrev }
            handleNext={ this.props.handleNext }
            nextType="submit"
            nextIsDisabled={ this.nextIsDisabled() }
          />
      </div>
    )
  }
});

export default KeywordsList;
