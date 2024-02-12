class AdminPage {
  sytemUsersFilter(labelText, text) {
    cy.get('label')
      .filter(
        (_, el) =>
          el.textContent.trim().toLowerCase() === labelText.toLowerCase()
      )
      .closest('.oxd-grid-item.oxd-grid-item--gutters')
      .find('input')
      .then(($input) => {
        $input.val('').trigger('change');
      })
      .type(text);
  }

  sytemUsersDropdownFilter(labelText, optionText) {
    cy.get('label')
      .filter(
        (_, el) =>
          el.textContent.trim().toLowerCase() === labelText.toLowerCase()
      )
      .closest('.oxd-grid-item.oxd-grid-item--gutters')
      .find('.oxd-select-wrapper')
      .click(); // Open the dropdown

    // Start a new command line after the potential navigation event
    cy.contains('.oxd-select-text-input', optionText).click();
  }
}

const adminPage = new AdminPage();

describe('User Management/Users', () => {
  beforeEach(() => {
    cy.loginAsUser('Admin');
  });

  it('System Users Filter', () => {
    adminPage.sytemUsersFilter('username', 'waky');
    adminPage.sytemUsersFilter('employee name', 'hilmi');
    // Start a new command line after the potential navigation event
    adminPage.sytemUsersDropdownFilter('status', 'Enabled');
  });
});
