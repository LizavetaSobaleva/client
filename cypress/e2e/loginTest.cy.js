describe('Login Test', () => {
  it('logs in successfully and redirects to the Disk page', () => {
    cy.visit('https://client-0y7p.onrender.com');

    cy.get('[data-testid="emailInput"]').type(Cypress.env('email'));
    cy.get('[data-testid="passwordInput"]').type(Cypress.env('password'));
    cy.get('[data-testid="loginButton"]').click();

    cy.url().should('eq', 'https://client-0y7p.onrender.com/'); 
    cy.get('.disk').should('be.visible');
  });
});
