import React from 'react';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import store from 'store';
import _ from 'underscore';

import './style.scss';

const RepresentativeList = React.createClass({
  componentWillMount() {
    // this.representatives = this.props.data.membersLocal;
    // if (!this.props.data.loading) console.log(this.props.data);
  },
  addRepresentative(id) {
    let repList;
    if (store.get('representatives')) {
      repList = store.get('representatives');
    } else {
      repList = {};
    }
    if (_.has(repList, id)) {
      delete repList[id];
      store.set('representatives', repList);
    } else {
      let repObj = {};
      repObj[id] = true;
      const newRepList = _.extend(repList, repObj);
      store.set('representatives', newRepList);
    }
  },
  isToggled(id) {
    const reps = store.get('representatives')
    if (reps) {
      return _.has(reps, id)
    }
    return false;
  },
  render() {
    if (!this.props.data.loading) console.log(this);
    return (
      <div>
        { !this.props.data.loading ?
          <List >
            { this.props.data.membersLocal.map((representative) =>
              <ListItem
                key={ representative.id }
                leftAvatar={<Avatar src={ `https://theunitedstates.io/images/congress/225x275/${representative.id}.jpg` } />}
                primaryText={ `${representative.first_name} ${representative.last_name}` }
                secondaryText={ `${representative.chamber.toUpperCase()} - ${representative.state}` }
                rightToggle={ <Toggle onToggle={ () => { this.addRepresentative(representative.id) } } defaultToggled={ this.isToggled(representative.id) }  /> }
              />
            )}
          </List>
        : <CircularProgress /> }
        <RaisedButton
          label="Keywords"
          primary={true}
          className="primary-button"
        />
      </div>
    )
  }
});

const RepresentativeData = gql`
  query RootQuery($zip_code: String!) {
    membersLocal(zip_code: $zip_code) {
      id
      first_name
      last_name
      state
      chamber
    }
  }`;

const RepresentativesData = graphql(RepresentativeData, {
  options: props => ({
    variables: {
      zip_code: store.get('zipcode')
    }
  }),
})(RepresentativeList);

export default RepresentativesData;
