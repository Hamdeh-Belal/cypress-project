import { EMPLOYEE_STATUS } from "../../support/enum/pim-modules-enums";
import LoginPage from "../../support/pages/login-page";
import { pimPage } from "../../support/pages/pim/add-new-employee-page";

describe("Validate Add New Employee", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
  });

  /*it.only("TC12 - should add a new employee successfully", () => {
    cy.fixture("employee").then((employee: any) => {
      cy.addEmployee(
        employee.valid.firstName,
        employee.valid.lastName,
        employee.valid.employeeId
      );
    });
  });
  */

  it("TC15 - Add Employee with Photo & Login Details", () => {
    cy.fixture("employee-user").then((employee: any) => {
      pimPage.navigateToPIM();
      pimPage.addNewEmployee();
      pimPage.uploadPhoto();
      pimPage.enterFirstName(employee.valid.firstName);
      pimPage.enterMiddleName(employee.valid.middleName);
      pimPage.enterLastName(employee.valid.lastName);
      pimPage.enterEmployeeId(employee.valid.employeeId);
      pimPage.enableCreateLoginDetails();
      pimPage.enterUsername(employee.valid.username);
      pimPage.selectStatus(EMPLOYEE_STATUS.ENABLED);
      pimPage.enterPassword(employee.valid.password);
      pimPage.enterConfirmPassword(employee.valid.password);
      pimPage.saveEmployee();
      pimPage.validateSuccessfullyMessage();
      pimPage.goToEmployeeList();
      pimPage.searchName(
        employee.valid.firstName,
        employee.valid.middleName,
        employee.valid.lastName
      );
      pimPage.searchEmployeeId(employee.valid.employeeId);
      pimPage.searchClick();
      pimPage.validateAddedEmployee(
        employee.valid.employeeId,
        employee.valid.firstName,
        employee.valid.middleName,
        employee.valid.lastName
      );
    });
  });
});
