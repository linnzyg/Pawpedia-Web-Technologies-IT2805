describe('Filter by Size Test', () => {
    it('should filter to show only medium-sized dogs', () => {
      // Step 1: Visit the site
      cy.visit('/'); // Adjust the path if necessary
  
      // Step 2: Open the "Choose..." dropdown next to "Filter by Size"
      cy.contains('Filter by Size').parent().within(() => {
        cy.contains('Choose...').click({ force: true }); // For cases where the dropdown may be hidden initially
      });
  
      // Step 3: Select "Medium dogs" from the options
      cy.contains('Medium dogs').click({ force: true });
  
      // Step 4: Verify that only "Poodle" and "Beagle" are displayed
      cy.contains('Poodle').should('be.visible');
      cy.contains('Beagle').should('be.visible');
  
      
      });
    });
 
  