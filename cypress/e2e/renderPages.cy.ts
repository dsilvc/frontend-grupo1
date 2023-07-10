describe('Renders different pages', () => {

  it('Renders landing page and goes to login', () => {
    cy.visit('/')
    cy.get(':nth-child(2) > a > .ant-btn > span').click()
    cy.url().should('eq', 'http://localhost:3000/session')
  })

  it('Renders info page and goes to landing', () => {
    cy.visit('/info')
    cy.get(':nth-child(1) > a > .ant-btn > span').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('Renders signin and completes form', () => {
    cy.visit('/session')
    cy.get('[href="/session/signin"] > p').click()
    cy.get('#form_item_path_user_credentials_email').type('test3@uc.cl')
    cy.get('#form_item_path_user_credentials_password').type('testpassword')
    cy.get('#form_item_path_user_passwordConfirm').type('testpassword')
    cy.get('#form_item_path_user_userInformation_firstName').type('testUser')
    cy.get('#form_item_path_user_userInformation_lastName').type('example')
    cy.get('#form_item_path_user_userInformation_username').type('testUserExample3')
    cy.get('.ant-btn').click()
    cy.url().should('eq', 'http://localhost:3000/session/signin')
  })

  it('Renders login and completes form', () => {
    cy.visit('/session')
    cy.get('#form_item_path_credentials_email').type('dsilvc@uc.cl')  
    cy.get('#form_item_path_credentials_password').type('12345678')
    cy.url().should('eq', 'http://localhost:3000/session')
  })

  it('Renders user profile', () => {
    cy.visit('/user/profile')
    cy.url().should('eq', 'http://localhost:3000/user/profile')
  })

  it('Renders ExplorarClases page', () => {
    cy.visit('main/ExplorarClases')
    cy.url().should('eq', 'http://localhost:3000/main/ExplorarClases')
  })

  it('Renders MisOfertas page', () => {
    cy.visit('main/MisServicios')
    cy.url().should('eq', 'http://localhost:3000/main/MisServicios')
  })

  it('Renders Historial page', () => {
    cy.visit('main/Historial')
    cy.url().should('eq', 'http://localhost:3000/main/Historial')
    
  })

  it('Renders editProfile page', () => {
    cy.visit('user/editProfile')
    cy.url().should('eq', 'http://localhost:3000/user/editProfile')
  })

  it('Renders pswConfirmation page', () => {
    cy.visit('user/confirmation')
    cy.url().should('eq', 'http://localhost:3000/user/confirmation')
  })
  
  it('Renders changePsw page', () => {
    cy.visit('user/changePassword')
    cy.url().should('eq', 'http://localhost:3000/user/changePassword')
  })
})