/// <reference types="Cypress" />

import useful from 'useful-library';
const userCredentials = require('../../../fixtures/credentials.json');

describe('Signup API checks', { tags: '@api' }, () => {

  before(() => {
    cy
      .task('seed:db', 'empty');
  });

  [
    {
      body: {
        email       : useful.randomEmail(10, 'gmail.com'),
        password    : userCredentials.password,
        welcomeEmail: true,
      },
      status : 201,
      message: 'Successful signup, get access token',
      props  : ['accessToken'],
    },
    {
      body: {
        email       : useful.randomEmail(10, 'gmail.com'),
        password    : userCredentials.password,
        welcomeEmail: false,
      },
      status : 201,
      message: 'Successful signup with no welcome email, get access token',
      props  : ['accessToken'],
    },
    {
      body: {
        email       : useful.randomEmail(10, 'gmail.com'),
        password    : userCredentials.password,
      },
      status : 201,
      message: 'Successful signup with no welcome email property, get access token',
      props  : ['accessToken'],
    },
    {
      body: {
        email       : userCredentials.email,
        password    : '1',
        welcomeEmail: false,
      },
      status : 400,
      message: 'Password is too short',
    },
    {
      body: {
        email       : useful.randomString(),
        password    : userCredentials.password,
        welcomeEmail: false,
      },
      status : 400,
      message: 'Email format is invalid',
    },
    {
      body: {
        email       : '',
        password    : userCredentials.password,
        welcomeEmail: false,
      },
      status : 400,
      message: 'Email and password are required',
    },
    {
      body: {
        email       : useful.randomEmail(10, 'gmail.com'),
        password    : '',
        welcomeEmail: false,
      },      
      status : 400,
      message: 'Email and password are required',
    },
  ].forEach(testData => {
    it(`${testData.message}`, () => {
    
      cy
        .signUpUserApi(testData.body)
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
