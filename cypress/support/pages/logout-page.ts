import { SYSTEM_MESSAGES, SYSTEM_PROFILE_TAB } from "../enum/system-enum";

const LOCATORS = {
  USER_DROPDOWN: ".oxd-userdropdown",
};

class LogoutPage {
  logout() {
    cy.get(LOCATORS.USER_DROPDOWN).click();
    cy.get("a").contains(SYSTEM_PROFILE_TAB.LOGOUT).click();
  }
}
export const logout = new LogoutPage();
