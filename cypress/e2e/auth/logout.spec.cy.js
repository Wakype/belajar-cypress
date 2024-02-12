class LogoutPage {
  logout() {
    cy.get('li.oxd-userdropdown').click();
    cy.get(
      'a.oxd-userdropdown-link[href="/web/index.php/auth/logout"]'
    ).click();
  }
}

const logoutPage = new LogoutPage();

describe('Logout', () => {
  it('Logout', () => {
    cy.loginAsUser();
    logoutPage.logout();
  });
});
