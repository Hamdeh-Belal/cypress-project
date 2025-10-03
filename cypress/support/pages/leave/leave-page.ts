import {
  LEAVE_BUTTONS,
  LEAVE_OPTION,
  LEAVE_TAB,
} from "../../enum/leave-module-enums";
import { APP_MODULES } from "../../enum/modules-enums";
import { SYSTEM_MESSAGES } from "../../enum/system-enum";

const LOCATORS = {
  ENTITLEMENTS: ".oxd-topbar-body-nav-tab-item",
  ADD_TAB: ".oxd-topbar-body-nav-tab-link",
  EMPLOYEE_NAME: "input[placeholder='Type for hints...']",
  SEARCHED_EMPLOYEE_NAME: "div[role='listbox'].oxd-autocomplete-dropdown",
  LEAVE_TYPE: ".oxd-select-text-input",
  LEAVE_DROPDOWN: ".oxd-select-text--after",
  LEAVE_TAB: ".oxd-select-dropdown .oxd-select-option",
  ADD_ENTITLEMENTS: "input[class='oxd-input oxd-input--active']",
  SAVE_BTN: "button[type='submit']",
  CONFIRM_BTN: "button.oxd-button--secondary.orangehrm-button-margin",
  LOG_OUT_BTN: ".oxd-userdropdown-tab",
  APPLY_TAB: ".oxd-topbar-body-nav-tab-item",
  DATE: "input[placeholder='yyyy-dd-mm']",
  APPROVE_BTN:
    "button.oxd-button.oxd-button--medium.oxd-button--label-success.oxd-table-cell-action-space",
  TABLE_CELL: '.oxd-table-cell[role="cell"]',
  TABLE_ROW: ".oxd-table-row--with-border",
};

class LeavePage {
  navigateToLeave() {
    cy.get("nav").contains(APP_MODULES.LEAVE).click();
  }

  clickEntitlementsTab() {
    cy.get(LOCATORS.ENTITLEMENTS).contains(LEAVE_TAB.ENTITLEMENTS).click();
  }
  selecAddEntitlements() {
    cy.get(LOCATORS.ADD_TAB).contains(LEAVE_TAB.ADD_ENTITLEMENTS).click();
  }
  typeEmployeeName(employeeName: string) {
    cy.get(LOCATORS.EMPLOYEE_NAME).clear().type(employeeName);
    cy.get(LOCATORS.SEARCHED_EMPLOYEE_NAME).contains(employeeName).click();
  }

  selectLeaveType() {
    cy.get(LOCATORS.LEAVE_DROPDOWN).first().click();
    cy.contains(LOCATORS.LEAVE_TAB, LEAVE_OPTION.LEAVE_TYPE).click();
  }

  typeEntitlement(leaveBalance: string) {
    cy.get(LOCATORS.ADD_ENTITLEMENTS).last().type(leaveBalance);
  }

  save() {
    cy.get(LOCATORS.SAVE_BTN).click();
  }
  confirm() {
    cy.get(LOCATORS.CONFIRM_BTN).contains(LEAVE_BUTTONS.CONFIRM).click();

    cy.contains(SYSTEM_MESSAGES.SUCCESSFULLY_SAVED);
  }

  applyLeave() {
    cy.get(LOCATORS.APPLY_TAB).contains(LEAVE_BUTTONS.APPLY).click();

    cy.get(LOCATORS.LEAVE_DROPDOWN).click();
    cy.contains(LOCATORS.LEAVE_TAB, LEAVE_OPTION.LEAVE_TYPE).click();

    cy.get(LOCATORS.DATE).first().clear().type(LEAVE_OPTION.DATE_FROM);
    cy.get(LOCATORS.DATE).last().clear().type(LEAVE_OPTION.DATE_AFTER);
    cy.contains(LEAVE_BUTTONS.CLOSE).click();

    cy.get(LOCATORS.SAVE_BTN).click();

    cy.contains(SYSTEM_MESSAGES.SUCCESSFULLY_SAVED);
  }

  approve() {
    cy.get(LOCATORS.APPROVE_BTN).contains(LEAVE_BUTTONS.APPROVE).click();

    cy.contains(SYSTEM_MESSAGES.SUCCESSFULLY_UPDATED);
  }
  goToMyLeave() {
    cy.get("a").contains(LEAVE_TAB.MY_LEAVE).click();
  }
  verifyRecord(employeeName: string, leaveBalance: string) {
    cy.contains(LOCATORS.TABLE_CELL, employeeName)
      .closest(LOCATORS.TABLE_ROW)
      .within(() => {
        cy.contains(LEAVE_OPTION.LEAVE_PERIOD).should("be.visible");
        cy.contains(LEAVE_OPTION.LEAVE_TYPE).should("be.visible");
        cy.contains(leaveBalance).should("be.visible");
        cy.contains(LEAVE_BUTTONS.CANCEL).should("be.visible");
      });
  }
}
export const leavePage = new LeavePage();
