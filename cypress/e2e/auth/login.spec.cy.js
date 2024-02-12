class LoginPage {
  visit() {
    cy.visit('/web/index.php/auth/login');
  }

  forgotPasswordLink() {
    return cy.contains('Forgot your password?');
  }

  submitButton() {
    return cy.get('[type="submit"]');
  }

  usernameField() {
    return cy.get('[name="username"]');
  }

  passwordField() {
    return cy.get('[name="password"]');
  }
}

const loginPage = new LoginPage();

describe('Login', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('Lupa password', () => {
    loginPage.forgotPasswordLink().click();
    loginPage.usernameField().type('Admin');
    loginPage.submitButton().click();
    cy.contains('Reset Password link sent successfully');
  });

  it('Login dengan invalid credentials', () => {
    loginPage.submitButton().click();
    cy.contains('Required');

    loginPage.usernameField().type('waky');
    loginPage.passwordField().type('wakype12345');
    loginPage.submitButton().click();
    cy.contains('Invalid credentials');
  });

  it('Login dengan valid credentials', () => {
    loginPage.usernameField().type('Admin');
    loginPage.passwordField().type('admin123');
    loginPage.submitButton().click();

    cy.url().should('not.include', '/auth/login');
  });
});
