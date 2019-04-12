const { selectors } = JSON.parse(Cypress.env('CONFIG'));
const componentClass = 'Recipes__card';

describe('recipe card component', function() {
  it('has a presentational image', function() {
    cy.get(`.${componentClass}`)
      .find(selectors.image)
      .then($el => {
        cy.wrap($el)
          .invoke('attr', 'alt')
          .should('equal', '');
      });
  });

  it('has a heading title', function() {
    cy.get(`.${componentClass}`)
      .find(selectors.heading)
      .then($el => {
        cy.wrap($el).accessibleName();
      });
  });

  it('has an "Edit" button', function() {
    cy.get(`.${componentClass}`).then($el => {
      cy.wrap($el)
        .find(selectors.button)
        .first()
        .accessibleName()
        .should('match', /^edit/i);
    });
  });

  it('has a "Cook" button', function() {
    cy.get(`.${componentClass}`).then($el => {
      cy.wrap($el)
        .find(selectors.button)
        .last()
        .accessibleName()
        .should('match', /^cook/i);
    });
  });
});
