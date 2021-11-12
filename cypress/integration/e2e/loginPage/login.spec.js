/// <reference types="Cypress" />

import useful from 'useful-library';

describe('Login page FE validations', { tags: '@ui' }, () => {

  before(() => {
    cy
      .task('seed:db', 'empty');
  });

  beforeEach(() => {
    cy
      .visit('/login');
  });

  ['email', 'password'].forEach(entity => {
    it(`Get notified when no ${entity} is filled`, () => {
      cy
        .fixture('credentials')
        .then(user => {
          cy
            .get(`[data-cy=login-${entity}]`)
            .type(user.email);
  
          cy
            .get('[data-cy=login-submit]')
            .click();
          
          cy
            .contains('Email and password are required')
            .should('be.visible');
  
          cy
            .url()
            .should('match', /login$/);
        });
    });
  });

  it('Password too weak', () => {
    cy
      .fixture('credentials')
      .then(user => {
        cy
          .get('[data-cy=login-email]')
          .type(user.email);

        cy
          .get('[data-cy=login-password]')
          .type('1');

        cy
          .get('[data-cy=login-submit]')
          .click();
        
        cy
          .contains('Password is too short')
          .should('be.visible');

        cy
          .url()
          .should('match', /login$/);
      });
  });

  it('User not found', () => {
    cy
      .get('[data-cy=login-email]')
      .type(useful.randomEmail(10, 'gmail.com'));

    cy
      .get('[data-cy=login-password]')
      .type(useful.randomString());

    cy
      .get('[data-cy=login-submit]')
      .click();
    
    cy
      .contains('Cannot find user')
      .should('be.visible');

    cy
      .url()
      .should('match', /login$/);
  });
});

describe('Log in with keyboard only', { tags: '@ui' }, () => {

  before(() => {
    cy
      .task('seed:db', 'empty');

    cy
      .fixture('credentials')
      .then(user => {
        cy
          .createUserApi(user);
      });
  });

  beforeEach(() => {
    cy
      .visit('/login');
  });

  it('Use only tab and Enter', () => {
    cy
      .fixture('credentials')
      .then(user => {
        cy
          .get('[data-cy=login-email]')
          .type(user.email)
        
        cy
          .realPress('Tab')
          .realType(user.password)
          .realPress('Enter');

        cy
          .contains('User is logged in')
          .should('be.visible');
    
        cy
          .url()
          .should('match', /\/$/);
      });
  });
});

describe('Error', { tags: '@ui' }, () => {

  before(() => {
    cy
      .task('seed:db', 'empty');

    cy
      .fixture('credentials')
      .then(user => {
        cy
          .createUserApi(user);
      });
  });

  beforeEach(() => {
    cy
      .visit('/login');
  });

  it('API returns 500 when logging in', () => {
    cy
      .fixture('credentials')
      .then(user => {

        cy
          .intercept('POST', /api\/login/, {
            statusCode: 500,
          });

        cy
          .fillInLoginForm(user);
        
        cy
          .get('[data-cy=login-submit]')
          .click();

        cy
          .contains('There was an error, please try later')
          .should('be.visible');
  
        cy
          .url()
          .should('match', /login$/);
      });
  });
});
