import LoginPage from "../../support/pages/login-page";

describe("Validate Add New Employee", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
  });

  it.only("TC12 - should add a new employee successfully", () => {
    cy.fixture("employee").then((employee: any) => {
      cy.addEmployee(
        employee.valid.firstName,
        employee.valid.lastName,
        employee.valid.employeeId
      );
    });
  });
});
