Cypress.Commands.add("loginAs", (email :string, password :string) => {
    cy.log(`Logging in as ${email} with password ${password}`);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('[data-cy="login-submit"]').click();
});
declare namespace Cypress {
    interface Chainable {
        loginAs(email: string, password: string): Chainable<void>
    }
}