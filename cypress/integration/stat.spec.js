const { selectors } = JSON.parse(Cypress.env('CONFIG'));
const { _ } = Cypress;
import data from '../../src/data';

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
    const total = _.sumBy(data, d => d.cookCount);
    cy.findByAccessibleName(`${total} recipes made`).should('have.length', 1);
  });
  it('grease fires: displays the correct data', function() {
    const total = _.sumBy(data, d => d.greaseFireCount);
    cy.findByAccessibleName(`${total} grease fires`).should('have.length', 1);
  });
  it('yumminess: displays the correct data', function() {
    const avg = _.meanBy(data, d => d.yumminess);
    cy.findByAccessibleName(`yumminess ${avg}`).should('have.length', 1);
  });
});
