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
    const keyword = this.refs.keywordValue.state.searchText;
    this.keywordAdd(keyword);
    this.refs.keywordValue.setState({ searchText: '' });
    this.forceUpdate();
  },
  keywordAdd(keyword) {
    if (keyword.length > 1) this.props.userKeywords.push(keyword);
    this.forceUpdate();
  },
  keywordDelete(keyword) {
    this.props.userKeywords.splice(keyword, 1);
    this.forceUpdate();
  },
  nextIsDisabled() {
    if (this.props.userKeywords.length < 1) return true;
    return false
  },
  render() {
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

          { this.props.userKeywords.length > 0 ?
            this.props.userKeywords.map((keyword) =>
              <Chip
                key={keyword}
                onRequestDelete={() => {this.keywordDelete(keyword)}}
              >{ keyword }</Chip>
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
