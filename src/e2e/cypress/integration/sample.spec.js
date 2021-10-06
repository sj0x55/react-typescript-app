describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('/');
    cy.get('[data-testid=root-container]').should('be.visible');
  });
});
