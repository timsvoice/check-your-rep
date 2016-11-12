const PROPUBLICA_API_KEY = process.env.PROPUBLICA_API_KEY;
console.log(PROPUBLICA_API_KEY);
/**
 * Get a list of Bills
 **/

module.exports.getAllBills = () => {
  return new Promise((resolve, reject) => {
    const bills = [{
      "bill_id": "hr3590-111",
      "bill_type": "hr",
      "number": 3590,
      "congress": 111,
      "chamber": "house",
      "introduced_on": "2009-09-17",
      "last_action_at": "2010-03-23",
      "last_vote_at": "2010-03-22T03:48:00Z",
      "last_version_on": "2012-08-25"
    }]
    resolve(bills);
  });
};
