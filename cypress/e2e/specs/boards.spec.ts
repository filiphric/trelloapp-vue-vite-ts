beforeEach(() => {
    //seed the database with boards
    cy.fixture('users').then((fixture) => {
        cy.request('POST', '/api/signup', fixture[0]).then(function (response) {
            const auth = response.body.accessToken;
            cy.seedData('boards', undefined, auth);
        });
    });

    //Given I am logged in as a valid user 
    cy.visit('/login');
    cy.loginAs('Existinguser@test.com', 'Existinguser123');
});

describe('Boards control: as a valid user', () => {
    it('I can create a board', () => {
        //Given I click on the create board button
        cy.get('[data-cy="create-board"]').click();
        //When I enter the name of the board in the title field
        cy.get('[data-cy="new-board-input"]').type('New Board');
        cy.get('[data-cy="new-board-create"]').click();
        //Then I should see the newly created board
        cy.get('[data-cy="board-title"]').should('have.text', 'New Board');
        cy.url().should('include', '/board/');
    });

    it('I can delete a board', () => {
        //Given I navigate to a board
        cy.get('[data-cy="board-item"]').filter(':contains("Portfolio Kanban")').click();
        //When I click on the delete board button in the options menu
        cy.get('[data-cy="board-options"]').click();
        cy.get('[data-cy="delete-board"]').click();
        //Then I should see the board is deleted
        cy.get('[data-cy="notification-message"]').should('have.text', 'Board was deleted')
    });

    it('I can favorite a board', () => {
        //Given I navigate to a board
        cy.get('[data-cy="board-item"]').filter(':contains("Portfolio Kanban")').click();
        //When I click on the favorite button
        cy.get('[data-cy="star"]').click();
        //Then I should see the board is favorited
        cy.get('.text-yellow-300').should('exist');
        cy.get('[data-cy="home"]').click();
        cy.get('[data-cy="starred-section"]').filter(':contains("Portfolio Kanban")').should('exist');
    });

    it('I can unfavorite a board', () => {
        //Given I have favorited a board
        cy.log('Setting up the test')
        cy.fixture('users').then((fixture) => {
            cy.request('POST', '/api/login', fixture[0]).then(function (response) {
                const auth = response.body.accessToken;
                cy.request({
                    method: 'PATCH',
                    url: '/api/boards/1',
                    headers: { authorization: `Bearer ${auth}` },
                    body: { "starred": true },
                })
            });
        });
        cy.reload();
        //And I navigate to the board
        cy.get('[data-cy="starred-section"]').find('[data-cy="board-item"]').filter(':contains("Portfolio Kanban")').click();
        //When I click on the favorite button
        cy.get('[data-cy="star"]').click();
        //Then I should see the board is unfavorited
        cy.get('[data-cy="star"]').filter('.text-white').should('exist');
        cy.get('[data-cy="home"]').click();
        cy.get('[data-cy="starred-section"]').should('not.exist');
        cy.get('[data-cy="all-boards"]').filter(':contains("Portfolio Kanban")').should('exist');
    });

    it('I can modify the name of a board', () => {
        //Given I am on a board page
        cy.get('[data-cy="board-item"]').filter(':contains("Portfolio Kanban")').click();
        //When I make a change to the board name
        cy.get('input[name="board-title"]').click().clear().type('RotaMaster Kanban').type('{enter}');
        //Then I should see the board name is updated
        cy.get('[data-cy="board-title"]').should('have.text', 'RotaMaster Kanban');
        cy.get('[data-cy="home"]').click();
        cy.get('[data-cy="board-item"]').filter(':contains("RotaMaster Kanban")').should('exist');
    });
});