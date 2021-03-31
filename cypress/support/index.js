// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-axe';

// Alternatively you can use CommonJS syntax:
// require('./commands')

const { axe } = JSON.parse(Cypress.env('CONFIG'));
const URL = Cypress.env('TEST_URL') || 'http://localhost:1235';
before(() => {
  cy.visit(URL);
  cy.injectAxe();
});

afterEach(() => {
  cy.checkA11y(null, axe);
});
