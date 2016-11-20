import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

import { database } from '../../data.js';
import './style.scss';

const KeywordsList = React.createClass({
  componentWillMount() {
    this.state = { keywords: []};
    database.ref('/keywords').once('value', function(keywords) {
      this.setState({
        keywords: keywords.val()
      });
    }.bind(this))
  },
  render() {
    return (
      <div>
          <AutoComplete
            hintText="Find an Issue (e.g. type academic)"
            dataSource={this.state.keywords}
            filter={AutoComplete.caseInsensitiveFilter}
            filter={AutoComplete.fuzzyFilter}
            maxSearchResults={3}
          />
          <RaisedButton
            label="Add"
            primary={true}
            className="primary-button"
          />
      </div>
    )
  }
});

export default KeywordsList;
