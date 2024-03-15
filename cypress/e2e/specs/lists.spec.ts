describe('Lists: as a valid user', () => {

    beforeEach(() => {
    cy.visit('/login');
    cy.loginAs('Existinguser@test.com', 'Existinguser123');
    });
    
    it('I can create a list', () => {

    });

    it('I can delete a list', () => {

     });

    it('I can modify the name of a list', () => {

     });

    it('I can move a list', () => {
        
     });

});