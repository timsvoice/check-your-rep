import React from 'react';
import { browserHistory, Link } from 'react-router';

import CircularProgress from 'material-ui/CircularProgress';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

import { database } from '../../data.js';
import './style.scss';

const KeywordsList = React.createClass({
  componentWillMount() {
    this.state = { keywords: [], user_keywords: [] };
    database.ref('/keywords').once('value', function(keywords) {
      this.setState({
        keywords: keywords.val()
      });
    }.bind(this))
  },
  handleClick(e) {
    e.preventDefault();
    let keyword = this.refs.keywordValue.state.searchText;
    this.setState({
      user_keywords: this.state.user_keywords.concat([keyword])
    })
    this.refs.keywordValue.setState({
      searchText: ''
    })
  },
  handleDelete(keyword) {
    let keywords = this.state.user_keywords;
    keywords.splice(keywords.indexOf(keyword), 1);
    this.setState({
      user_keywords: keywords
    })
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

          { this.state.user_keywords ?
            this.state.user_keywords.map((keyword) =>
              <Chip
                key={keyword}
                onRequestDelete={() => {this.handleDelete(keyword)}}
              >
                { keyword }
              </Chip>
            )
          : <h1>Select Your Keywords</h1> }
            <RaisedButton
              label="Save"
              primary={true}
              className="primary-button"
              disabled={this.state.user_keywords.length === 0}
            />
      </div>
    )
  }
});

export default KeywordsList;
