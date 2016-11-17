/* global describe */
'use strict';

let baseUrl = 'http://127.0.0.1:3000';

module.exports = () => {
  const chai = require('chai');
  chai.use(require('chai-http'));
  const expect = chai.expect;

  describe('/auth', () => {
    describe('GET', () => {

      it('denies access when no creds are given', (done) => {
        chai.request(baseUrl).get('/auth').end((err) => {
          expect(err).to.have.status(401);
          done();
        });
      });

      it('responds with a JWT if credentials are valid', (done) => {
        chai.request(baseUrl).get('/auth').auth('bobby', 'bobby').end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
      });

    });
  });
};
