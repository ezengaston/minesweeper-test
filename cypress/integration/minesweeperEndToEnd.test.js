describe("minesweeper", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(window) {
        window.testBoard = [
          [
            { x: 0, y: 0, mine: false, status: "hidden" },
            { x: 0, y: 1, mine: false, status: "hidden" },
          ],
          [
            { x: 1, y: 0, mine: true, status: "hidden" },
            { x: 1, y: 1, mine: false, status: "hidden" },
          ],
        ];
      },
    });
  });
  it("Correctly handles right clicks", () => {
    cy.get("span").should("have.text", 1);
    cy.get('[data-x="0"][data-y="1"]').rightclick();
    cy.get('[data-x="0"][data-y="1"]')
      .should("have.css", "background-color")
      .and("match", /255, 255, 0/);
    cy.get("span").should("have.text", 0);
    cy.get('[data-x="1"][data-y="1"]').rightclick();
    cy.get('[data-x="1"][data-y="1"]')
      .should("have.css", "background-color")
      .and("match", /255, 255, 0/);
    cy.get("span").should("have.text", -1);
    cy.get('[data-x="1"][data-y="1"]').rightclick();
    cy.get('[data-x="1"][data-y="1"]')
      .should("have.css", "background-color")
      .and("match", /187, 187, 187/);
    cy.get("span").should("have.text", 0);
  });

  it("Correctly handles left clicks", () => {
    cy.get('[data-x="0"][data-y="1"]').click();
    cy.get('[data-x="0"][data-y="1"]').should("have.text", 1);
  });

  it("Correctly handles win condition", () => {
    cy.get('[data-x="0"][data-y="1"]').click();
    cy.get('[data-status="hidden"][data-x="0"]').click();
    cy.get('[data-status="hidden"][data-y="1"]').click();
    cy.get(".subtext").should("have.text", "You Win");
  });

  it("Correctly handles lose condition", () => {
    cy.get('[data-x="0"][data-y="1"]').click();
    cy.get('[data-status="hidden"][data-x="0"]').click();
    cy.get('[data-x="1"][data-y="0"]').click();
    cy.get(".subtext").should("have.text", "You Lose");
    cy.get('[data-x="1"][data-y="0"]').should(
      "have.attr",
      "data-status",
      "mine"
    );
    cy.get('[data-x="1"][data-y="1"]').click();
    cy.get('[data-x="1"][data-y="1"]').should(
      "have.attr",
      "data-status",
      "hidden"
    );
  });
});
