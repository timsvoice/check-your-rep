"use strict";

import { congress } from './connectors.js';
import _ from 'underscore';


module.exports.parser = {
  /**
  * Function to parse recent bills for relevant subjects
  * @param {interests} Array an array of user chosen topics
  * @param {bills} Array an array of recent bills to parse
  **/
  interests(interests, bills) {
    console.log(interests, bills);
    return new Promise((resolve, reject) => {
      const userBills = [];
      bills.forEach((bill) => {
        const interests = _.intersection(bill.subjects, interests);
        if (interests.length > 0) userBills.push(bill);
      });
      console.log(userBills)
      resolve(userBills);
    });
  },
};
