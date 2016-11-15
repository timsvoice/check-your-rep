import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { mailer } from '../api/lib/mailer.js';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('Mailer', function() {
  it('should send an email to Mailgun', function() {
    const data = {
      user: { email: 'timsethvoice@gmail.com' },
      message: 'This is an email test',
      testmode: true,
    };
    return assert.eventually.deepPropertyVal(mailer(data), 'message', 'Queued. Thank you.');
  })
})
