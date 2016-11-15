"ues-strict";

import schedule from 'node-schedule';
import { mailer } from './mailer.js';

module.exports.scheduler = () => {
  // schedule the function to scan bills everyday at 6PM
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [1,2,3,4,5];
  rule.hour = 18;
  rule.minute = 30;

  return new Promise((resolve, reject) => {
    schedule.scheduleJob(rule, () => {
      const data = {
        user: {
          email: 'timsethvoice@gmail.com'
        },
        message: 'Test email',
        testmode: true
      }
      mailer(data)
        .then((res) => { resolve(res) })
        .catch((err) => { reject(err) })
    })
  })
}