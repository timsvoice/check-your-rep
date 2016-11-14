"use strict";

import { congress } from './connectors.js';
import _ from 'underscore';


module.exports.parser = {
  /**
  * Function to parse recent bills for relevant subjects
  * @param {interestsArray} Array an array of user chosen topics
  * @param {bills} Array an array of recent bills to parse
  **/
  interests(interestsArray, bills) {
    return new Promise((resolve, reject) => {
      const userBills = [];
      bills.forEach((bill) => {
        const interests = _.intersection(bill.subjects, interestsArray);
        if (interests.length > 0) userBills.push(bill);
      });
      resolve(userBills);
    });
  },
};
