const { selectors } = JSON.parse(Cypress.env('CONFIG'));

describe('stat component', function() {
  it('has a presentational image', function() {
    cy.get('.Stat')
      .find(selectors.image)
      .then($el => {
        cy.wrap($el)
          .invoke('attr', 'alt')
          .should('equal', '');
      });
  });
  it('egg used: displays', function() {
    // handle parsing ingredients in unit tests
    cy.findByAccessibleName('eggs used').should('have.length', 1);
  });
  it('cook count: displays the correct data', function() {
    cy.findByAccessibleName('10 recipes made').should('have.length', 1);
  });
  it('grease fires: displays the correct data', function() {
    cy.findByAccessibleName('3 grease fires').should('have.length', 1);
  });
  it('yumminess: displays the correct data', function() {
    cy.findByAccessibleName(/yumminess/).should('have.length', 1);
  });
});
