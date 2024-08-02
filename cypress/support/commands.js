import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
    cy.visit('https://client-0y7p.onrender.com')
    cy.get('[data-testid="emailInput"]').type(Cypress.env('email'))
    cy.get('[data-testid="passwordInput"]').type(Cypress.env('password'))
    cy.get('[data-testid="loginButton"]').click()
    cy.wait(4000)
})
