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
    const keywords = ['immigration'];
    return assert.eventually.deepProperty(
      congress.getBillsByKeywords(keywords),
      'results'
    );
  }),
  it('should return a list of bills that relate to an array of keywords from today only', function () {
    const keywords = ['immigration'];
    const date = moment().format("YYYY-MM-DD");
    return assert.eventually.deepProperty(
      congress.getBillsByKeywords(keywords, date),
      'results'
    );
  })
})
