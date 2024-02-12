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
      .click();
    cy.get('[role="option"]').contains(optionText).click();
  }

  systemUsersAutoCompleteFilter(labelText, optionText) {
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
      .type(optionText);

    // Refined selector and wait for visibility
    cy.get('.oxd-autocomplete-dropdown')
      .find('span')
      .should('be.visible')
      .contains(optionText)
      .click();
  }
}

const adminPage = new AdminPage();

describe('System Users Filter', () => {
  beforeEach(() => {
    cy.loginAsUser('Admin');
  });

  it('filter dengan data yang valid', () => {
    adminPage.sytemUsersFilter('username', 'Pappu');
    adminPage.sytemUsersDropdownFilter('user role', 'Admin');
    adminPage.systemUsersAutoCompleteFilter('employee name', 'Odis Adalwin');
    adminPage.sytemUsersDropdownFilter('status', 'Enabled');
    cy.get('[type="submit"]').click();
  });
  it('filter dengan data yang invalid', () => {
    adminPage.sytemUsersFilter('username', 'naveen6541');
    adminPage.sytemUsersDropdownFilter('user role', 'ESS');
    adminPage.systemUsersAutoCompleteFilter('employee name', 'Rahul Das');
    adminPage.sytemUsersDropdownFilter('status', 'Disabled');
    cy.get('[type="submit"]').click();
  });
  it('filter dengan data yang kosong', () => {
    cy.get('[type="submit"]').click();
  });
});

// <div role="listbox" class="oxd-autocomplete-dropdown --positon-bottom" data-v-3ebc98ba="" data-v-390abb6d=""><div role="option" class="oxd-autocomplete-option" data-v-da59eaf4="" data-v-390abb6d=""><span data-v-08ed484c="">Odis  Adalwin</span><!----><!----></div></div>
