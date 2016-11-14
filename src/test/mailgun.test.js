import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import casual from 'casual';

import { mailer } from '../mailer.js';

chai.use(chaiAsPromised);
const assert = chai.assert;

// describe('Mailgun Sending', function () {
//   it('should return an object with the Offices property', function (done) {
//     mailer.send('Test Message', { email: 'timsethvoice@gmail.com '}, (res) => {
//       assert.isObject(res, 'Yay!');
//       done();
//     })
//   })
// })
