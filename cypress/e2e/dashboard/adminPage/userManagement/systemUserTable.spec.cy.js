class AddSystemUserPage {
  getLabelByText(text) {
    return cy
      .get('label')
      .filter(
        (_, el) => el.textContent.trim().toLowerCase() === text.toLowerCase()
      );
  }

  sytemUsersFilter(labelText, text) {
    this.getLabelByText(labelText)
      .closest('.oxd-input-group.oxd-input-field-bottom-space')
      .find('input')
      .then(($input) => {
        $input.val('').trigger('change');
      })
      .type(text);
  }

  sytemUsersDropdownFilter(labelText, optionText) {
    this.getLabelByText(labelText)
      .closest('.oxd-input-group.oxd-input-field-bottom-space')
      .find('.oxd-select-wrapper')
      .click();
    cy.get('[role="option"]').contains(optionText).click();
  }

  systemUsersAutoCompleteFilter(labelText, optionText) {
    this.getLabelByText(labelText)
      .closest('.oxd-input-group.oxd-input-field-bottom-space')
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

    cy.get('.oxd-table-row.oxd-table-row--with-border', {
      timeout: 15000,
    }).then(($cells) => {
      columnIndices.forEach((index, i) => {
        expect($cells).to.be.visible;
        expect($cells).to.contain(columnValues[i]);
      });
    });
  }
}

const addSystemUserPage = new AddSystemUserPage();

describe('Add User', () => {
  beforeEach(() => {
    cy.loginAsUser('Admin');
    cy.get('button.oxd-button[type="button"]').contains('Add').click();
  });

  it('tidak memasukkan data', () => {
    cy.get('[type="submit"]').click();
    cy.get('span.oxd-input-field-error-message').should('contain', 'Required');
    cy.get('span.oxd-input-field-error-message').should(
      'contain',
      'Passwords do not match'
    );
  });

  it('Add user dengan data yang valid', () => {
    cy.fixture('userData').then((data) => {
      addSystemUserPage.sytemUsersFilter('username', data.createUser.username);
      addSystemUserPage.sytemUsersFilter('password', data.createUser.password);
      addSystemUserPage.sytemUsersFilter(
        'confirm password',
        data.createUser.password
      );
      addSystemUserPage.sytemUsersDropdownFilter(
        'user role',
        data.createUser.userRole
      );
      addSystemUserPage.systemUsersAutoCompleteFilter(
        'employee name',
        data.createUser.employeeName
      );
      addSystemUserPage.sytemUsersDropdownFilter(
        'status',
        data.createUser.status
      );
      cy.get('[type="submit"]').click();

      addSystemUserPage.validateSystemUsersTable({
        username: data.createUser.username,
        userRole: data.createUser.userRole,
        employeeName: data.createUser.employeeName,
        status: data.createUser.status,
      });
    });
  });

  it('cancel add user', () => {
    cy.fixture('userData').then((data) => {
      addSystemUserPage.sytemUsersFilter('username', data.createUser.username);
      addSystemUserPage.sytemUsersFilter('password', data.createUser.password);
      addSystemUserPage.sytemUsersFilter(
        'confirm password',
        data.createUser.password
      );
      addSystemUserPage.sytemUsersDropdownFilter(
        'user role',
        data.createUser.userRole
      );
      addSystemUserPage.systemUsersAutoCompleteFilter(
        'employee name',
        data.createUser.employeeName
      );
      addSystemUserPage.sytemUsersDropdownFilter(
        'status',
        data.createUser.status
      );
    });

    cy.get('[type="button"]').contains('Cancel').click();
  });
});

describe('Systems Users Action', () => {
  beforeEach(() => {
    cy.loginAsUser('Admin');
  });

  it('delete action button', () => {
    cy.contains('.oxd-table-row', 'rahul')
      .find('.oxd-icon-button.oxd-table-cell-action-space:has(.bi-trash)')
      .click();

    cy.get('.oxd-sheet[role="document"]').within(() => {
      cy.get('[type="button"]').contains('Yes, Delete').click();
    });

    cy.contains('.oxd-table-row', 'rahul').should('not.exist');
  });
});
