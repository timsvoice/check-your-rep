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
import _ from 'underscore';

import './style.scss';

export const RepresentativeList = React.createClass({
  isToggled(representative) {
    switch( _.indexOf(_.pluck(this.props.userRepresentatives, 'id'), representative.id)) {
      case -1:
        return false;
        break;
      default:
        return true;
        break;
    }
  },
  nextIsDisabled() {
    if ( this.props.userRepresentatives.length < 1 ) return true
    return false;
  },
  toggleRepresentative(representative) {
    switch( _.indexOf(_.pluck(this.props.userRepresentatives, 'id'), representative.id)) {
      case -1:
        this.props.addRepresentative(representative, 'userRepresentatives');
        break;
      default:
        this.props.removeRepresentative(representative, 'userRepresentatives');
        break;
    }
    this.forceUpdate();
  },
  render() {
    return (
      <div>
        { !this.props.data.loading ?
          <List className='representative-list'>
            { this.props.data.membersLocal.map((representative) =>
              <ListItem
                className='representative-list-item'
                key={ representative.id }
                leftAvatar={<Avatar src={ `https://theunitedstates.io/images/congress/225x275/${representative.id}.jpg` } />}
                primaryText={ `${representative.first_name} ${representative.last_name}` }
                secondaryText={ `${representative.chamber.toUpperCase()} - ${representative.state}` }
                rightToggle={
                  <Toggle
                    onToggle={ () => {
                      this.toggleRepresentative(representative)
                    }}
                    defaultToggled={ this.isToggled(representative) }
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
  options: ( ownProps ) => ({ variables: { zip_code: ownProps.zipcode } }),
})(RepresentativeList);

export default RepresentativesData;
