import { getBill, getRecentBills, getMemberBills } from './connectors.js';

const resolvers = {
  RootQuery: {
    bill(_, { billId }) {
      return getBill(billId)
        .then((bill) => (bill))
        .catch((err) => { throw err; });
    },
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
