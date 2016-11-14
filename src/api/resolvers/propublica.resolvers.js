import { congress } from '../connectors/propublica.connector.js';

const resolvers = {
  RootQuery: {
    bill(_, { billId }) {
      return congress.getOne(billId)
        .then((bill) => (bill))
        .catch((err) => { throw err; });
    },
    bills(_, { chamber, type }) {
      return congress.getRecent(chamber, type)
        .then((bills) => { return bills; })
        .catch((err) => { throw err; });
    },
    member(_, { chamber, first_name, last_name }) {
      return congress.getMember(chamber, first_name, last_name)
        .then((member) => { return member; })
        .catch((err) => { throw err; })
    },
    members(_, { chamber }) {
      return congress.getMember(chamber)
        .then((members) => { return members; })
        .catch((err) => { throw err; })
    },
    memberBills(_, { memberId, type }) {
      return congress.getMemberBills(memberId, type)
        .then((bills) => { return bills; })
        .catch((err) => { throw err; });
    },
    memberBillsByName(_, { chamber, first_name, last_name, type }) {
      return congress.getMemberBillsByName(chamber, first_name, last_name, type)
        .then((bills) => { return bills; })
        .catch((err) => { throw err; });
    },
  },
};

export default resolvers;
