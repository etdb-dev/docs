'use strict';

let baseUrl = 'http://127.0.0.1:3000';

module.exports = () => {
  const chai = require('chai');
  chai.use(require('chai-http'));
  const expect = chai.expect;

  let testingToken;
  let testingUser = {
    username: 'testUser',
    password: 'testPassword'
  };

  let testAccessDenial = (done) => {
    chai.request(baseUrl).get('/auth').end((err) => {
      expect(err).to.have.status(401);
      done();
    });
  };

  let checkMessage = (expectedMessage, resBody) => {
    expect(resBody).to.have.property('message');
    expect(expectedMessage).to.equal(resBody.message);
  };

  describe('/auth', () => {
    describe('GET', () => {

      it('should deny access, when no credentials are given', testAccessDenial);

      it('should respond with a JWT, if credentials are valid', (done) => {
        chai.request(baseUrl)
        .get('/auth')
        .auth('bobby', 'bobby')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          testingToken = res.body.token;
          done();
        });
      });
    });

    describe('POST', () => {

      it('should deny access, when no credentials are given', testAccessDenial);

      it('should add a new user', (done) => {
        chai.request(baseUrl)
        .post('/auth')
        .auth('bobby', 'bobby')
        .send(testingUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          checkMessage(`${testingUser.username} has been createad`, res.body);
          done();
        });
      });

      it('should respond with 409, when user already exists', (done) => {
        chai.request(baseUrl)
        .post('/auth')
        .auth('bobby', 'bobby')
        .send(testingUser)
        .end((err, res) => {
          expect(err).to.not.be.null;
          expect(res).to.have.status(409);
          checkMessage(`user (${testingUser.username}) already exists`, res.body);
          done();
        });
      });
    });
  });
};
