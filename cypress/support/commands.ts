Cypress.Commands.add('loginAs', (email: string, password: string) => {
    cy.log(`Logging in as ${email} with password ${password}`);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('[data-cy="login-submit"]').click();
});

Cypress.Commands.add('withValue', { prevSubject: true }, (element, value) => {
    return element.filter((_:number, el:any) => {
      return Cypress.$(el).val() === value;
    });
  });

Cypress.Commands.add('notificationEquals', (value) => {cy.get('[data-cy="notification-message"]').should('have.text', value)});

Cypress.Commands.add('seedData', (fixtureName: string, index?: number, auth?: string) => {
    cy.log(`Seeding data from ${fixtureName}`);
    if (!auth) {
        cy.log('No auth token provided, seeding data as guest');
           if (index == undefined) {
            cy.log('Seeding all data from fixture');
            cy.fixture(fixtureName).then((fixture) => {
                for (let i = 0; i < fixture.length; i++) {
                    cy.request({
                        method: 'POST',
                        url: `/api/${fixtureName}`,
                        body: fixture[i]
                    });
                }
            });
        } else {
            cy.log(`Seeding data from fixture at index ${index}`);
            cy.fixture(fixtureName).then((fixture) => {
                cy.request({
                    method: 'POST',
                    url: `/api/${fixtureName}`,
                    body: fixture[index]
                });
            });
        }
    }
    else {
        cy.log('Auth token provided, seeding data as user');
        cy.fixture(fixtureName).then((fixture) => {
            if (index == undefined) {
                cy.log('Seeding all data from fixture');
                for (let i = 0; i < fixture.length; i++) {
                    cy.request({
                        method: 'POST',
                        url: `/api/${fixtureName}`,
                        headers: { authorization: `Bearer ${auth}` },
                        body: fixture[i]
                    });
                }
            } else {
                cy.log(`Seeding data from fixture at index ${index}`);
                cy.request({
                    method: 'POST',
                    url: `/api/${fixtureName}`,
                    headers: { authorization: `Bearer ${auth}` },
                    body: fixture[index]
                });
            }
        });
    };
});



declare namespace Cypress {
    interface Chainable {
        loginAs(email: string, password: string): Chainable<void>
        seedData(fixtureName: string, index?: number, auth?: string): Chainable<void>
        withValue(value: string): Chainable<void>
        notificationEquals(value: string): Chainable<void>
    }
}