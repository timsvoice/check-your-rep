import {} from 'dotenv/config';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { dispatch } from '../lib/dispatch.js';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('Dispatch functions', function() {
  it('should return an array of user emails', function() {
    const users = [
      {
        id: '1234',
        name: 'timothy voice',
        email: 'timsethvoice@gmail.com',
      }
    ]
    return assert.eventually.deepEqual(
      dispatch.recipients(users),
      ['timsethvoice@gmail.com'],
      users[0].email
    )
  }),
  it('should send emails to an array of users', function() {
    const users = [
      'timsethvoice@gmail.com',
      'timothy@timothyvoice.com',
    ]
    return assert.eventually.equal(
      dispatch.sendMail(users),
      'Emails sent!'
    );

  })
})
