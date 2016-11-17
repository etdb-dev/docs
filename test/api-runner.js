'use strict';

const authTests = require('./api/auth');
const expect = require('chai').expect;

describe('Server', () => {
  it('should be running', done => {
    require('fs').stat('./pid', (err, stats) => {
      expect(err).to.equal(null, 'Please run the server (npm start) before testing the API!\n');
      expect(stats.isFile()).to.be.true;
      done();
    });
  });
});

authTests();
