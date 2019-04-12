const { selectors } = JSON.parse(Cypress.env('CONFIG'));

describe('recipe modal component', function() {
  it('opens by clicking a "Cook" button', function() {
    cy.get('.Recipes__card')
      .first()
      .then($el => {
        cy.wrap($el)
          .find(selectors.button)
          .last()
          .click();
      });
  });
});
