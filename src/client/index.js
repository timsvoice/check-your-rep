import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/style.scss';

import AppContainer from './containers/app-container/index.js';
import ZipInput from './components/zipcode/index.js';
import RepresentativesData from './components/representatives/index.js';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://checkyourrep-api-env.us-west-2.elasticbeanstalk.com/graphql'
  })
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer} >
          <IndexRoute component={ZipInput} />
          <Route path="/zipcode=:zipQuery" component={RepresentativesData}/>
        </Route>
    </Router>
  </ApolloProvider>),
  document.getElementById('App')
)
