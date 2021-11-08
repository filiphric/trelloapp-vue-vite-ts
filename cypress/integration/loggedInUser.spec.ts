it('loads all data', () => {
  cy.intercept('/api/boards', (req) => {
    req.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpbGlwQGV4YW1wbGUuY29tIiwiaWF0IjoxNjM2NTc3NjQzLCJleHAiOjE2MzY1ODEyNDMsInN1YiI6IjEifQ.CF3roP17bJcc0aiJPWsFLOo211iWXTBcSRNw1xwbBek'
  }).as('boards');
  cy.visit('/');
});