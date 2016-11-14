import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import casual from 'casual';
import moment from 'moment';

import { congress } from '../api/connectors/sunlight.connector.js';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('The Sunlight API', function() {
  it('should return a list of bills that relate to an array of keywords', function () {
    const keyword = 'Immigration';
    return assert.eventually.isArray(
      congress.getBillsByKeyword(keyword),
    );
  }),
  it('should return a list of bills that relate to an array of keywords from today only', function () {
    const keyword = 'Immigration';
    const date = moment().format("YYYY-MM-DD");
    return assert.eventually.isArray(
      congress.getBillsByKeyword(keyword, date),
    );
  })
})
