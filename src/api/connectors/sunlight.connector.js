import rp from 'request-promise';
import moment from 'moment';

const sunlightURL = 'https://congress.api.sunlightfoundation.com';

module.exports.congress = {
  /**
  * Get a bill by proving a list of keywords
  * @param {array} keywords An Array of user keywords
  * @param {string} date Optional - A date in the format of YYYY-MM-DD
  **/
  getBillsByKeywords(keywords, date) {
    const list = keywords.join('|');

    date = (typeof date === 'undefined') ? `?introduced_on=${moment().format("YYYY-MM-DD")}` : `?introduced_on=${date}`;

    const url = `${sunlightURL}/bills${date}&keywords__in=${list}&order=introduced_on&fields=keywords`;

    return new Promise((resolve, reject) => {
      rp(url)
        .then((res) => JSON.parse(res))
        .then((bills) => {
          resolve(bills);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
}
