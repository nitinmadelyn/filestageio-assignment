/// <reference types="cypress" />
import { config } from "./config/config";

context("Infinite scroll", () => {
  beforeEach(() => {
    cy.visit(config);
  });

  it("Scroll to bottom till all todos fetched", () => {
    cy.scrollTo("bottom");
    cy.wait(1000);
    cy.scrollTo("bottom");
    cy.wait(1000);
    cy.scrollTo("bottom");
  });
});
