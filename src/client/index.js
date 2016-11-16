import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient();

// const client = new ApolloClient({
//   networkInterface: createNetworkInterface({
//     uri: 'http://checkyourrep-api-env.us-west-2.elasticbeanstalk.com/'
//   })
// })

const Bills = ({ params, data, state }) => {
  console.log(data);
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
