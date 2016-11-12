import { getRecentBills } from './connectors.js';

const resolvers = {
  RootQuery: {
    bills(_, { congress, chamber, type }) {
      return getRecentBills(congress, chamber, type)
        .then((bills) => { return bills; })
        .catch((err) => { console.log(err) });
    },
  },
};

export default resolvers;
