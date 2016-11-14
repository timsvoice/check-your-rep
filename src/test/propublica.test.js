import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import casual from 'casual';

import { congress } from '../api/connectors.js';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('Propublica Bills', function () {
  it('should return a bill', function () {
    return assert.eventually.property(congress.getOne('hjres101'), 'bill');
  })
  it('should return an array of recent bills', function() {
    return assert.eventually.isArray(congress.getRecent('senate', 'introduced'))
  })
  it('should return an array of recent bills from a member', function() {
    return assert.eventually.isArray(congress.getMemberBills('A000360', 'introduced'))
  })
  it('should return a list of senate members', function () {
    return assert.eventually.isArray(congress.getMembers('senate'));
  })
  it('should return a specific member', function () {
    return assert.eventually.deepPropertyVal(congress.getMember('senate', 'Lamar', 'Alexander'), 'first_name', 'Lamar');
  })
  it('should get member bills from a first and last name', function () {
    return assert.eventually.isArray(
      congress.getMemberBillsByName('senate', 'Lamar', 'Alexander', 'introduced')
    );
  })
})
