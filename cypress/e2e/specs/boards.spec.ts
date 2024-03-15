beforeEach(() => {
    cy.visit('/login');
    cy.loginAs('Existinguser@test.com', 'Existinguser123');
});

describe('Boards control: as a valid user', () => {
    it('I can create a board', () => {
        cy.get('[data-cy="create-board"]').click();
        cy.get('[data-cy="new-board-input"]').type('New Board');
        cy.get('[data-cy="new-board-create"]').click();

        // assertions
        cy.get('[data-cy="board-title"]').should('have.text', 'New Board');
        cy.url().should('include', '/board/');
    });

    it('I can delete a board', () => { 
        cy.get('[data-cy="board-item"]').filter(':contains("Meme Ideas")').click();
        cy.get('[data-cy="board-options"]').click();
        cy.get('[data-cy="delete-board"]').click();

        // assertions
        cy.get('[data-cy="notification-message"]').should('have.text', 'Board was deleted')
    });

    it('I can favorite a board', () => {
        cy.get('[data-cy="board-item"]').filter(':contains("Grocery List")').click();
        cy.get('[data-cy="star"]').click();

        // assertion
        // favorite icon is yellow
        cy.get('.text-yellow-300').should('exist');

        // favored board is in the starred section
        cy.get('[data-cy="home"]').click();
        cy.get('[data-cy="starred-section"]').filter(':contains("Grocery List")').should('exist');
     });

    it('I can unfavorite a board', () => { 
        cy.get('[data-cy="starred-section"]').find('[data-cy="board-item"]').filter(':contains("Wedding plan")').click();
        cy.get('[data-cy="star"]').click();

        // assertions
        // favorite icon is white
        cy.get('[data-cy="star"]').filter('.text-white').should('exist');
    
        // unfavored board is not in the starred section
        cy.get('[data-cy="home"]').click();
        cy.get('[data-cy="starred-section"]').filter(':contains("Wedding plan")').should('not.exist');
        cy.get('[data-cy="all-boards"]').filter(':contains("Wedding plan")').should('exist');

     });

    it('I can modify the name of a board', () => {
        cy.get('[data-cy="board-item"]').filter(':contains("RoverMaster")').click();
        cy.get('input[name="board-title"]').click().clear().type('RotaMaster').type('{enter}');
        
        // assertions
        cy.get('[data-cy="board-title"]').should('have.text', 'RotaMaster');
        
        // board name is updated on the home page
        cy.get('[data-cy="home"]').click();
        cy.get('[data-cy="board-item"]').filter(':contains("RotaMaster")').should('exist');
     });
});