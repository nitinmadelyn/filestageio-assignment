/// <reference types="cypress" />
import { config } from "./config/config";

//Note: This is not working as expected using `cypress-drag-drop` plugin, but still i have written to demonstrate.
context("Sorting todos - drag and drop", () => {
  beforeEach(() => {
    cy.visit(config);
  });

  it("Drag & drop todo", () => {
    cy.get(".infinite-scroll-component", { position: "bottom" })
      .children(".MuiBox-root")
      .eq(3)
      .drag("#todo-0b6feb75-fa78-4e93-ae8f-43ad3c6f73b2", {
        force: true,
      });
    cy.wait(500);
  });
});
