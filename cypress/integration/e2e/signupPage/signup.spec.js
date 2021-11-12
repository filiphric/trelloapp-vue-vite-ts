/// <reference types="Cypress" />

describe('Signup page FE validations', { tags: '@ui' }, () => {

  before(() => {
    cy
      .task('seed:db', 'empty');
  });

  beforeEach(() => {
    cy
      .visit('/signup');
  });

  ['email', 'password'].forEach(entity => {
    it(`Get notified when no ${entity} is filled`, () => {
      cy
        .fixture('credentials')
        .then(user => {
          cy
            .get(`[data-cy=signup-${entity}]`)
            .type(user.email);
  
          cy
            .get('[data-cy=signup-submit]')
            .click();
          
          cy
            .contains('Email and password are required')
            .should('be.visible');
  
          cy
            .url()
            .should('match', /signup$/);
        });
    });
  });

  it('Password too weak', () => {
    cy
      .fixture('credentials')
      .then(user => {
        cy
          .get('[data-cy=signup-email]')
          .type(user.email);

        cy
          .get('[data-cy=signup-password]')
          .type('1');

        cy
          .get('[data-cy=signup-submit]')
          .click();
        
        cy
          .contains('Password is too short')
          .should('be.visible');

        cy
          .url()
          .should('match', /signup$/);
      });
  });

  it('User already exists', () => {
    cy
      .fixture('credentials')
      .then(user => {
        cy
          .createUserApi(user);
      });

    cy
      .fixture('credentials')
      .then(user => {
        cy
          .fillInSignupForm(user);

        cy
          .get('[data-cy=signup-submit]')
          .click();
        
        cy
          .contains('Email already exists')
          .should('be.visible');

        cy
          .url()
          .should('match', /signup$/);
      });
  });

  it('API returns 500', () => {

    cy
      .fixture('credentials')
      .then(user => {
        cy
          .fillInSignupForm(user);

        cy
          .intercept('POST', /api\/signup$/, {
            statusCode: 500,
          });

        cy
          .get('[data-cy=signup-submit]')
          .click();
        
        cy
          .contains('There was an error, please try later')
          .should('be.visible');

        cy
          .url()
          .should('match', /signup$/);
      });
  });
});
