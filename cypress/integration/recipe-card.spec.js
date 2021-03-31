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
  //   for (const item of [
  //     {text: 'Chocolate Cake', index: 0},
  //     {text: 'Mom\'s Spaghetti', index: 1},
  //     {text: 'Filet Mignon', index: 2},
  //     {text: 'Mega Burger', index: 3},
  //     {text: 'Grilled Cheese', index: 4},
  //     {text: 'Lemon Squares', index: 5},
  //     {text: 'Kale Salad', index: 6},
  //     {text: 'Trail Mix', index: 7},
  //   ]) {
  //     it(`has an "Edit ${item.text}" button`, function() {
  //       const compare = 'Edit ' + item.text
  //       cy.get(`.${componentClass}`).then($el => {
  //         cy.wrap($el)
  //         .find(selectors.button)
  //         .eq(item.index*2)
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
