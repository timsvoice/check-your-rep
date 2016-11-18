import { congress } from '../connectors/propublica.connector.js';
import { congress as sunlightCongress } from '../connectors/sunlight.connector.js';

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
    billsByKeywords(_, { keywords, date }) {
      return sunlightCongress.getBillsByKeywords(keywords, date)
        .then((bills) => { return bills; })
        .catch((err) => { throw err; })
    },
    member(_, { chamber, first_name, last_name }) {
      return congress.getMember(chamber, first_name, last_name)
        .then((member) => { return member; })
        .catch((err) => { throw err; })
    },
    members(_, { chamber }) {
      return congress.getMembers(chamber)
        .then((members) => { return members; })
        .catch((err) => { throw err; })
    },
    membersLocal(_, { zip_code }) {
      return sunlightCongress.getLocalMembers(zip_code)
        then((members) => { return members })
        .catch((err) => { throw err; })
    },
    memberBills(_, { memberId, type }) {
      return congress.getMemberBills(memberId, type)
        .then((bills) => { return bills; })
        .catch((err) => { throw err; });
    },
    memberBillsByName(_, { chamber, first_name, last_name, type }) {
      return congress.getMember(chamber, first_name, last_name)
        .then((member) => { return congress.getMemberBills(member.id, type); })
        .then((bills) => { return bills; })
        .catch((err) => { throw err;})
    },
  },
};

export default resolvers;
