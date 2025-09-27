import {
  ADMIN_Roles,
  ADMIN_STATUS,
} from "../../support/enum/admin-modules-enums";
import { userManagementPage } from "../../support/pages/admin/user-mangment-page";
import LoginPage from "../../support/pages/login-page";

describe("User Management in Admin Module", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
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
    });
  });

  it("TC13 - Validate Edit User Role and status", () => {
    cy.fixture("admin-user").as("adminUser");
    cy.get("@adminUser").then((adminUser: any) => {
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
    });
  });

  it("TC14 - Validate Delete User from the system", () => {
    cy.fixture("admin-user").as("adminUser");
    cy.get("@adminUser").then((adminUser: any) => {
      userManagementPage.goToAdminModule();
      userManagementPage.gotoUserManagement();
      userManagementPage.goToUsers();

      userManagementPage.deleteUser(
        adminUser.valid.name,
        adminUser.valid.username,
        ADMIN_Roles.ESS,
        ADMIN_STATUS.DISABLED
      );
      userManagementPage.validateDeleteUser(
        adminUser.valid.name,
        adminUser.valid.username,
        ADMIN_Roles.ESS,
        ADMIN_STATUS.DISABLED
      );
    });
  });
});
