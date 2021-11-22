it('selecting elements', () => {

  cy.visit('/')

  // Select the whole document
  cy.xpath('/html')
  cy.root()

  // Select an element by text
  cy.xpath('//*[text()[contains(.,"My Boards")]]')
  cy.contains('My Boards')

  // Select a specific element by text
  cy.xpath('//h1[contains(.,"My Boards")]')
  cy.contains('h1', 'My Boards')
  
  // Select an element by attribute
  cy.xpath('//*[@data-cy="create-board"]')
  cy.get('[data-cy="create-board"]')

  // Select an element that contains a class
  cy.xpath('//*[contains(@class, "font-semibold")]')
  cy.get('.font-semibold')

  // Select an element with specific class, by text
  cy.xpath('//*[contains(@class, "font-semibold")][text()[contains(.,"My Boards")]]')
  cy.contains('.font-semibold', 'My Boards')

  // Filter an element by index
  cy.xpath('(//div[contains(@class, "board")])[1]')
  cy.get('.board').eq(0)

  cy.visit('/board/33974184794')

  // Select a child element
  cy.xpath('//div[contains(@class, "list")]//child::div[contains(@class, "card")]')
  cy.get('.list').find('.card')

  // Select only elements containing a specific child element
  cy.xpath('//div[contains(@class, "list")][.//div[contains(@class, "card")]]')
  cy.get('.card').parents('.list')
  
  // Select an element after a specific element
  cy.xpath('//div[contains(@class, "card")][preceding::div[contains(., "milk")]]')
  cy.contains('.card', 'milk').next('.card')
  
  // Select an element before a specific element
  cy.xpath('//div[contains(@class, "card")][following::div[contains(., "bread")]]')
  cy.contains('.card', 'bread').prev('.card')

});