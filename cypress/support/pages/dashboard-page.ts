const LOCATORS = {
  dashboardFregment: "/dashboard",
};

class DashboardPage {
  isloaded() {
    cy.url().should("include", LOCATORS.dashboardFregment);
  }
}

export const dashboardPage = new DashboardPage();
