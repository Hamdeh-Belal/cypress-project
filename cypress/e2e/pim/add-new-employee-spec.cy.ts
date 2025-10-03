import { EMPLOYEE_STATUS } from "../../support/enum/pim-module-enums";
import LoginPage from "../../support/pages/login-page";
import { pimPage } from "../../support/pages/pim/add-new-employee-page";

describe("Validate Add New Employee", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
    pimPage.navigateToPIM();
  });

  it("TC15 - Add Employee with Photo & Login Details", () => {
    cy.fixture("employee-user").then((employee: any) => {
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
      pimPage.deleteUser();
    });
  });

  it.only("TC16 - Add Employee Validation Errors", () => {
    cy.fixture("employee-user").then((employee: any) => {
      pimPage.addNewEmployee();

      pimPage.enterMiddleName(employee.valid.middleName);
      pimPage.enterLastName(employee.valid.lastName);
      pimPage.enterEmployeeId(employee.valid.employeeId);
      pimPage.saveEmployee();
      pimPage.uploadInvalidFile();

      pimPage.enableCreateLoginDetails();
      pimPage.enterUsername(employee.valid.username);
      pimPage.selectStatus(EMPLOYEE_STATUS.ENABLED);
      pimPage.enterPassword(employee.invalid.weakPassword);
      pimPage.enterConfirmPassword(employee.invalid.weakPassword);
      pimPage.saveEmployee();

      pimPage.validateErrorFileMessage();
      pimPage.validateWeakPassword();
    });
  });
});
