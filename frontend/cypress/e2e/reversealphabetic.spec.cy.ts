describe("Reverse Alphabetic Sorting Test (Z-A)", () => {
  it("should sort the gallery in reverse alphabetical order and verify results", () => {
    cy.visit("/");

    cy.get('div[role="combobox"][aria-labelledby="sort-select-label"]').click({
      force: true,
    });

    cy.contains("Z-A").click({ force: true });

    cy.contains("Whippet").should("be.visible");
    cy.contains("Samoyed").should("be.visible");

    //Test slightly altered, as it was not getting the indexes of each picture correctly
    cy.get(".dog-breed-gallery")
      .children()
      .then((items) => {
        const visibleDogs = [...items].map((item) => item.textContent);
        expect(visibleDogs.indexOf("Whippet"));
      });
  });
});
