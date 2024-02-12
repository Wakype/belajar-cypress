class MenuUserPage {
  openDropdown() {
    return cy.get('li.oxd-userdropdown').click();
  }

  logoutLink() {
    return cy.get('a.oxd-userdropdown-link[href="/web/index.php/auth/logout"]');
  }

  changePasswordLink() {
    return cy.get(
      'a.oxd-userdropdown-link[href="/web/index.php/pim/updatePassword"]'
    );
  }

  supportLink() {
    return cy.get(
      'a.oxd-userdropdown-link[href="/web/index.php/help/support"]'
    );
  }

  aboutLink() {
    return cy.get('a.oxd-userdropdown-link[href="#"]');
  }
}

class ChangePassword {
  typeIntoPasswordField(labelText, password) {
    return cy
      .get('label')
      .filter(
        (_, el) =>
          el.textContent.trim().toLowerCase() === labelText.toLowerCase()
      )
      .closest('.oxd-input-group')
      .find('input[type="password"]')
      .type(password);
  }
}

const menuUserPage = new MenuUserPage();
const changePasswordPage = new ChangePassword();

describe('Menu User', () => {
  beforeEach(() => {
    cy.loginAsUser();
  });

  it('List menu user', () => {
    menuUserPage.openDropdown();

    menuUserPage.logoutLink().should('contain', 'Logout');
    menuUserPage.changePasswordLink().should('contain', 'Change Password');
    menuUserPage.supportLink().should('contain', 'Support');
    menuUserPage.aboutLink().should('contain', 'About');
  });

  it('About', () => {
    menuUserPage.openDropdown();
    menuUserPage.aboutLink().should('contain', 'About').click();
    cy.get('div.oxd-sheet[role="document"]').should('contain', 'About');
  });

  it('Support', () => {
    menuUserPage.openDropdown();
    menuUserPage.supportLink().click();

    cy.url().should('include', '/help/support');
    cy.get('div.orangehrm-card-container').should(
      'contain',
      'Getting Started with OrangeHRM'
    );
  });

  it('Change Password', () => {
    menuUserPage.openDropdown();
    menuUserPage
      .changePasswordLink()
      .should('contain', 'Change Password')
      .click();
    cy.url().should('include', '/pim/updatePassword');
    cy.get('div.orangehrm-card-container').should('contain', 'Update Password');

    changePasswordPage.typeIntoPasswordField('Current Password', 'admin123');
    changePasswordPage.typeIntoPasswordField('Password', 'wakype');
    changePasswordPage.typeIntoPasswordField('Confirm Password', 'wakype');
  });
});
