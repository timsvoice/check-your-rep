"ues-strict";

import schedule from 'node-schedule';
import { mailer } from './mailer.js';
import { data } from '../api/connectors/firebase.connector.js';

module.exports.dispatch = {
  /**
  * @param {array} users Array of users to send mail to
  * @return {array} Array of email addresses
  **/
  recipients(users) {
    return new Promise((resolve, reject) => {
      if (users === undefined || null) reject("Users must be an array");
      const emails = users.map((user) => {
        return user.email
      })
      resolve(emails);
    })
  },
  /**
  * @param {array} recipients Array of reciepient emails
  * @return {string} A success message
  **/
  sendMail(recipients) {
    return new Promise((resolve, reject) => {
      recipients.forEach((reciepient) => {
        const data = {
          user: {
            email: reciepient
          },
          message: 'Test email',
          testmode: true,
        }
        mailer(data)
          .catch((err) => { reject(err) })
      })
      resolve('Emails sent!');
    })
  },
  schedule() {
    // schedule the function to scan bills everyday at 6PM
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [1,2,3,4,5];
    rule.hour = 11;
    rule.minute = 15;

    return new Promise((resolve, reject) => {
      schedule.scheduleJob(rule, () => {
        data.getUsers()
          .then((users) => ( this.recipients(users) ))
          .then((recipients) => ( this.sendMail(recipients) ))
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err);
          })
      })
    })
  },
}
