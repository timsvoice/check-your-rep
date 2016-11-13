import rp from 'request-promise';
import User from './connectors.js';
import * as firebase from "firebase";

const PROPUBLICA_API_KEY = process.env.PROPUBLICA_API_KEY;
const propublicaURL = 'https://api.propublica.org/congress/v1/';

module.exports.user = {  
  update(id, mutation) {
    firebase.database().ref(`users/${id}`).set( mutation )
      .then((user) => { console.log(user) })
      .catch((err) => { console.log(err) });
  },
  delete(id) {
    firebase.database().ref(`users/${id}`).remove()
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) });
  },
};

// Propublica

/**
 * Get a Bill's subjects
 * @param {string} billId Bill slug
 **/

const billSubjects = (billId) => {
  const options = {
      method: 'GET',
      uri: `${propublicaURL}114/bills/${billId}/subjects.json`,
      headers: {
          'X-Api-Key': PROPUBLICA_API_KEY
      }
  };
  return new Promise((resolve, reject) => {
    rp(options)
      .then((res) => JSON.parse(res))
      .then((res) => {
        const subjects = res.results[0].subjects;
        // console.log(res.results[0].subjects);
        resolve(subjects)
      })
      .catch((err) => reject(err))
  });
}

module.exports.bill = {
  /**
   * Get a single Bill
   * @param {string} billId The id of the bill to search
   **/
  getOne(id) {
    const options = {
        method: 'GET',
        uri: `${propublicaURL}114/bills/${id}.json`,
        headers: {
            'X-Api-Key': PROPUBLICA_API_KEY
        }
    };
    return new Promise((resolve, reject) => {
      rp(options)
        .then((res) => JSON.parse(res))
        .then((res) => {
          const bill = res.results[0];
          bill.subjects = billSubjects(id)
            .then((subjects) => (subjects))
            .catch((err) => { throw err });
          resolve(bill)
        })
        .catch((err) => reject(err))
    });
  },

  /**
   * Get a list of recent Bills
   * @param {number} congress The congress (eg 114) that you are requesting bills for
   * @param {string} chamber The chamber (eg senate) that you are requesting bills for
   * @param {string} type The type of bill (introduced, major, updated, passed)
   **/

  getRecent(congress, chamber, type) {
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
          const bills = res.results[0].bills;
          // const billsWithSubjects = [];
          bills.forEach((bill) => {
            const billId = bill.number.split('.').join('').toLowerCase();
            bill.subjects = billSubjects(billId)
              .then((subjects) => { return subjects; })
              .catch((err) => { throw err });
          })
          resolve(bills)
        })
        .catch((err) => reject(err))
    });
  },

  /**
   * Get a list of Bills by Member
   * @param {string} memberId The id of the member to search
   * @param {string} type The type of bill (introduced, updated)
   **/

  getMemberBills(memberId, type) {
    const options = {
        method: 'GET',
        uri: `${propublicaURL}members/${memberId}/bills/${type}.json`,
        headers: {
            'X-Api-Key': PROPUBLICA_API_KEY
        }
    };
    return new Promise((resolve, reject) => {
      rp(options)
        .then((res) => JSON.parse(res))
        .then((res) => {
          const bills = res.results[0].bills;
          bills.forEach((bill) => {
            const billId = bill.number.split('.').join('').toLowerCase();
            bill.subjects = billSubjects(billId)
              .then((subjects) => { return subjects })
              .catch((err) => { throw err });
          })
          resolve(bills)
        })
        .catch((err) => reject(err))
    });
  },
};
