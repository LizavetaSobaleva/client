describe('File management tests', () => {
    beforeEach(() => {
      cy.login();
    });
  
  
    it('upload file successfully', () => {
      const filePath = 'example.json';
  
      cy.get('#upload-input').attachFile(filePath, { force: true });
  
      cy.wait(2000)
      cy.get('.uploader').should('be.visible').and('contain', 'example.json');
      cy.wait(2000)
      cy.get('.file').contains('example.json').should('be.visible');
  
    });
  
    it('download file successfully', () => {
      cy.get('.file').contains('example.json').parent().find('.file__actions').trigger('mouseover');
      cy.get('.file').contains('example.json').parent().contains('button', 'Download').click({ force: true });
  
      cy.wait(2000)
      cy.readFile('cypress/downloads/example.json').should('exist').then((downloadContent) => {
        cy.readFile('cypress/fixtures/example.json').then((originalContent) => {
          expect(downloadContent).to.deep.equal(originalContent)
        })
      })
    });
  
  
    it('delete file successfully', () => {
      cy.get('.file').contains('example.json').parent().find('.file__actions').trigger('mouseover');
      cy.get('.file').contains('example.json').parent().contains('button', 'Delete').click({ force: true });
  
      cy.wait(2000)
      cy.get('.file').should('not.contain', 'example.json');
    });
  });