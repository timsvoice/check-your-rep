import rp from 'request-promise';
import mongoose from 'mongoose';
import User from './connectors.js';

const PROPUBLICA_API_KEY = process.env.PROPUBLICA_API_KEY;
const propublicaURL = 'https://api.propublica.org/congress/v1/';

// MongoDB

module.exports.user = {
  create(userData) {
    const newUser = new User(userData);
    newUser.save()
      .then((res) => { console.log(res); return res._id; })
      .catch((err) => { throw err; })
  },
  update(id, mutation) {
    User.update({ _id: id }, { $set: mutation } )
      .then((res) => { console.log(res) })
  },
  delet(id) {
    User.remove({ _id: id })
      .then((res) => { console.log(res) })
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
