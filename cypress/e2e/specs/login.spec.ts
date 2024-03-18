describe('Login :', () => {
    it('as a valid user, I can login', () => {
        // create a new user
        cy.fixture('users').then((fixture) => { cy.request('POST', '/api/signup', fixture[0])});
        //Given I am on the login page
        cy.get('[data-cy="login-menu"').click();
        //When I login with a valid email and password
        cy.loginAs('Existinguser@test.com', 'Existinguser123');
        //Then I be logged in yar
        cy.notificationEquals('User is logged in');
    });

    it('as a invalid user, I can not login', () => {
        //Given I am on the login page
        cy.get('[data-cy="login-menu"').click();
        //When I login with an invalid email and password
        cy.loginAs('Notrealuser@test.com', 'Notrealuser123');
        //Then I should the "Cannot find user" error message
        cy.notificationEquals('Cannot find user');
    });
});

describe('Register :', () => {
    it('as a new user, I can register', () => {
        //Given I am on the login page
        cy.visit('/login');
        //And I click on the "Sign up here" link
        cy.get('a').contains('Sign up here').click();
        //When I register with a new email and password
        const newUser = `newuser${Math.floor(Math.random() * 1000)}`;
        cy.get('input[name="email"]').type(newUser + '@test.com');
        cy.get('input[name="password"]').type(newUser);
        cy.get('[data-cy="signup-submit"]').click();
        //Then I should see the "User is logged in" message
       cy.notificationEquals('User is logged in');
        //And my user is created
    });

    it('as a new user, I can not register with invalid password', () => {
        //Given I am on the login page
        cy.visit('/login');
        //And I click on the "Sign up here" link
        cy.get('a').contains('Sign up here').click();
        //When I register with a invalid password
        // create a new user with a random number
        const newUser = `newuser${Math.floor(Math.random() * 1000)}`;
        cy.get('input[name="email"]').type(newUser + '@test.com');
        cy.get('input[name="password"]').type('a');
        cy.get('[data-cy="signup-submit"]').click();
        //Then I should see the "Password is too short" message
        cy.notificationEquals('Password is too short');
    });
});