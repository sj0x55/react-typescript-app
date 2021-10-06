describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('/');
    cy.get('[data-testid=root-container]').should('be.visible');
    cy.get('nav').find('[data-testid=smartphones]').click();
    cy.get('[data-testid=loading]').should('be.visible');
    cy.get('nav').find('[data-testid=other]').click();
    cy.get('[data-testid=loading]').should('be.visible');
  });
});
