import { getAllBills } from './connectors.js';

const resolvers = {
  RootQuery: {
    bills() {
      return getAllBills()
        .then((bills) => ( bills ))
        .catch((err) => { throw err });
    },
  },
};

export default resolvers;
