class UserManagementPage {
  getLabelByText(text) {
    return cy
      .get('label')
      .filter(
        (_, el) => el.textContent.trim().toLowerCase() === text.toLowerCase()
      );
  }

  sytemUsersFilter(labelText, text) {
    this.getLabelByText(labelText)
      .closest('.oxd-grid-item.oxd-grid-item--gutters')
      .find('input')
      .then(($input) => {
        $input.val('').trigger('change');
      })
      .type(text);
  }

  sytemUsersDropdownFilter(labelText, optionText) {
    this.getLabelByText(labelText)
      .closest('.oxd-grid-item.oxd-grid-item--gutters')
      .find('.oxd-select-wrapper')
      .click();
    cy.get('[role="option"]').contains(optionText).click();
  }

  systemUsersAutoCompleteFilter(labelText, optionText) {
    this.getLabelByText(labelText)
      .closest('.oxd-grid-item.oxd-grid-item--gutters')
      .find('input')
      .then(($input) => {
        $input.val('').trigger('change');
      })
      .type(optionText);

    cy.get('.oxd-autocomplete-dropdown')
      .find('span')
      .should('be.visible')
      .contains(optionText)
      .click();
  }

  validateSystemUsersTable(values) {
    const columnIndices = [1, 2, 3, 4];
    const columnValues = [
      values.username,
      values.userRole,
      values.employeeName,
      values.status,
    ];

    cy.get('.oxd-table-row.oxd-table-row--with-border', {timeout: 15000}).then(($cells) => {
      columnIndices.forEach((index, i) => {
        expect($cells).to.be.visible;
        expect($cells).to.contain(columnValues[i]);
      });
    });
  }
}

const userManagementPage = new UserManagementPage();

describe('System Users Filter', () => {
  beforeEach(() => {
    cy.loginAsUser('Admin');
  });

  it('filter dengan data yang valid', () => {
    cy.fixture('userData').then((data) => {
      userManagementPage.sytemUsersFilter('username', data.checkUser.username);
      userManagementPage.sytemUsersDropdownFilter(
        'user role',
        data.checkUser.userRole
      );
      userManagementPage.systemUsersAutoCompleteFilter(
        'employee name',
        data.checkUser.employeeName
      );
      userManagementPage.sytemUsersDropdownFilter(
        'status',
        data.checkUser.status
      );
      cy.get('[type="submit"]').click();

      userManagementPage.validateSystemUsersTable({
        username: data.checkUser.username,
        userRole: data.checkUser.userRole,
        employeeName: data.checkUser.employeeName,
        status: data.checkUser.status,
      });
    });
  });

  it('filter dengan data yang invalid', () => {
    userManagementPage.sytemUsersFilter('username', 'naveen6541');
    userManagementPage.sytemUsersDropdownFilter('user role', 'ESS');
    userManagementPage.systemUsersAutoCompleteFilter(
      'employee name',
      'Rahul Das'
    );
    userManagementPage.sytemUsersDropdownFilter('status', 'Disabled');
    cy.get('[type="submit"]').click();
    cy.get('span').contains('No Records Found');
  });

  it('reset filter', () => {
    userManagementPage.sytemUsersFilter('username', 'naveen6541');
    userManagementPage.sytemUsersDropdownFilter('user role', 'ESS');
    userManagementPage.systemUsersAutoCompleteFilter(
      'employee name',
      'Rahul Das'
    );
    userManagementPage.sytemUsersDropdownFilter('status', 'Disabled');
    cy.get('[type="button"]').contains('Reset').click();
  });

  it('filter dengan data yang kosong', () => {
    cy.get('[type="submit"]').click();
  });
});
