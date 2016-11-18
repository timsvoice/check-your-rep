import rp from 'request-promise';
import moment from 'moment';
import _ from 'underscore';

const sunlightURL = 'https://congress.api.sunlightfoundation.com';

module.exports.congress = {
  /**
  * Get a list of local members by zipcode
  * @param {string} zip_code A user's zipcode
  **/
  getLocalMembers(zip_code) {
    const url = `${sunlightURL}/legislators/locate?zip=${zip_code}`;
    return new Promise((resolve, reject) => {
      rp(url)
        .then((res) => JSON.parse(res))
        .then((members) => {
          resolve(members.results.map((member) => {
            const normMember = {
              id: member.bioguide_id,
              thomas_id: member.thomas_id,
              first_name: member.first_name,
              middle_name: member.middle_name,
              last_name: member.last_name,
              party: member.party,
              twitter_account: member.twitter_id,
              facebook_id: member.facebook_id,
              domain: member.website,
              state: member.state,
              email: member.oc_email,
              phone: member.phone,
              chamber: member.chamber,
            };
            return normMember;
          }))
        }).
        catch((err) => { reject(err)})
    })
  },
  /**
  * Get a bill by proving a list of keywords
  * @param {array} keywords An Array of user keywords
  * @param {string} date Optional - A date in the format of YYYY-MM-DD
  **/
  getBillsByKeywords(keywords, date) {
    date = (typeof date === 'undefined') ? `?introduced_on=${moment().format("YYYY-MM-DD")}` : `?introduced_on=${date}`;

    const list = keywords.join('|');
    const fields = 'number,urls,short_title,sponsor_id,introduced_on,cosponsor_ids,committees,actions,keywords,summary_short,summary';
    const url = `${sunlightURL}/bills?keywords__in=${list}&order=introduced_on&fields=${fields}`;

    return new Promise((resolve, reject) => {
      rp(url)
        .then((res) => JSON.parse(res))
        .then((bills) => {
          const normBills = bills.results.map((bill, idx, bills) => {
            const normBill = {
              number: bill.number,
              bill_uri: bill.urls.congress,
              title: bill.short_title,
              summary: bill.summary_short ? bill.summary_short : bill.summary ,
              sponsor: bill.sponsor_id,
              cosponsors: bill.cosponsors_count,
              introduced_date: bill.introduced_on,
              actions: bill.actions,
              subjects: bill.keywords.map((keyword) => { return { name: keyword } }),
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
