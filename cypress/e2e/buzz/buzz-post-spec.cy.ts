import { ICreatePIMUserRequest } from "../../support/apis/payload/create-pim-user-request-interface";
import { ICreateSystemUserRequest } from "../../support/apis/payload/create-system-user-request-interface";
import { IDeleteUserRequest } from "../../support/apis/payload/delete-user-request-interface";
import { UserHelper } from "../../support/helper/create-user-helper";
import { buzzPage } from "../../support/pages/buzz/buzz-page";
import loginPage from "../../support/pages/login-page";

describe("Add Post", () => {
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
    });
  });

  afterEach(() => {
    cy.logout();
    cy.fixture("users").as("users");
    loginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
    const body: IDeleteUserRequest = { ids: [emp_Number] };
    UserHelper.deletePIMUser(body).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Employee deleted with empNumber: ${emp_Number}`);
    });
  });

  it("TC18 - User Adds a New Post", () => {
    cy.logout();
    cy.fixture("admin-user").as("adminUser");
    cy.get("@adminUser").then((adminUser: any) => {
      loginPage.visit();
      cy.login(adminUser.valid.username, adminUser.valid.password);
    });
    buzzPage.visitBuzzPage();
    buzzPage.writePost();
    buzzPage.clickPost();
    buzzPage.verifyMsg();
    buzzPage.visitBuzzPage();
    buzzPage.verifyPost();
  });
});
