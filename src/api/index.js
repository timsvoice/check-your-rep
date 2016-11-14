import { makeExecutableSchema } from 'graphql-tools';
import _ from 'underscore';

import { schema as propublicaSchema } from './schemas/propublica.schema.js';
import { resolvers as propublicaResolver } from './resolvers/propublica.resolvers.js';

console.log(propublicaSchema);

// use to group the resolvers
// const resolvers = _.extend(propublicaResolver, xyzResolver)

module.exports.graphqlSchema = makeExecutableSchema({
  typeDefs: propublicaSchema,
  resolvers: propublicaResolver
})
