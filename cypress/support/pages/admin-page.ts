import { APP_MODULES } from "../enum/modules-enums";
import { MODULE_URL_FREG } from "../enum/modules-enums";

const LOCATORS = {
  MainMenu: ".oxd-main-menu-item",
  HeaderH6: ".oxd-topbar-header-breadcrumb h6",
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
}

export default new AdminPage();
