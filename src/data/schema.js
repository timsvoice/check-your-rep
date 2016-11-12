import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers.js';

const schema = `
  type Bill {
    bill_id: String,
    bill_type: String,
    number: Int,
    congress: Int,
    chamber: String,
    introduced_on: String,
    last_action_at: String,
    last_vote_at: String,
    last_version_on: String
  }
  # the schema allows the following query:
  type RootQuery {
    bills: [Bill]
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
