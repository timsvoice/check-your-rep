import React from 'react';
import * as firebase from 'firebase';
import _ from 'underscore';
import { database } from '../../data';
import { auth } from '../../auth';
import Chip from 'material-ui/Chip';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress'
import Avatar from 'material-ui/Avatar';
import { RepresentativeList } from '../representatives/index';
import Toggle from 'material-ui/Toggle';

const Keywords = (props) => (
  <div className='keyword-list-container'>
    { props.keywords.map((keyword) =>
      <Chip
        key={keyword}
      >{ keyword }</Chip>
    )}
  </div>
);

const Representatives = (props) => (
  <div className='representative-list-container'>
      <List className='representative-list'>
        { props.representatives.map((representative) =>
          <ListItem
            className='representative-list-item'
            key={ representative.id }
            leftAvatar={<Avatar src={ `https://theunitedstates.io/images/congress/225x275/${representative.id}.jpg` } />}
            primaryText={ `${representative.first_name} ${representative.last_name}` }
            secondaryText={ `${representative.chamber.toUpperCase()} - ${representative.state}` }
          />
        )}
      </List>
  </div>
);

const Preferences = (props) => {
  const toggleEmail = (preference) => {
    switch (preference) {
      case 'daily':
        props.preferences.frequency = 'daily';
        break;
      case 'weekly':
        props.preferences.frequency = 'weekly';
        break;
      case 'monthly':
        props.preferences.frequency = 'monthly';
        break;
      default:
        props.preferences.frequency = 'weekly';
    }
  };
  return (
    <div className='preferences-list-container'>
        <Toggle
          className='preference-daily'
          onToggle={ () => {
            toggleEmail('daily')
          }}
          defaultToggled={ props.preferences.frequency === 'daily' }
        />
        <Toggle
          className='preference-weekly'
          onToggle={ () => {
            toggleEmail('weekly')
          }}
          defaultToggled={ props.preferences.frequency === 'weekly' }
        />
        <Toggle
          className='preference-monthly'
          onToggle={ () => {
            toggleEmail('monthly')
          }}
          defaultToggled={ props.preferences.frequency === 'monthly' }
        />
    </div>
  )
}

const Dashboard = React.createClass({
  componentWillMount() {
    const user = this.props.user;
    if (!user || user === null) throw 'Error! No User';
    database.ref(`/users/${user.uid}`).once('value', function(user) {
      this.setState({
        user: user.val()
      });
    }.bind(this))
  },
  render() {
    return (
      <div className='dashboard-container'>
        { this.state ?
          <div>
          <div className='dashboard-left'>
            <Keywords keywords={this.state.user.keywords}/>
            <Representatives representatives={this.state.user.representatives} />
          </div>
          <div className='dashboard-right'>
            <Preferences preferences={this.state.user.preferences} />
          </div>
        </div>
        : <CircularProgress /> }
      </div>
    )
  }
})

export default Dashboard;
