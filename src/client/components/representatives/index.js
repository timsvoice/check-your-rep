import React from 'react';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


import './style.scss';

const RepresentativeList = ({ params, data }) => {
  const representatives = data.membersLocal;
  return (
    <div>
      { !data.loading ?
        <List >
          { representatives.map((representative) =>
            <ListItem
              key={ representative.id }
              leftAvatar={<Avatar src={ `https://theunitedstates.io/images/congress/225x275/${representative.id}.jpg` } />}
              primaryText={ `${representative.first_name} ${representative.last_name}` }
              secondaryText={ `${representative.chamber.toUpperCase()} - ${representative.state}` }
              rightToggle={<Toggle />}
            />
          )}
        </List>
      : <CircularProgress /> }
    </div>
  )
};

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
      zip_code: props.params.zipQuery
    }
  }),
})(RepresentativeList);

export default RepresentativesData;
