describe('Succesful path', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') // visit the url where your app is served
  })

  it('Start and end should have red squares', () => {
    // Check the first cell
    cy.get('.board .row:first .cell:first')
      .should('have.class', 'red')

    // Check the last cell
    cy.get('.board .row:last .cell:last')
      .should('have.class', 'red')
  })
})