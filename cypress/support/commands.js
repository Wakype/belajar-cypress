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
Cypress.Commands.add(
  'loginAsUser',
  (goto = '', username = 'Admin', password = 'admin123') => {
    cy.visit('/web/index.php/auth/login').then(() => {
      cy.get('[name="username"]').type(username);
      cy.get('[name="username"]').should('have.value', username);
      cy.get('[name="password"]').type(password);
      cy.get('[name="password"]').should('have.value', password);
      cy.get('[type="submit"]').click();

      if (goto !== '') {
        cy.get('.oxd-main-menu-item-wrapper')
          .filter((_, el) => el.textContent.trim() === goto) // Filter for exact text match
          .click();
      }
    });
  }
);
