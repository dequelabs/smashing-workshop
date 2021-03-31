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

  // describe('edit buttons', () => {
  //   for (const [index, item] of [
  //     'Chocolate Cake',
  //     'Mom\'s Spaghetti',
  //     'Filet Mignon',
  //     'Mega Burger',
  //     'Grilled Cheese',
  //     'Lemon Squares',
  //     'Kale Salad',
  //     'Trail Mix'
  //   ].entries()) {
  //     it(`has an "Edit ${item}" button`, function() {
  //       const compare = 'Edit ' + item
  //       cy.get(`.${componentClass}`).then($el => {
  //         cy.wrap($el)
  //         .find(selectors.button)
  //         .eq(index*2)
  //         .accessibleName()
  //         .should('eq', compare);
  //       });
  //     });
  //   }
  // })

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
