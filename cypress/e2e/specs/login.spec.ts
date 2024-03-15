describe('Login :', () => {
    it('as a valid user, I can login', () => {
        cy.get('[data-cy="login-menu"').click();
        cy.loginAs('Existinguser@test.com', 'Existinguser123');
        // assertions
        cy.get('[data-cy="notification-message"]').should('have.text', 'User is logged in')
    });

    it('as a invalid user, I can not login', () => {
        cy.get('[data-cy="login-menu"').click();
        cy.loginAs('Notrealuser@test.com', 'Notrealuser123');

        // assertions
        cy.get('[data-cy="notification-message"]').should('have.text', 'Cannot find user');
    });
});

describe('Register :', () => {
    it('as a new user, I can register', () => {
        // visit the login page
        cy.visit('/login');
        cy.get('a').contains('Sign up here').click();

        // create a new user with a random number
        const newUser = `newuser${Math.floor(Math.random() * 1000)}`;
        cy.get('input[name="email"]').type(newUser + '@test.com');
        cy.get('input[name="password"]').type(newUser);
        cy.get('[data-cy="signup-submit"]').click();

        // assertions
        cy.get('[data-cy="notification-message"]').should('have.text', 'User is logged in');
    });

    it('as a new user, I can not register with invalid password', () => {
        cy.visit('/login');
        cy.get('a').contains('Sign up here').click();

        // create a new user with a random number
        const newUser = `newuser${Math.floor(Math.random() * 1000)}`;
        cy.get('input[name="email"]').type(newUser + '@test.com');
        cy.get('input[name="password"]').type('a');
        cy.get('[data-cy="signup-submit"]').click();

        // assertions
        cy.get('[data-cy="notification-message"]').should('have.text', 'Password is too short');
    });
});