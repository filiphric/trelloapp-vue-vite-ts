it('check text of all cards in first list',()=>{

    cy.visit('/board/1');
    cy.get('[data-cy=card-text]')
    .eq(0)
    .should('have.text', 'Milk')

    cy.get('[data-cy=card-text]')
    .eq(1)
    .should('have.text','Juice')
    
    cy.get('[data-cy=card-text]')
    .eq(2)
    .should('have.text','Bread')

})