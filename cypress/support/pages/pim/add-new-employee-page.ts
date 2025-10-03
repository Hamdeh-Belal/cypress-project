import { APP_MODULES, MODULE_URL_FREG } from "../../enum/modules-enums";
import {
  ADD_EMPLOYEE_ERROR_MESSAGES,
  EMPLOYEE_LIST_TABLE_MESSAGES,
  PIM_BUTTONS,
  PIM_MODULE_FREG,
  PIM_TABS,
} from "../../enum/pim-module-enums";
import { SYSTEM_MESSAGES } from "../../enum/system-enum";

const LOCATORS = {
  UPLOAD_BUTTON: ".employee-image-action",
  UPLOAD_FILE: 'input[type="file"]',
  FIRST_NAME_INPUT: 'input[name="firstName"]',
  MIDDLE_NAME_INPUT: 'input[name="middleName"]',
  LAST_NAME_INPUT: 'input[name="lastName"]',
  CREATE_LOGIN_DETAILS_CHECKBOX: ".oxd-switch-input",
  TOAST_MESSAGE: ".oxd-toast",
  DROPDOWN: ".oxd-select-text--after",
  DROPDOWN_INPUT: ".oxd-select-text-input",
  DROPDOWN_OPTION: ".oxd-select-dropdown",
  LIST_ROW: '[role="row"]',
  SUBMIT_BUTTON: 'button[type="submit"]',
  EMPLOYEE_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  EMPLOYEE_NAME_DROPDOWN: ".oxd-autocomplete-dropdown",
  PASSWORD_INPUT: 'input[type="password"]',
  STATUS_RADIO: "div.oxd-radio-wrapper",
  USERNAME_INPUT: 'input[autocomplete="off"]',
  EMPLOYEE_ID_INPUT: 'input[class="oxd-input oxd-input--active"]',
  DELETE_BUTTON: ".oxd-icon.bi-trash",
  YES_DELETE_BUTTON: "button.oxd-button--label-danger",
  ERROR_FILE: ".oxd-file-input.oxd-input-field-error-message",
  WEAK_PASSWORD: ".orangehrm-password-chip",

  JOIN_DATE: 'input[placeholder="yyyy-dd-mm"]',
  DROP_DOWN: ".oxd-select-dropdown",
  JOB_TITLE: ".oxd-select-option",
};

class PIM_Page {
  navigateToPIM() {
    cy.get("nav").contains(APP_MODULES.PIM).click();
  }
  visitEmployeeDetails(empNumber: number) {
    cy.visit(
      `${MODULE_URL_FREG.PIM}${PIM_MODULE_FREG.JOB_DETAILS}${empNumber}`
    );
  }
  enterJoinDate(date: string) {
    cy.get(LOCATORS.JOIN_DATE).type(date);
    cy.contains(PIM_BUTTONS.CLOSE).click();
  }
  enterJobTitle(title: string) {
    cy.get(LOCATORS.DROPDOWN).first().click();
    cy.get(LOCATORS.DROPDOWN_OPTION)
      .contains(LOCATORS.JOB_TITLE, title)
      .scrollIntoView()
      .should("be.visible")
      .click();
  }
  searchJobTitle(title: string) {
    cy.get(LOCATORS.DROPDOWN).eq(2).click();
    cy.get(LOCATORS.DROPDOWN_OPTION)
      .contains(LOCATORS.JOB_TITLE, title)
      .scrollIntoView()
      .should("be.visible")
      .click();
  }
  goToEmployeeList() {
    cy.get("a").contains(PIM_TABS.EMPLOYEE_LIST).click();
  }
  addNewEmployee() {
    cy.get("a").contains(PIM_TABS.ADD_EMPLOYEE).click();
  }
  uploadPhoto() {
    cy.get(LOCATORS.UPLOAD_BUTTON).click();
    cy.fixture("employee-profile-picture.png", null).as("employee-pic");
    cy.get(LOCATORS.UPLOAD_FILE).selectFile("@employee-pic", { force: true });
  }
  enterFirstName(firstName: string) {
    cy.get(LOCATORS.FIRST_NAME_INPUT).type(firstName);
  }
  enterMiddleName(middleName: string) {
    cy.get(LOCATORS.MIDDLE_NAME_INPUT).type(middleName);
  }
  enterLastName(lastName: string) {
    cy.get(LOCATORS.LAST_NAME_INPUT).type(lastName);
  }
  enterEmployeeId(employeeId: string) {
    cy.get(LOCATORS.EMPLOYEE_ID_INPUT).last().clear().type(employeeId);
  }
  enableCreateLoginDetails() {
    cy.get(LOCATORS.CREATE_LOGIN_DETAILS_CHECKBOX).click();
  }
  enterUsername(username: string) {
    cy.get(LOCATORS.USERNAME_INPUT).first().type(username);
  }
  selectStatus(status: string) {
    cy.get(LOCATORS.STATUS_RADIO).contains(status).click();
  }
  enterPassword(password: string) {
    cy.get(LOCATORS.PASSWORD_INPUT).first().type(password);
  }
  enterConfirmPassword(password: string) {
    cy.get(LOCATORS.PASSWORD_INPUT).last().type(password);
  }
  saveEmployee() {
    cy.get(LOCATORS.SUBMIT_BUTTON).click();
  }

