// locators for login page

const LOCATORS = {
  username: 'input[name="username"]',
  password: 'input[name="password"]',
  submitBtn: 'button[type="submit"]',
  requiredMsg: ".oxd-input-group__message",
};

export class LoginPage {
  visit() {
    cy.visit("/");
  }

  isloaded() {
    cy.get(LOCATORS.username).should("be.visible");
    cy.get(LOCATORS.password).should("be.visible");
    cy.get(LOCATORS.submitBtn).should("be.visible");
  }
  typeUsername(value: string) {
    cy.get(LOCATORS.username).type(value);
  }

  typePassword(value: string) {
    cy.get(LOCATORS.password).type(value);
  }

  clearPassword() {
    cy.get(LOCATORS.password).clear();
  }

  submit() {
    cy.get(LOCATORS.submitBtn).click();
  }

  passwordShouldBeMasked() {
    cy.get(LOCATORS.password).should("have.attr", "type", "password");
  }
  asserRequiredAt(index: number, text: string) {
    cy.get(LOCATORS.requiredMsg).eq(index).should("contain", text);
  }
  assertInvalidCredentials(text: string) {
    cy.contains(text).should("be.visible");
  }
}

// export const loginPage = new LoginPage();
export default new LoginPage();
