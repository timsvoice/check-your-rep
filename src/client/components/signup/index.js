import React from 'react';
import store from 'store';
import _ from 'underscore';

import { List, ListItem } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import './style.scss';

const SignupPage = React.createClass({
  signUp() {

  },
  userRepresentatives() {
    const representatives = store.get('representatives');
    if (
      store.get('representatives') === undefined ||
      Object.keys(store.get('representatives')).length > 0
    ) {
      let representativesArray = _.map(representatives, (keyword, key) => {
        return key;
      })
      return representativesArray;
    }
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
      return keywordArray;
    }
  },
  render() {
    return (
      <div className="signup-container">
        <List >
          { this.userRepresentatives().map((representative) =>
            <ListItem
              key={ representative.id }
              leftAvatar={<Avatar src={ `https://theunitedstates.io/images/congress/225x275/${representative.id}.jpg` } />}
              primaryText={ `${representative.first_name} ${representative.last_name}` }
              secondaryText={ `${representative.chamber.toUpperCase()} - ${representative.state}` }
            />
          )}
        </List>
        { this.userKeywords().map((keyword) =>
          <Chip key={keyword}>
            { keyword }
          </Chip>
        )}
      </div>
    )
  }
})

export default SignupPage;
