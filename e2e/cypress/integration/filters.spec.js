describe('Filters', () => {
  it('Ticks only a new filter option and check if only new items are visible', () => {
    cy.intercept('/data/disks?*', { fixture: 'data/disks.json', delay: 500 }).as('getDisks');

    cy.visit('/');
    cy.wait('@getDisks');

    cy.getByTestAttr('usedConditionCheckbox').uncheck();
    cy.getByTestAttr('newConditionCheckbox').check();

    cy.getByTestAttr('dynamicData').within(() => {
      cy.getByDataAttr('condition', 'used').should('have.length', 0);
    });
  });
});
