import { bill, user } from './connectors.js';

const resolvers = {
  RootQuery: {
    bill(_, { billId }) {
      return bill.getOne(billId)
        .then((bill) => (bill))
        .catch((err) => { throw err; });
    },
    bills(_, { congress, chamber, type }) {
      return bill.getRecent(congress, chamber, type)
        .then((bills) => { return bills; })
        .catch((err) => { console.log(err) });
    },
    memberBills(_, { memberId, type }) {
      return bill.getMemberBills(memberId, type)
        .then((bills) => { return bills; })
        .catch((err) => { throw err; });
    },
  },
  Mutation: {
    createUser(_, { userData }) {
      const user = new User({ userData });
      return user.save((err, res) => {
        if (err) console.log(err);
        console.log(res);
        return res;
      });
    },
  },
};

export default resolvers;
