import { makeExecutableSchema } from 'graphql-tools';
import _ from 'underscore';

import congressSchema from './schemas/congress.schema.js';
import congressResolvers from './resolvers/congress.resolvers.js';

module.exports.graphqlSchema = makeExecutableSchema({
  typeDefs: congressSchema,
  resolvers: congressResolvers
})
