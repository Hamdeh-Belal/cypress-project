import { dashboardPage } from "../../support/pages/dashboard-page";
import LoginPage from "../../support/pages/login-page";

describe("Login Functionality", () => {
 
  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("messages").as("messages");
    LoginPage.visit();
    LoginPage.isloaded();
  });

  it("TC01 - Should log in successfully with valid username and password", () => {
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
    dashboardPage.isloaded();

    // cy.get('input[name="username"]').type('Admin')
    // cy.get('input[name="password"]').type('admin123')
    // cy.get('button[type="submit"]').click()
    // cy.url().should('include', '/dashboard')
  });

  it("TC02 - Should show error for valid username and invalid password", () => {
    // cy.get('input[name="username"]').type('Admin')
    // cy.get('input[name="password"]').type('wrongpass')
    // cy.get('button[type="submit"]').click()
    // cy.contains('Invalid credentials').should('be.visible')
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.invalid.password);
    });
    cy.get("@messages").then((messages: any) => {
      LoginPage.assertInvalidCredentials(messages.invalidCreds);
    });
  });

  it("TC03 - Should show error for invalid username and valid password", () => {
    // cy.get('input[name="username"]').type('WrongUser')
    // cy.get('input[name="password"]').type('admin123')
    // cy.get('button[type="submit"]').click()
    // cy.contains('Invalid credentials').should('be.visible')
    cy.get("@users").then((users: any) => {
      cy.login(users.invalid.username, users.valid.password);
    });
    cy.get("@messages").then((messages: any) => {
      LoginPage.assertInvalidCredentials(messages.invalidCreds);
    });
  });

  it("TC04 - Should show error for invalid username and invalid password", () => {
    // cy.get('input[name="username"]').type('WrongUser')
    // cy.get('input[name="password"]').type('wrongpass')
    // cy.get('button[type="submit"]').click()
    // cy.contains('Invalid credentials').should('be.visible')

    cy.get("@users").then((users: any) => {
      cy.login(users.invalid.username, users.invalid.password);
    });
    cy.get("@messages").then((messages: any) => {
      LoginPage.assertInvalidCredentials(messages.invalidCreds);
    });
  });

  it("TC05 - Should show required message when username is empty and password is valid", () => {
    // cy.get('input[name="password"]').type('admin123')
    // cy.get('button[type="submit"]').click()
    // cy.get('span').contains('Required').should('be.visible')

    cy.get("@users").then((users: any) => {
      cy.login_1(users.valid.password, false);
    });
    cy.get("@messages").then((messages: any) => {
      LoginPage.asserRequiredAt(0, messages.required);
    });
  });

  it("TC06 - Should show required message when username is empty and password is invalid", () => {
    // cy.get('input[name="password"]').type('wrongpass')
    // cy.get('button[type="submit"]').click()
    // cy.get('span').contains('Required').should('be.visible')

    cy.get("@users").then((users: any) => {
      cy.login_1(users.invalid.password, false);
    });
    cy.get("@messages").then((messages: any) => {
      LoginPage.asserRequiredAt(0, messages.required);
    });
  });

  it("TC07 - Should show required message when password is empty and username is valid", () => {
    // cy.get('input[name="username"]').type('Admin')
    // cy.get('button[type="submit"]').click()
    // cy.get('span').contains('Required').should('be.visible')

    cy.get("@users").then((users: any) => {
      cy.login_1(users.valid.username, true);
    });
    cy.get("@messages").then((messages: any) => {
      LoginPage.asserRequiredAt(0, messages.required);
    });
  });

  it("TC08 - Should show required message when password is empty and username is invalid", () => {
    // cy.get('input[name="username"]').type("WrongUser");
    // cy.get('button[type="submit"]').click();
    // cy.get("span").contains("Required").should("be.visible");
    cy.get("@users").then((users: any) => {
      cy.login_1(users.invalid.username, true);
    });
    cy.get("@messages").then((messages: any) => {
      LoginPage.asserRequiredAt(0, messages.required);
    });
  });

  it("TC09 - Should show required messages when both username and password are empty", () => {
    // cy.get('button[type="submit"]').click();
    // cy.get("span").contains("Required").first().should("be.visible");
    // cy.get("span").contains("Required").last().should("be.visible");

     cy.get("@users").then((users: any) => {
      LoginPage.submit();
    });
    cy.get("@messages").then((messages: any) => {
      LoginPage.asserRequiredAt(0, messages.required);
      LoginPage.asserRequiredAt(1, messages.required);
    });
  });

  it("TC10 - Should mask password input by default", () => {
    // cy.get('input[name="password"]').should("have.attr", "type", "password");
    LoginPage.passwordShouldBeMasked();
  });
});
