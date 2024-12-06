
describe("Filter by Size Functionality", () => {
  it("should open the 'Choose size' dropdown and select 'Medium dogs'", () => {
    cy.visit("/");

    cy.get('div[role="combobox"][aria-labelledby="size-filter-label"]').click({
      force: true,
    });

    cy.get('ul[role="listbox"]').within(() => {
      cy.get('li[data-value="Medium"]').click({ force: true });
    });

    cy.contains("Bulldog").should("be.visible");
    cy.contains("Shiba Inu").should("be.visible");

    cy.contains("Great Dane").should("not.exist"); // Large dog
    cy.contains("Chihuahua").should("not.exist"); // Small dog
  });
});
