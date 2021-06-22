/// <reference types="cypress" />
import { config } from "./config/config";

context("Add due date to todo", () => {
  beforeEach(() => {
    cy.visit(config);
  });

  it("add due date `30 June 2021` for `todo 1`", () => {
    cy.get(".infinite-scroll-component")
      .children(".MuiBox-root")
      .eq(1)
      .children("button")
      .eq(0)
      .then(($el) => {
        $el.click();
        cy.wait(1000);
        cy.get(
          ":nth-child(5) > :nth-child(4) > .MuiButtonBase-root > .MuiIconButton-label > .MuiTypography-root"
        ).click();
      });
  });
});
