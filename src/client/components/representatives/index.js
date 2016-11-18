import React from 'react';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


import './style.scss';

const RepresentativeList = ({ params, data }) => {
  const representatives = data.members;
  return (
    <div>
      { !data.loading ?
        <List >
          { representatives.map((representative) =>
            <ListItem
              key={ representative.id }
              leftAvatar={<Avatar src='http://www.material-ui.com/images/ok-128.jpg' />}
              primaryText={ `${representative.first_name} ${representative.last_name}` }
              secondaryText={ representative.state }
              rightToggle={<Toggle />}
            />
          )}
        </List>
      : <CircularProgress /> }
    </div>
  )
};

const RepresentativeData = gql`
  {
    members(chamber:"house") {
      first_name
      last_name
      state
    }
  }`;

const RepresentativeListWithData = graphql(RepresentativeData)(RepresentativeList);

export default RepresentativeListWithData;
