
describe("Dog Comment Test", () => {
  it("should visit the page, select mittelspitz, add a rating, and submit a comment", () => {
    cy.visit("/");

    cy.contains("Akita").click();

    cy.get('input[placeholder="Your name"]').type("test");
    cy.get('textarea[placeholder="Your comment"]').type(
      "this is a test comment",
    );

    cy.contains("3 Stars").click();

    cy.contains("Submit Comment").click();

    cy.contains("this is a test comment").should("be.visible");
  });
});
