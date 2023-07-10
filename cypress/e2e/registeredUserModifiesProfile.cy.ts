describe('Registered user modifies his profile', () => {
  it('logs into his account and modifies his profile', () => {
    cy.visit('/')
    cy.get('.buttons-layout > :nth-child(2)').click()
    cy.get('#form_item_path_credentials_email').type('dsilvc@uc.cl')  
    cy.get('#form_item_path_credentials_password').type('12345678')
    cy.get('.ant-btn').click()
    cy.get('#editProfile > .ant-btn').click()
    cy.get('#form_item_path_username').type("DiegoSilva")
    cy.get('.ant-btn').click()
    cy.get('.info > :nth-child(9)').should('have.text', 'DiegoSilva')
  })
})