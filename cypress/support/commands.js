// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// commands.js
Cypress.Commands.add('loginAsUser', (goto = '') => {
  cy.visit('/web/index.php/auth/login').then(() => {
    cy.fixture('userData').then((data) => {
      cy.get('[name="username"]').type(data.username);
      cy.get('[name="username"]').should('have.value', data.username);
      cy.get('[name="password"]').type(data.password);
      cy.get('[name="password"]').should('have.value', data.password);
      cy.get('[type="submit"]').click();

      if (goto !== '') {
        cy.get('.oxd-main-menu-item-wrapper')
          .filter((_, el) => el.textContent.trim() === goto) // Filter for exact text match
          .click();
      }
    });
  });
});
