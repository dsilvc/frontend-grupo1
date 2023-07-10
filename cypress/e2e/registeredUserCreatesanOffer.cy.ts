describe('Registered user creates an offer', () => {
  it('logs into his account and creates an offer', () => {
    cy.visit('/')
    cy.get('.buttons-layout > :nth-child(2)').click()
    cy.get('#form_item_path_credentials_email').type('dsilvc@uc.cl')  
    cy.get('#form_item_path_credentials_password').type('12345678')
    cy.get('.ant-btn').click()
    cy.get(':nth-child(1) > .font-work-sans').click()
    cy.get('.ant-col-sm-3 > .ant-btn').click()
    cy.get('#form_item_path_service_type > :nth-child(2) > :nth-child(2)').click()
    cy.get('#form_item_path_service_class_id').click()
    cy.get(':nth-child(5) > .ant-select-item-option-content').click()
    cy.get('#form_item_path_service_price').type('5000')
    cy.get('#form_item_path > .ant-btn').click()
    cy.get(':nth-child(2) > .font-work-sans').click()
    expect(cy.get('.ant-card-body > :nth-child(1)')).to.exist
  })
})