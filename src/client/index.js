import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://checkyourrep-api-env.us-west-2.elasticbeanstalk.com/graphql'
  })
})

const Bills = ({ params, data, state }) => {
  return (
    <div>
      { !data.loading ? <h1>Data { data.bills[0].title }</h1> : <div>Loading!</div> }
    </div>
  );
};

const BillsData =  gql`
  {
    bills(chamber:"house", type:"introduced") {
      title
      summary
    }
  }`;

const BillsWithData = graphql(BillsData)(Bills);

const App = ({ children, params, location }) => (
  <div className="container">
    <BillsWithData />
  </div>
);

ReactDOM.render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>),
  document.getElementById('App')
)
