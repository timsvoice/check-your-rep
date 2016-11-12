import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers.js';

const schema = `
  type Subject {
    name: String,
    url_name: String
  }

  type Action {
    datetime: String,
    description: String
  }

  type Bill {
    number: String,
    bill_uri: String,
    title: String,
    sponsor_uri: String,
    introduced_date: String,
    cosponsors: Int,
    committees: String,
    latest_major_action_date: String,
    latest_major_action: String,
    actions: [Action]
    subjects: [Subject]
  }

  type MemberBill {
    congress: String,
    number: String
    bill: String,
    url_number: String,
    title: String,
    sponsor: String,
    sponsor_id: String,
    introduced_date: String,
    number_of_cosponsors: String,
    committees: String,
    latest_major_action_date: String,
    latest_major_action: String,
    house_passage_vote: String,
    senate_passage_vote: String,
    subjects: [Subject]
  }

  # the schema allows the following query:
  type RootQuery {
    bill(billId: String): Bill,
    bills(congress: Int, chamber: String, type: String): [ Bill ],
    memberBills(memberId: String, type: String): [ Bill ]
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
