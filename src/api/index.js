import { makeExecutableSchema } from 'graphql-tools';
import _ from 'underscore';

import propublicaSchema from './schemas/propublica.schema.js';
import congressResolvers from './resolvers/congress.resolvers.js';

// use to group the resolvers
// const resolvers = _.extend(propublicaResolver, xyzResolver)

console.log('Resolvers', propublicaResolvers)

module.exports.graphqlSchema = makeExecutableSchema({
  typeDefs: propublicaSchema,
  resolvers: congressResolvers
})
