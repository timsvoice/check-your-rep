import {} from 'dotenv/config';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { data } from '../api/connectors/firebase.connector.js';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('Firebase Admin API', function() {
  it('should return a user object', function() {
    return assert.eventually.deepPropertyVal(
      data.getUserById('b5XqjCDoc6QwhsDOMJecRMMZbxV2'),
      'email',
      'timsethvoice@gmail.com'
    );
  })
  it('should get a list of all users', function() {
    return assert.eventually.deepProperty(
      data.getUsers(),
      'id'
    )
  })
})
