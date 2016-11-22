import React from 'react';
import { Link } from 'react-router';

import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import StepperNavigaiton from '../buttons/index.js';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import store from 'store';
import _ from 'underscore';

import './style.scss';

const RepresentativeList = React.createClass({
  addRepresentative(id) {
    let repList, newRepList, repObj;

    repList = {};
    if (store.get('representatives')) repList = store.get('representatives');

    switch(_.has(repList, id)) {
      case true:
        delete repList[id];
        newRepList = repList;
        break;
      case false:
        repObj = {};
        repObj[id] = true;
        newRepList = _.extend(repList, repObj);
        break;
    }

    store.set('representatives', newRepList);
    this.forceUpdate();

  },
  isToggled(id) {
    const repList = store.get('representatives');

    if (repList) return _.has(repList, id)

    return false;
  },
  nextIsDisabled() {
    if (
      store.get('representatives') === undefined ||
      Object.keys(store.get('representatives')).length > 0
    ) {
      return false;
    }

    return true;
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
                rightToggle={
                  <Toggle
                    onToggle={ () => { this.addRepresentative(representative.id) }}
                    defaultToggled={ this.isToggled(representative.id) }
                  />
                }
              />
            )}
          </List>
        : <CircularProgress /> }
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
