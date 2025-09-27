import {adminPage} from "../../support/pages/admin/admin-page";
import LoginPage from "../../support/pages/login-page";

describe("Validate module URLS and headers for all pages", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
  });

  it("TC11 - Should Open Admin Page and validate URL and header", () => {
    adminPage.openFromMenu();
    adminPage.validateURL();
    adminPage.validateHeader();
  });
});
