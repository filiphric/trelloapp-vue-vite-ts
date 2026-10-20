import 'cypress-mailosaur';

before(() => {
  cy.env(['MAILOSAUR_API_KEY', 'MAILOSAUR_SERVER_ID']).then((env) => {
    for (const name of ['MAILOSAUR_API_KEY', 'MAILOSAUR_SERVER_ID']) {
      if (typeof env[name] !== 'string' || !env[name]) {
        throw new Error(`${name} must be configured`);
      }
    }
  });
});
