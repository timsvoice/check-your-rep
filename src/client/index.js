import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/style.scss';

import { database } from './data';
import * as firebase from 'firebase';
import AppContainer from './containers/app-container';
import StepperContainer from './containers/stepper-container';
import Dashboard from './components/dashboard';
import HomePage from './components/homepage';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const client = new ApolloClient();

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer} >
          <IndexRoute component={HomePage} />
          <Route path="me" component={Dashboard} />
          <Route path="start" component={StepperContainer} />
        </Route>
    </Router>
  </ApolloProvider>),
  document.getElementById('App')
)
