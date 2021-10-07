describe('My First Test', () => {
  it('Visits each page', () => {
    cy.intercept('/data/disks?*', { fixture: 'data/disks.json', delay: 500 }).as('getDisks');
    cy.intercept('/data/smartphones?*', { fixture: 'data/smartphones.json', delay: 500 }).as('getSmartphones');
    cy.intercept('/data/something?*', { fixture: 'data/something.json', delay: 500 }).as('getSomething');

    cy.visit('/');
    cy.wait('@getDisks');
    cy.get('[data-testid=root-container]').should('be.visible');
    cy.get('[data-testid=testid0-6]').contains('used');
    cy.get('[data-testid=testid0-7]').contains('WD 4 TB Elements Portable External Hard Drive - Used');

    cy.get('nav').find('[data-testid=smartphones]').click();
    cy.get('[data-testid=loading]').should('be.visible');
    cy.get('[data-testid=testid0-5]').contains('used');
    cy.get('[data-testid=testid0-6]').contains('OnePlus 8T 5G 8GB RAM 128GB - Used');
    cy.wait('@getSmartphones');

    cy.get('nav').find('[data-testid=other]').click();
    cy.get('[data-testid=loading]').should('be.visible');
    cy.get('[data-testid=testid0-4]').contains('used');
    cy.get('[data-testid=testid0-5]').contains(
      'Crucial Ballistix RGB BL2K32G32C16U4BL 3200 MHz, 64GB (32GB x2) - Used',
    );
    cy.wait('@getSomething');
  });
});
