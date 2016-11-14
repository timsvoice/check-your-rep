import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import resolvers from './resolvers.js';

// GraphQL
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

  type User {
    _id: String,
    zip_code: Int,
    email_address: String,
    first_name: String,
    last_name: String,
  }

  # the schema allows the following query:
  type RootQuery {
    bill(billId: String): Bill,
    bills(congress: Int, chamber: String, type: String): [ Bill ],
    memberBills(memberId: String, type: String): [ Bill ]
  }

  type Mutation {
    createUser(zip_code: Int, email_address: String, first_name: String, last_name: String): User
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: RootQuery,
    mutation: Mutation
  }
`
module.exports.graphqlSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})
