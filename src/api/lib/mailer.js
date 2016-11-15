'use strict';
import Mailgun from 'mailgun-js';
import {} from 'dotenv/config';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_CHECKYOURREP_DOMAIN;
const mailgun = Mailgun({apiKey: MAILGUN_API_KEY, domain });

module.exports.mailer = (data) => {

    const mail = {
      from: 'postmaster@checkyourrep.org',
      to: data.user.email,
      subjec: 'Your Bills',
      text: data.message,
      'o:testmode': data.testmode || false
    }

    return new Promise((resolve, reject) => {
      mailgun.messages().send(mail)
        .then((res) => { resolve(res) })
        .catch((err) => { reject(err) })
    })
  }
