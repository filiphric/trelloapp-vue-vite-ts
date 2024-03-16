beforeEach(() => {
    //seed the database with boards, lists and cards
    cy.fixture('users').then((fixture: any) => {
        cy.request('POST', '/api/signup', fixture[0]).then(function (response) {
            const auth = response.body.accessToken;
            cy.seedData('boards', undefined, auth);
            cy.seedData('lists', undefined, auth);
            cy.seedData('cards', undefined, auth);
        });
    });

    // Given I am logged in as a valid user
    cy.visit('/login');
    cy.loginAs('Existinguser@test.com', 'Existinguser123');
});

describe('Cards: as a valid user', () => {
    it('I can create a card', () => {
        //Given I am on a board page
        cy.visit('/board/1');
        //And I Click on the new card button
        cy.get('[data-cy="new-card"]').first().click();
        //When I enter the name of the card in the title field
        cy.get('[data-cy="new-card-input"]').type('New Card').type('{enter}');
        //Then I should see the newly created card
        cy.get('[data-cy="card"]').find('[data-cy="card-text"]').eq(1).should('have.text', 'New Card');
    });

    it('I can delete a card', () => {
        //Given I am on a cards detail page
        cy.visit('/board/1?card=1');
        //When I click on the delete card button
        cy.get('[data-cy="card-detail-delete"]').click();
        //Then I should see the card is deleted
        cy.get('[data-cy="card"]').contains('Create a Spec document').should('not.exist');
    });

    it('I can change the title of a card', () => {
        //Given I am on a cards detail page
        cy.visit('/board/1?card=1');
        //When I change the title of the card
        const newTitle = 'New Card Title';
        cy.get('[data-cy="card-detail-title"]').click().clear().type(newTitle).type('{enter}');
        //Then I should see the card has been renamed
        cy.get('[data-cy="notification-message"]').should('have.text', 'Card was renamed');
        cy.get('[data-cy="cancel"]').click();
        cy.get('[data-cy="card-text"]').should('contain', newTitle);
    });

    it('I can add a description to a card', () => {
        //Given I am on a cards detail page
        cy.visit('/board/1?card=1');
        //when I add a description to the card
        cy.get('[data-cy="card-description"]').click().clear().type('This is a description').type('{enter}');
        //Then I should see the description has been added
        cy.get('[data-cy="notification-message"]').should('have.text', 'Description was changed');
    });

    it('I can see card has the correct details', () => {
        //Given a detailed card exists
        cy.fixture('cards').then((fixture) => {
            cy.request('PATCH', '/api/cards/2', fixture[1]).then((response: any) => {
                let card = response.body;
                let boardId = parseInt(response.body.boardId);
                let id = parseInt(response.body.id);
                //when I view the card
                cy.visit(`/board/${boardId}?card=${id}`);
                //Then I should see the correct details
                cy.get('[data-cy="card-detail-title"]').should('have.value', card.name);
                cy.get('[data-cy="card-description"]').should('have.value', card.description);
            });
        });
    });

    it('I can move a card', () => {
        //Given I am on a board page
        cy.visit('/board/1');
        //And I have two lists with cards
        cy.get('[data-cy="card-list"]').first().find('[data-cy="card"]').should('exist');
        cy.get('[data-cy="card-list"]').eq(0).find('[data-cy="card"]').as('firstCard')
        cy.get('[data-cy="card-list"]').eq(1).as('secondList');
        cy.get('@firstCard').should('exist');
        //When I drag and drop a card from one list to another
        cy.get('@firstCard').drag('@secondList');
        //Then I should see the card has been moved
        cy.get('@firstCard').should('not.exist');
        cy.get('@secondList').find('[data-cy="card"]')
            .should('contain', 'Create a Spec document')
            .should('have.length', 2);
    });

    it('I can add an image to a card', () => {
        
     });
});

