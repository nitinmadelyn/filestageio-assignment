/// <reference types="cypress" />
import { config } from "./config/config";

context("Add 60 todos", () => {
  beforeEach(() => {
    cy.visit(config);
  });

  it("Add 60 todos", () => {
    config.todos.forEach(async (todo) => {
      cy.get("#addTodoInput").type(todo + "{enter}");
    });
  });
});
