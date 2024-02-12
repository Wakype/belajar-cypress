class DashboardPage {
  urlIncludesDashboardIndex() {
    return cy.url().should('include', '/dashboard/index');
  }

  containsSection(sectionName) {
    return cy.contains(sectionName);
  }
}

const dashboardPage = new DashboardPage();

describe('Dashboard', () => {
  beforeEach(() => {
    cy.loginAsUser();
  });

  it('Login dengan valid credentials', () => {
    dashboardPage.urlIncludesDashboardIndex();
  });

  it('rangkuman beberapa section dashboard', () => {
    dashboardPage.containsSection('My Actions');
    dashboardPage.containsSection('Quick Launch');
    dashboardPage.containsSection('Buzz Latest Posts');
    dashboardPage.containsSection('Employees on Leave Today');
    dashboardPage.containsSection('Employee Distribution by Sub Unit');
    dashboardPage.containsSection('Employee Distribution by Location');
  });
});
