import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://checkyourrep-api-env.us-west-2.elasticbeanstalk.com/'
  })
})
