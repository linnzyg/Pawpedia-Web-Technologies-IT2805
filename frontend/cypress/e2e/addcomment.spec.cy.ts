// @ts-nocheck
describe("Dog Comment Test", () => {
  it("should visit the page, select mittelspitz, add a rating, and submit a comment", () => {
    cy.visit("/");

    // Step 1: Navigate to "Akita" (or any specific dog breed)
    cy.contains("Akita").click();

    // Step 2: Add name and comment
    cy.get('input[placeholder="Your name"]').type("test");
    cy.get('textarea[placeholder="Your comment"]').type(
      "this is a test comment",
    );

    // Step 3: Select a 3-star rating
    cy.contains("3 Stars").click();


    // Step 4: Submit the comment
    cy.contains("Submit Comment").click();

    // Step 5: Verify that the comment appears on the page
    cy.contains("this is a test comment").should("be.visible");
  });
});
