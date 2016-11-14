import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import casual from 'casual';

import { parser } from '../api/parser.connector.js';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('Interests Parser', function() {
  it('should return an array of interests', function () {
    const interests = ['agriculture'];
    const bills = [
      { subjects: ['meat', 'immigration', 'agriculture'] },
      { subjects: ['meat', 'immigration'] }
    ];
    return assert.eventually.lengthOf(parser.interests(interests, bills), 1);
  })
  it('should not return an array of interests', function () {
    const interests = ['agriculture'];
    const bills = [
      { subjects: ['meat', 'immigration'] },
      { subjects: ['meat', 'immigration'] }
    ];
    return assert.eventually.lengthOf(parser.interests(interests, bills), 0);
  })
})