  validateSuccessfullyMessage() {
    cy.get(LOCATORS.TOAST_MESSAGE)
      .should("be.visible")
      .and("contain", SYSTEM_MESSAGES.SUCCESSFULLY_SAVED);
  }
  validateSuccessfullyUpdateMessage() {
    cy.get(LOCATORS.TOAST_MESSAGE)
      .should("be.visible")
      .and("contain", SYSTEM_MESSAGES.SUCCESSFULLY_UPDATED);
  }
  searchName(firstName: string, middleName: string, lastName: string) {
    const fullName = `${firstName} ${middleName} ${lastName}`;
    cy.get(LOCATORS.EMPLOYEE_NAME_INPUT).first().type(fullName);
    cy.get(LOCATORS.EMPLOYEE_NAME_DROPDOWN, { timeout: 10000 })
      .contains(fullName)
      .click();
  }
  searchEmployeeId(employeeId: string) {
    this.enterEmployeeId(employeeId);
  }
  searchStatus(status: string) {
    cy.get(LOCATORS.DROPDOWN).last().click();
    cy.get(LOCATORS.DROPDOWN_INPUT).first().type(status);
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(status).click();
  }
  searchClick() {
    cy.get(LOCATORS.SUBMIT_BUTTON).contains(PIM_BUTTONS.SEARCH).click();
  }
  validateAddedEmployee(
    employeeId: string,
    firstName: string,
    middleName: string,
    lastName: string
  ) {
    cy.get("span").should(
      "contain",
      EMPLOYEE_LIST_TABLE_MESSAGES.ONE_RECORD_FOUND
    );
    cy.get(LOCATORS.LIST_ROW)
      .should("contain", employeeId)
      .and("contain", `${firstName} ${middleName}`)
      .and("contain", lastName);
  }
  validateJobTitle(
    employeeId: string,
    firstName: string,
    middleName: string,
    lastName: string,
    title: string
  ) {
    cy.get(LOCATORS.LIST_ROW)
      .should("contain", employeeId)
      .and("contain", `${firstName} ${middleName}`)
      .and("contain", lastName)
      .and("contain", title);
  }
  deleteUser() {
    cy.get(LOCATORS.DELETE_BUTTON).click();
    cy.get(LOCATORS.YES_DELETE_BUTTON).contains(PIM_BUTTONS.YES_DELETE).click();

    cy.get(LOCATORS.TOAST_MESSAGE)
      .should("be.visible")
      .and("contain", SYSTEM_MESSAGES.SUCCESSFULLY_DELETED);
  }
  uploadInvalidFile() {
    cy.get(LOCATORS.UPLOAD_BUTTON).click();
    cy.fixture("resume.exe", null).as("resume");
    cy.get(LOCATORS.UPLOAD_FILE).selectFile("@resume", { force: true });
  }

  validateErrorFileMessage() {
    cy.contains(ADD_EMPLOYEE_ERROR_MESSAGES.FILE_TYPE_NOT_ALLOWED);
  }
  validateRequiredMessage() {
    cy.should("contain", ADD_EMPLOYEE_ERROR_MESSAGES.REQUIRED);
  }
  validateWeakPassword() {
    cy.get(LOCATORS.WEAK_PASSWORD).should(
      "contain",
      ADD_EMPLOYEE_ERROR_MESSAGES.WEAK
    );
  }
}
export const pimPage = new PIM_Page();
