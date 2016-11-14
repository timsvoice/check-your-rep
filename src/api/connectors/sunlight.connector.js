import rp from 'request-promise';
import moment from 'moment';
import _ from 'underscore';

const sunlightURL = 'https://congress.api.sunlightfoundation.com';

module.exports.congress = {
  /**
  * Get a bill by proving a list of keywords
  * @param {array} keywords An Array of user keywords
  * @param {string} date Optional - A date in the format of YYYY-MM-DD
  **/
  getBillsByKeyword(keyword, date) {
    date = (typeof date === 'undefined') ? `?introduced_on=${moment().format("YYYY-MM-DD")}` : `?introduced_on=${date}`;

    const fields = 'number,urls,short_title,sponsor_id,introduced_on,cosponsor_ids,committees,actions,keywords,summary_short';
    const url = `${sunlightURL}/bills?keywords=${keyword}&order=introduced_on&fields=${fields}`;

    return new Promise((resolve, reject) => {
      rp(url)
        .then((res) => JSON.parse(res))
        .then((bills) => {
          const normBills = bills.results.map((bill, idx, bills) => {
            const normBill = {
              number: bill.number,
              bill_uri: bill.urls.congress,
              title: bill.short_title,
              summary: bill.summary_short,
              sponsor: bill.sponsor_id,
              cosponsors: bill.cosponsors_count,
              introduced_date: bill.introduced_on,
              actions: bill.actions,
              subjects: bill.keywords,
            };
            return normBill;
          })

          resolve(normBills);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
}
