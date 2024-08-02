describe('Folder management tests', () => {
    beforeEach(() => {
      cy.login();
    });
  
  
    it('creates folder successfully', () => {
      cy.get('[data-testid="diskCreateBtn"]').click();
      cy.get('[data-testid="createInput"]').type('Test folder');
      cy.get('[data-testid="createBtn"]').click();
  
      cy.get('.file').contains('Test folder').should('be.visible');
    });
  
  
    it('change view successfully', () => {
      cy.get('[data-testid="plateViewBtn"]').click();
  
      cy.get('.fileplate').should('be.visible');
  
      cy.get('[data-testid="listViewBtn"]').click();
      
      cy.get('.filelist').should('be.visible');
    });
  
  
    it('open folder successfully', () => {
      cy.get('.file').contains('Test folder').click();
  
      cy.get('[data-testid="backBtn"]').should('be.visible');
    });
  
  
    it('delete folder successfully', () => {
      cy.get('.file').contains('Test folder').parent().find('.file__actions').trigger('mouseover');
      cy.get('.file').contains('Test folder').parent().contains('button', 'Delete').click({ force: true });
  
      cy.get('.file').should('not.contain', 'Test folder');
    });
  });