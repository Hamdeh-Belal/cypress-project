import { ICreatePIMUserRequest } from "../../support/apis/payload/create-pim-user-request-interface";
import { IDeleteUserRequest } from "../../support/apis/payload/delete-user-request-interface";
import { UserHelper } from "../../support/helper/create-user-helper";
import { recruitmentHelper } from "../../support/helper/recruitment-helper";
import LoginPage from "../../support/pages/login-page";
import { pimPage } from "../../support/pages/pim/add-new-employee-page";

describe("Edit Employee (PIM User) details", () => {
  let emp_Number: number;
  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    cy.fixture("employee-user-details").as("details");
    cy.get("@details").then((details: any) => {
      const payload: ICreatePIMUserRequest = {
        empPicture: null,
        employeeId: details.valid.employeeId,
        firstName: details.valid.firstName,
        lastName: details.valid.lastName,
        middleName: details.valid.middleName,
      };

      UserHelper.createPIMUser(payload).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(`Response body: ${JSON.stringify(response.body)}`);
        emp_Number = response.body.data.empNumber;

        cy.log(`Employee created with empNumber: ${emp_Number}`);
        cy.log(`body is: ${JSON.stringify(response.body)}`);
      });
    });
  });

  afterEach(() => {
    const body: IDeleteUserRequest = { ids: [emp_Number] };
    UserHelper.deletePIMUser(body).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Employee deleted with empNumber: ${emp_Number}`);
    });
  });

  it("TC20 - Assign Job Details", () => {
    cy.fixture("employee-user-details").as("details");
    cy.get("@details").then((details: any) => {
      pimPage.visitEmployeeDetails(emp_Number);
      pimPage.enterJoinDate(details.valid.joinDate);
      pimPage.enterJobTitle(details.valid.title);
      pimPage.saveEmployee();

      pimPage.validateSuccessfullyUpdateMessage();
      pimPage.navigateToPIM();
      pimPage.goToEmployeeList();
      pimPage.searchJobTitle(details.valid.title);
      pimPage.searchEmployeeId(details.valid.employeeId);
      pimPage.searchClick();
      pimPage.validateJobTitle(
        details.valid.employeeId,
        details.valid.firstName,
        details.valid.middleName,
        details.valid.lastName,
        details.valid.title
      );
    });
  });
});
