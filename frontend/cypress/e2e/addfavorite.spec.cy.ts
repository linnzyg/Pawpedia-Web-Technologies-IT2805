// @ts-nocheck
describe("Add to Favorites Test", () => {
  it("should add Beagle to favorites and verify it is listed in the favorites section", () => {
    cy.visit("/");

    cy.contains("Beagle").click();

    cy.get('button[aria-label="favorite-button"]').click();

    cy.contains("Favorites").click();

    cy.contains("Beagle").should("be.visible");
  });
});
