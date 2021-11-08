it('intercept body dynamically', () => {
  cy.intercept('/api/boards', (req) => {
    req.reply( res => {
      expect(res.body[0].name).to.exist
      res.body[0].name = 'Filip’s birthday party'
    })
  }).as('boards');
  cy.visit('/');
});