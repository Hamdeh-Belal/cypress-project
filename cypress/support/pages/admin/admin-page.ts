import { APP_MODULES } from "../../enum/modules-enums";
import { MODULE_URL_FREG } from "../../enum/modules-enums";
import {
  ADMIN_BUTTONS,
  ADMIN_MODULES_URLS,
} from "../../enum/admin-modules-enums";

const LOCATORS = {
  MainMenu: ".oxd-main-menu-item",
  HeaderH6: ".oxd-topbar-header-breadcrumb h6",
  ADD_BUTTON: "button.oxd-button.oxd-button--medium.oxd-button--secondary",
};

class AdminPage {
  openFromMenu() {
    cy.contains(LOCATORS.MainMenu, APP_MODULES.ADMIN)
      .should("be.visible")
      .click();
  }
  validateURL() {
    cy.url().should("include", MODULE_URL_FREG.ADMIN);
  }
  validateHeader() {
    cy.get(LOCATORS.HeaderH6)
      .should("be.visible")
      .and("contain", APP_MODULES.ADMIN);
  }
  addNewUser() {
    cy.get(LOCATORS.ADD_BUTTON).contains(ADMIN_BUTTONS.ADD).click();
  }
  validateUserAddURL() {
    cy.url().should("include", ADMIN_MODULES_URLS.ADD_USER);
  }
}

export const adminPage = new AdminPage();
