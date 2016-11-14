import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import casual from 'casual';

import { reps } from '../api/connectors.js';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('Google API Data Cleaning', function () {
  it('should return an object with the Offices property', function () {
    return assert.eventually.property(reps.get('01267'), 'offices');
  })
  it('should have data with the officers info in the office', function () {
    return assert.eventually.deepProperty(reps.get('11218'), 'offices[0].officials');
  })
  it('should have the first office equal the president', function () {
    return assert.eventually.deepPropertyVal(reps.get('01267'), 'offices[0].officials[0].name', 'Barack Obama');
  })
})
