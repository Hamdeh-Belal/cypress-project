import { ICreatePIMUserRequest } from "../../support/apis/payload/create-pim-user-request-interface";
import { ICreateSystemUserRequest } from "../../support/apis/payload/create-system-user-request-interface";
import { IDeleteUserRequest } from "../../support/apis/payload/delete-user-request-interface";
import { UserHelper } from "../../support/helper/create-user-helper";
import { leavePage } from "../../support/pages/leave/leave-page";
import loginPage from "../../support/pages/login-page";

describe("User Leave", () => {
  let emp_Number: number;
  let user_id: number;

  beforeEach(() => {
    cy.fixture("users").as("users");
    loginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    cy.fixture("admin-user").as("adminUser");
    cy.get("@adminUser").then((adminUser: any) => {
      const payload: ICreatePIMUserRequest = {
        empPicture: null,
        employeeId: adminUser.valid.employeeId,
        firstName: adminUser.valid.firstName,
        lastName: adminUser.valid.lastName,
        middleName: adminUser.valid.middleName,
      };

      UserHelper.createPIMUser(payload)
        .then((response) => {
          expect(response.status).to.eq(200);
          cy.log(`Response body: ${JSON.stringify(response.body)}`);
          emp_Number = response.body.data.empNumber;

          cy.log(`Employee created with empNumber: ${emp_Number}`);
          cy.log(`body is: ${JSON.stringify(response.body)}`);
        })
        .then(() => {
          const payload2: ICreateSystemUserRequest = {
            username: adminUser.valid.username,
            password: adminUser.valid.password,
            status: true,
            userRoleId: 1,
            empNumber: emp_Number,
          };
          UserHelper.createSystemUser(payload2).then((response2) => {
            expect(response2.status).to.eq(200);
            user_id = response2.body.data.id;
            cy.log(
              `user id ${user_id}  Employee created with empNumber: ${emp_Number}  and the response body is: ${JSON.stringify(
                response2.body
              )}`
            );
          });
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

  it("TC17 - Employee Applies, Admin Approves, Employee Checks Status", () => {
    cy.fixture("users").as("users");
    cy.get("@users").then((users: any) => {
      cy.fixture("admin-user").as("adminUser");
      cy.get("@adminUser").then((adminUser: any) => {
        const employeeName = `${adminUser.valid.firstName} ${adminUser.valid.middleName} ${adminUser.valid.lastName}`;

        leavePage.navigateToLeave();
        leavePage.clickEntitlementsTab();
        leavePage.selecAddEntitlements();
        leavePage.typeEmployeeName(employeeName);
        leavePage.selectLeaveType();
        leavePage.typeEntitlement(adminUser.leave.leaveBalance);
        leavePage.save();
        leavePage.confirm();

        cy.logout();
        cy.login(adminUser.valid.username, adminUser.valid.password);
        leavePage.navigateToLeave();
        leavePage.applyLeave();
        cy.logout();

        loginPage.visit();
        cy.login(users.valid.username, users.valid.password);

        leavePage.navigateToLeave();
        leavePage.approve();

        cy.logout();
        cy.login(adminUser.valid.username, adminUser.valid.password);
        leavePage.navigateToLeave();
        leavePage.goToMyLeave();
        leavePage.verifyRecord(employeeName, adminUser.leave.leaveBalance);

        cy.logout();
        cy.login(users.valid.username, users.valid.password);
      });
    });
  });
});
