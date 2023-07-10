describe('Registered user visits page', () => {
  it('logs into his account and goes throughh the website', () => {
    cy.visit('/')
    cy.get('.buttons-layout > :nth-child(2)').click()
    cy.get('#form_item_path_credentials_email').type('dsilvc@uc.cl')  
    cy.get('#form_item_path_credentials_password').type('12345678')
    cy.get('.ant-btn').click()
    cy.get(':nth-child(1) > .font-work-sans').click()
    cy.get(':nth-child(2) > .font-work-sans').click()
    cy.get(':nth-child(3) > .font-work-sans').click()
    cy.get(':nth-child(4) > .font-work-sans').click()
    cy.get('[href="/user/profile"]').click()
    cy.get('[href="/"]').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})