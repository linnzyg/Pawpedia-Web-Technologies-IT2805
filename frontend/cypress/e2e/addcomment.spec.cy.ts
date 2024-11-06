describe('Dog Comment Test', () => {
    it('should visit the page, select mittelspitz, and submit a comment', () => {
      // Step 1: Visit the page
      cy.visit('/'); // Adjust the path if necessary
  
      // Step 2: Find and click on the dog "mittelspitz"
      cy.contains('Mittelspitz').click();
  
      // Step 3: Enter name and comment
      cy.get('input[placeholder="Your name"]').type('test'); // Select based on placeholder
      cy.get('textarea[placeholder="Your comment"]').type('this is a test comment'); // Adjust selector as needed
  
      // Step 4: Submit the comment
      cy.contains('Submit Comment').click();
  
      // (Optional) Verify comment submission
      cy.contains('this is a test comment').should('be.visible');
    });
  });
  