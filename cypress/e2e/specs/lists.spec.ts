beforeEach(() => {
    //seed the database with boards and lists
    cy.fixture('users').then((fixture) => {
        cy.request('POST', '/api/signup', fixture[0]).then(function (response) {
            const auth = response.body.accessToken;
            cy.seedData('boards', undefined, auth);
            cy.seedData('lists');
        });
    });

    //Given I am logged in as a valid user
    cy.visit('/login');
    cy.loginAs('Existinguser@test.com', 'Existinguser123');
    //And I am on the board page
    cy.visit('/board/1');
});

describe('Lists: as a valid user', () => {
    it('I can create a list', () => {
        //Given I click on the create list button
        cy.get('[data-cy="create-list"]').click()
        //When I enter the name of the list in the input field
        cy.get('[data-cy="add-list-input"]').type('New List').type('{enter}');

        //Then I should see the newly created list
        cy.get('[data-cy="list-name"]').withValue('New List').should('exist');
    });

    it('I can delete a list', () => {
        //Given I am on the board page 
        //When I click on the delete list button in the options menu
        cy.get('[data-cy="list-name"]').withValue('Delete this list').siblings('[data-cy="list-options"]').click();
        cy.get('[data-cy="delete-list"]').click();

        //Then I should see the list is deleted
        cy.get('[data-cy="list-name"]').withValue('Delete this list').should('not.exist');
    });

    it('I can modify the name of a list', () => {
        //Given I am on the board page
        //And I click on the name of the list
        //When I enter the new name of the list in the input field
        cy.get('[data-cy="list-name"]').withValue('Move this list').click()
            .clear().type('List Renamed').type('{enter}');

        //Then I should see the list is renamed
        cy.get('[data-cy="list-name"]').withValue('List Renamed').should('exist');

    });

    it('I can drag and drop a list', () => {
        //Given I am on the board page
        //And I have two lists
        cy.get('[data-cy="list-name"]').first().as('firstList');
        cy.get('[data-cy="list-name"]').last().as('lastList');

        cy.get('@firstList').should('have.value', 'Move this list');

        //When I drag the first list to the right of the second list
        cy.get('@firstList').drag('@lastList');

        //Then I should see the lists are swapped
        cy.get('@lastList').should('have.value', 'Move this list');
        cy.get('@firstList').should('have.value', 'Delete this list');
    });

});