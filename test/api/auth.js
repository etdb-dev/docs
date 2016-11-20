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

  describe('/auth/:user', () => {
    describe('PUT', () => {

      it('should deny access, when no credentials are given', testAccessDenial);

      it('should update a user\'s password', (done) => {
        chai.request(baseUrl)
        .put('/auth/' + testingUser.username)
        .auth('bobby', 'bobby')
        .send({ password: testingUser.password })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          checkMessage(`Password for ${testingUser.username} has been updated`, res.body);
          done();
        });
      });
    });

    describe('DELETE', () => {

      it('should deny access, when no credentials are given', testAccessDenial);

      it('should delete a user', (done) => {
        chai.request(baseUrl)
        .delete('/auth/' + testingUser.username)
        .auth('bobby', 'bobby')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          checkMessage(`${testingUser.username} has been deleted`, res.body);
          done();
        });
      });

      it('should respond with 404, when user is not found', (done) => {
        chai.request(baseUrl)
        .delete('/auth/' + testingUser.username)
        .auth('bobby', 'bobby')
        .end((err, res) => {
          expect(err).to.not.be.null;
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });
};
