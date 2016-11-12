import rp from 'request-promise';

const PROPUBLICA_API_KEY = process.env.PROPUBLICA_API_KEY;
const propublicaURL = 'https://api.propublica.org/congress/v1/';

/**
 * Get a list of Bills
 * @param {number} congress The congress (eg 114) that you are requesting bills for
 * @param {string} chamber The chamber (eg senate) that you are requesting bills for
 * @param {string} type The type of bill (introduced, major, updated, passed)
 **/

module.exports.getRecentBills = (congress, chamber, type) => {
  const options = {
      method: 'GET',
      uri: `${propublicaURL}114/${chamber}/bills/${type}.json`,
      headers: {
          'X-Api-Key': PROPUBLICA_API_KEY
      }
  };
  return new Promise((resolve, reject) => {
    rp(options)
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res);
        const bills = res.results[0].bills;
        resolve(bills)
      })
      .catch((err) => reject(err))
  });
};
