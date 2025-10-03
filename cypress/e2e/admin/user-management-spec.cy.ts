import { ICreatePIMUserRequest } from "../../support/apis/payload/create-pim-user-request-interface";
import { ICreateSystemUserRequest } from "../../support/apis/payload/create-system-user-request-interface";
import { IDeleteUserRequest } from "../../support/apis/payload/delete-user-request-interface";
import {
  ADMIN_Roles,
  ADMIN_STATUS,
} from "../../support/enum/admin-module-enums";
import { UserHelper } from "../../support/helper/create-user-helper";
import { userManagementPage } from "../../support/pages/admin/user-management-page";
import LoginPage from "../../support/pages/login-page";

describe("User Management in Admin Module", () => {
  let emp_Number: number;
  let user_id: number;
  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
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
        middleName: "",
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
  it("TC11 - Validate Add New System User (Admin Role)", () => {
    cy.fixture("admin-user").as("adminUser");
    cy.get("@adminUser").then((adminUser: any) => {
      userManagementPage.goToAdminModule();
      userManagementPage.gotoUserManagement();
      userManagementPage.goToUsers();

      userManagementPage.addNewUser();
      userManagementPage.validateURL();
      userManagementPage.selectUserRole(ADMIN_Roles.ADMIN);
      userManagementPage.selectStatus(ADMIN_STATUS.ENABLED);
      userManagementPage.setEmployeeName(adminUser.valid.name);
      userManagementPage.setUsername(adminUser.valid.username);
      userManagementPage.setPassword(adminUser.valid.password);
      userManagementPage.confirmPassword(adminUser.valid.password);
      userManagementPage.submitButton();
      userManagementPage.validateUser(
        adminUser.valid.name,
        adminUser.valid.username,
        ADMIN_Roles.ADMIN,
        ADMIN_STATUS.ENABLED
      );
    });
  });

  it("TC12 - Validate User Search by Username, Role, name and status", () => {
    cy.fixture("admin-user").as("adminUser");
    cy.get("@adminUser").then((adminUser: any) => {
      const payload: ICreateSystemUserRequest = {
        username: adminUser.valid.username,
        password: adminUser.valid.password,
        status: true,
        userRoleId: 1,
        empNumber: emp_Number,
      };
      UserHelper.createSystemUser(payload)
        .then((response) => {
          expect(response.status).to.eq(200);
          user_id = response.body.data.id;
          cy.log(
            `user id ${user_id}  Employee created with empNumber: ${emp_Number}  and the response body is: ${JSON.stringify(
              response.body
            )}`
          );
        })
        .then(() => {
          userManagementPage.goToAdminModule();
          userManagementPage.gotoUserManagement();
          userManagementPage.goToUsers();
          userManagementPage.enterUsername(adminUser.valid.username);
          userManagementPage.selectUserRole(ADMIN_Roles.ADMIN);
          userManagementPage.setEmployeeName(adminUser.valid.name);
          userManagementPage.selectStatus(ADMIN_STATUS.ENABLED);

          userManagementPage.submitButton();
          userManagementPage.validateUser(
            adminUser.valid.name,
            adminUser.valid.username,
            ADMIN_Roles.ADMIN,
            ADMIN_STATUS.ENABLED
          );

          const body: IDeleteUserRequest = { ids: [user_id] };
          UserHelper.deleteSystemUser(body).then((response2) => {
            expect(response2.status).to.eq(200);

            cy.log(` body is: ${JSON.stringify(response2.body)}`);
          });
        });
    });
  });

  it("TC13 - Validate Edit User Role and status", () => {
    cy.fixture("admin-user").as("adminUser");
    cy.get("@adminUser").then((adminUser: any) => {
      const payload: ICreateSystemUserRequest = {
        username: adminUser.valid.username,
        password: adminUser.valid.password,
        status: true,
        userRoleId: 1,
        empNumber: emp_Number,
      };
      UserHelper.createSystemUser(payload)
        .then((response) => {
          expect(response.status).to.eq(200);
          user_id = response.body.data.id;
          cy.log(
            `user id ${user_id}  Employee created with empNumber: ${emp_Number}  and the response body is: ${JSON.stringify(
              response.body
            )}`
          );
        })
        .then(() => {
          userManagementPage.goToAdminModule();
          userManagementPage.gotoUserManagement();
          userManagementPage.goToUsers();

          userManagementPage.editUser(
            adminUser.valid.name,
            adminUser.valid.username,
            ADMIN_Roles.ADMIN,
            ADMIN_STATUS.ENABLED
          );
          userManagementPage.validateEditUserURL();
          userManagementPage.selectUserRole(ADMIN_Roles.ESS);
          userManagementPage.selectStatus(ADMIN_STATUS.DISABLED);
          userManagementPage.submitButton();
          userManagementPage.validateUser(
            adminUser.valid.name,
            adminUser.valid.username,
            ADMIN_Roles.ESS,
            ADMIN_STATUS.DISABLED
          );

          const body: IDeleteUserRequest = { ids: [user_id] };
          UserHelper.deleteSystemUser(body).then((response2) => {
            expect(response2.status).to.eq(200);

            cy.log(` body is: ${JSON.stringify(response2.body)}`);
          });
        });
    });
  });

  it("TC14 - Validate Delete User from the system", () => {
    cy.fixture("admin-user").as("adminUser");
    cy.get("@adminUser").then((adminUser: any) => {
      const payload: ICreateSystemUserRequest = {
        username: adminUser.valid.username,
        password: adminUser.valid.password,
        status: true,
        userRoleId: 1,
        empNumber: emp_Number,
      };
      UserHelper.createSystemUser(payload).then((response) => {
        expect(response.status).to.eq(200);
        user_id = response.body.data.id;
        cy.log(
          `user id ${user_id}  Employee created with empNumber: ${emp_Number}  and the response body is: ${JSON.stringify(
            response.body
          )}`
        );
      });
      cy.log(`Employee created with empNumber: ${emp_Number} `);

      userManagementPage.goToAdminModule();
      userManagementPage.gotoUserManagement();
      userManagementPage.goToUsers();

      userManagementPage.deleteUser(
        adminUser.valid.name,
        adminUser.valid.username,
        ADMIN_Roles.ADMIN,
        ADMIN_STATUS.ENABLED
      );
      userManagementPage.validateDeleteUser(
        adminUser.valid.name,
        adminUser.valid.username,
        ADMIN_Roles.ADMIN,
        ADMIN_STATUS.ENABLED
      );
    });
  });
});
