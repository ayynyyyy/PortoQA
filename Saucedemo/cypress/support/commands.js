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

//const cypress = require("cypress");

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (username, password) => {
    cy.get("#user-name").clear().type(username);
    cy.get("#password").clear().type(password);
    cy.get("#login-button").click();
  });

Cypress.Commands.add("logout", () => {
    cy.get('.bm-burger-button').click()
    cy.contains('Logout').click()
  });

Cypress.Commands.add("checkOut", () => {
    cy.get('#checkout').click()
  });

Cypress.Commands.add("form", () => {
    cy.get('#first-name').type('Aini')
    cy.get('#last-name').type('Rahma')
    cy.get('#postal-code').type("25173")
    cy.get('#continue').click()
  });


  