describe('Navigation Test', () => {
  it('Should navigate to the Dog Breed Gallery and select a dog', () => {
   
    cy.visit('http://localhost:5173');

    
    cy.contains('All dogs').click();

    
    cy.url().should('include', '/');
    cy.contains('Mittelspitz').should('exist');

    
    cy.contains('Golden Retriever').click();

    
    cy.url().should('include', '/6706af95370cf43e0a195b51');
    cy.contains('Golden Retriever').should('exist');
  });
});
