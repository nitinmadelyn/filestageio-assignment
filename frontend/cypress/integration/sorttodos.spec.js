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
      .drag("#todo-28e5a1d1-3e6f-42fc-893f-f38481cd4e6f", {
        force: true,
      });
    cy.wait(500);
  });
});
