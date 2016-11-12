"use strict";

import { getRecentBills, getMemberBills } from './connectors.js';

/**
* Function to parse recent bills for relevant subjects
* @param {userInterests} Array an array of user chosen topics
* @param {recentBills} Array an array of recent bills to parse
**/

module.exports.parseInterests = (userInterests, recentBills) => {
  const userBills = [];
  userInterests.forEach((interest) => {
    let idx = recentBills.indexOf(interest);
    while (idx != -1) userBills.push(recentBills[idx]);
  })
  return userBills;
}

/**
* Function to parse recent bills for representative
* @param {userInterests} Array an array of user chosen topics
* @param {userReps} Array an array of user representatives
**/

module.exports.parseReps = (userInterests, userReps) => {
  const userBills = [];
  userReps.forEach((rep) => {
    const repBills = getMemberBills(rep.id)
      .then((bills) => (bills))
      .catch((err) => { throw err; });
    userInterests.forEach((interest) => {
      let idx = repBills.indexOf(interest);
      while (idx != -1) userBills.push(recentBills[idx]);
    })
  })
  return userBills;
}
