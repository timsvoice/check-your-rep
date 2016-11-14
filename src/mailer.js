'use-strict';

import Mailgun from 'mailgun-js';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_CHECKYOURREP_DOMAIN;
const mailgun = Mailgun({apiKey: MAILGUN_API_KEY, domain });

module.exports.mailer = {
  send(message, user) {
    const mail = {
      from: 'postmaster@checkyourrep.org',
      to: user.email,
      subjec: 'Your Bills',
      text: message,
    }
    mailgun.messages().send(mail)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
