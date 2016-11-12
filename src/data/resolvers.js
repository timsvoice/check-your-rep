import { getRecentBills, getMemberBills } from './connectors.js';

const resolvers = {
  RootQuery: {
    bills(_, { congress, chamber, type }) {
      return getRecentBills(congress, chamber, type)
        .then((bills) => { return bills; })
        .catch((err) => { console.log(err) });
    },
    memberBills(_, { memberId, type }) {
      return getMemberBills(memberId, type)
        .then((bills) => { return bills; })
        .catch((err) => { throw err; });
    },
  },
};

export default resolvers;
