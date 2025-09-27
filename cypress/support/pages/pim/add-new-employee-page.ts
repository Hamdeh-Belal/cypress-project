import { APP_MODULES } from "../../enum/modules-enums";
import { EMPLOYEE_LIST_TABLE_MESSAGES, PIM_BUTTONS, PIM_TABS } from "../../enum/pim-modules-enums";
import { SYSTEM_MESSAGES } from "../../enum/system-messages-enum";

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
};

class PIM_Page {
  navigateToPIM() {
    cy.get("nav").contains(APP_MODULES.PIM).click();
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
    cy.get(LOCATORS.EMPLOYEE_ID_INPUT)
      .last()
      .clear()
      .type(employeeId);
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
    cy.get("span").should("contain", EMPLOYEE_LIST_TABLE_MESSAGES.ONE_RECORD_FOUND);
    cy.get(LOCATORS.LIST_ROW)
      .should("contain", employeeId)
      .and("contain", `${firstName} ${middleName}`)
      .and("contain", lastName);
  }
}
export const pimPage = new PIM_Page();
