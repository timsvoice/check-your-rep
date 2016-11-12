import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers.js';

const schema = `
  type Bill {
    number: String,
    bill_uri: String,
    title: String,
    sponsor_uri: String,
    introduced_date: String,
    cosponsors: Int,
    committees: String,
    latest_major_action_date: String,
    latest_major_action: String
  }
  # the schema allows the following query:
  type RootQuery {
    bills(congress: Int, chamber: String, type: String): [Bill]
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: RootQuery
  }
`
const graphqlSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})

export default graphqlSchema;
