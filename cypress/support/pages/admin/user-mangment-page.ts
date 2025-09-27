import {
  ADMIN_BUTTONS,
  ADMIN_MODULES_URLS,
  ADMIN_TABS,
} from "../../enum/admin-modules-enums";
import { SYSTEM_MESSAGES } from "../../enum/system-messages-enum";
import { APP_MODULES } from "../../enum/modules-enums";

const LOCATORS = {
  USER_MANAGEMENT_TAB: ".oxd-topbar-body-nav-tab",
  DROPDOWN: ".oxd-select-text--after",
  DROPDOWN_INPUT: ".oxd-select-text-input",
  DROPDOWN_OPTION: ".oxd-select-dropdown",
  EMPLOYEE_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  EMPLOYEE_NAME_DROPDOWN: ".oxd-autocomplete-dropdown",
  USERNAME_INPUT: 'input[autocomplete="off"]',
  PASSWORD_INPUT: 'input[type="password"]',
  CONFIRM_PASSWORD_INPUT: 'input[type="password"]',
  Submit_BUTTON: 'button[type="submit"]',
  ADD_BUTTON: "button.oxd-button.oxd-button--medium.oxd-button--secondary",
  USERNAME_CLASS: "input.oxd-input--active",
  LIST_ROW: '[role="row"]',
  EDIT_BUTTON: ".oxd-icon.bi-pencil-fill",
  DELETE_BUTTON: ".oxd-icon.bi-trash",
  TOAST_MESSAGE: ".oxd-toast",
  YES_DELETE_BUTTON: "button.oxd-button--label-danger",
};

export class UserManagementPage {
  goToAdminModule() {
    cy.get("nav").contains(APP_MODULES.ADMIN).click();
  }
  gotoUserManagement() {
    cy.get(LOCATORS.USER_MANAGEMENT_TAB)
      .contains(ADMIN_TABS.USER_MANAGEMENT_TAB)
      .click();
  }
  goToUsers() {
    cy.get("a").contains("Users").click();
  }
  addNewUser() {
    cy.get(LOCATORS.ADD_BUTTON).contains(ADMIN_BUTTONS.ADD).click();
  }

  validateURL() {
    cy.url().should("include", ADMIN_MODULES_URLS.ADD_USER);
  }
  selectUserRole(role: string) {
    cy.get(LOCATORS.DROPDOWN).first().click();
    cy.get(LOCATORS.DROPDOWN_INPUT).first().type(role);
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(role).click();
  }
  selectStatus(status: string) {
    cy.get(LOCATORS.DROPDOWN).last().click();
    cy.get(LOCATORS.DROPDOWN_INPUT).last().type(status);
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(status).click();
  }
  setEmployeeName(name: string) {
    cy.get(LOCATORS.EMPLOYEE_NAME_INPUT).type(name);
    cy.get(LOCATORS.EMPLOYEE_NAME_DROPDOWN).contains(name).click();
  }
  setUsername(username: string) {
    cy.get(LOCATORS.USERNAME_INPUT).first().type(username);
  }
  enterUsername(username: string) {
    cy.get(LOCATORS.USERNAME_CLASS).last().type(username);
  }
  setPassword(password: string) {
    cy.get(LOCATORS.PASSWORD_INPUT).first().type(password);
  }
  confirmPassword(password: string) {
    cy.get(LOCATORS.CONFIRM_PASSWORD_INPUT).last().type(password);
  }
  submitButton() {
    cy.get(LOCATORS.Submit_BUTTON).click();
  }
  validateUser(name: string, username: string, role: string, status: string) {
    cy.url({ timeout: 10000 }).should("include", ADMIN_MODULES_URLS.VIEW_USERS);
    cy.get(LOCATORS.LIST_ROW)
      .should("contain", username)
      .and("contain", name)
      .and("contain", role)
      .and("contain", status);
  }

  editUser(name: string, username: string, role: string, status: string) {
    cy.url().should("include", ADMIN_MODULES_URLS.VIEW_USERS);
    cy.contains(LOCATORS.LIST_ROW, username)
      .and("contain", name)
      .and("contain", role)
      .and("contain", status)
      .find(LOCATORS.EDIT_BUTTON)
      .click();
  }
  deleteUser(name: string, username: string, role: string, status: string) {
    cy.url().should("include", ADMIN_MODULES_URLS.VIEW_USERS);
    cy.contains(LOCATORS.LIST_ROW, username)
      .and("contain", name)
      .and("contain", role)
      .and("contain", status)
      .find(LOCATORS.DELETE_BUTTON)
      .click();
    cy.get(LOCATORS.YES_DELETE_BUTTON).contains("Yes, Delete").click();
  }
  validateDeleteUser(
    name: string,
    username: string,
    role: string,
    status: string
  ) {
    cy.get(LOCATORS.TOAST_MESSAGE)
      .should("be.visible")
      .and("contain", SYSTEM_MESSAGES.SUCCESSFULLY_DELETED);

    cy.url().should("include", ADMIN_MODULES_URLS.VIEW_USERS);
    this.enterUsername(username);
    this.selectUserRole(role);
    this.setEmployeeName(name);
    this.selectStatus(status);

    cy.get(LOCATORS.Submit_BUTTON).contains(ADMIN_BUTTONS.SEARCH).click();
    cy.get("span").should("contain", SYSTEM_MESSAGES.NO_RECORDS_FOUND);
    cy.get(LOCATORS.TOAST_MESSAGE)
      .should("be.visible")
      .and("contain", SYSTEM_MESSAGES.NO_RECORDS_FOUND);
  }

  validateEditUserURL() {
    cy.url().should("include", ADMIN_MODULES_URLS.SAVE_USER);
  }
}
export const userManagementPage = new UserManagementPage();
