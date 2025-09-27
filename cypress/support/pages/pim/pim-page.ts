import { MODULE_URL_FREG } from "../../enum/modules-enums";

const LOCATORS = {
  firstName: 'input[name="firstName"]',
  lastName: 'input[name="lastName"]',
  employeeId: 'input[class="oxd-input oxd-input--active"]',
  submitBtn: 'button[type="submit"]',
};

const URLS = {
  addEmployee: `${MODULE_URL_FREG.PIM}/addEmployee`,
  viewPersonalDetails: `${MODULE_URL_FREG.PIM}/viewPersonalDetails/`,
};

class PimPage {
  visitAddEmployee() {
    cy.visit(URLS.addEmployee);
  }

  fillEmployeeForm(firstName: string, lastName: string, employeeId: string) {
    cy.get(LOCATORS.firstName).type(firstName);
    cy.get(LOCATORS.lastName).type(lastName);
    cy.get(LOCATORS.employeeId).first().clear().type(employeeId);
  }
  submitForm() {
    cy.get(LOCATORS.submitBtn).click();
  }
  assertEmployeeAdded(firstName: string, lastName: string) {
    cy.url().should("include", URLS.viewPersonalDetails);
    cy.contains(`${firstName} ${lastName}`).should("be.visible");
  }
}
export default new PimPage();
