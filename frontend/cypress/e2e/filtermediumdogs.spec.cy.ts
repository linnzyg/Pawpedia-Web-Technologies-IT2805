describe("Filter by Size Test", () => {
  it("should filter to show only medium-sized dogs", () => {
    cy.visit("/");

    cy.contains("Filter by Size")
      .parent()
      .within(() => {
        cy.contains("Choose...").click({ force: true });
      });

    cy.contains("Medium dogs").click({ force: true });

    cy.contains("Poodle").should("be.visible");
    cy.contains("Beagle").should("be.visible");
  });
});
