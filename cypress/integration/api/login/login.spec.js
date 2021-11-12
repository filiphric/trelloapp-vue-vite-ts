/// <reference types="Cypress" />

import useful from 'useful-library';
const userCredentials = require('../../../fixtures/credentials.json');

describe('Login API checks', { tags: '@api' }, () => {

  before(() => {
    cy
      .task('seed:db', 'empty');

    cy
      .createUserApi(userCredentials);
  });

  [
    {
      email   : userCredentials.email,
      password: '',
      status  : 400,
      message : 'Email and password are required'
    },
    {
      email   : '',
      password: userCredentials.password,
      status  : 400,
      message : 'Email and password are required'
    },
    {
      email   : useful.randomString(),
      password: '12345',
      status  : 400,
      message : 'Email format is invalid'
    },
    {
      email   : useful.randomEmail(10, 'gmail.com'),
      password: '12345a',
      status  : 400,
      message : 'Cannot find user'
    },
    {
      email   : userCredentials.email,
      password: '1',
      status  : 400,
      message : 'Password is too short'
    },
    {
      email   : userCredentials.email,
      password: userCredentials.password,
      status  : 200,
      message : 'Successful login, get accessToken',
      props   : ['accessToken']
    },
  ].forEach(testData => {
    it(`${testData.message}`, () => {
    
      cy
        .logInApi({
          email   : testData.email,
          password: testData.password,
        })
        .then(response => {
          expect(response.status).to.eq(testData.status);
          if (!testData.props) expect(response.body).to.eq(testData.message);
          else {
            testData.props.forEach(prop => {
              expect(response.body).to.haveOwnProperty(prop);
            });
          }
        });
    });
  });
});
