let userData: { email: string; password: string; mfaCode: string }

before(() => {
  cy.fixture('user').then((data) => {
    userData = data
  })
})

describe('Authentication Flow', () => {
  //
  // TEST 1 — Login page renders
  //
  it('renders login form correctly', () => {
    cy.visit('/')
    cy.contains('Login').should('be.visible')
    cy.get('input[type=email]').should('exist')
    cy.get('input[type=password]').should('exist')
    cy.get('button[type=submit]').should('contain', 'Login')
  })

  //
  // TEST 2 — Successful login redirects to MFA
  //
  it('logs in and redirects to MFA page', () => {
    cy.login(userData.email, userData.password)
    cy.url().should('include', '/mfa')
    cy.contains('Multi-Factor Authentication').should('be.visible')
  })

  //
  // TEST 3 — Enter MFA code and reach dashboard
  //
  it('enters valid MFA code and reaches dashboard', () => {
    cy.login(userData.email, userData.password)
    cy.url().should('include', '/mfa')
    cy.mfa(userData.mfaCode)
    cy.url().should('include', '/dashboard')
  })

  //
  // TEST 4 — Try to access protected route without auth
  //
  it('prevents unauthenticated user from accessing dashboard', () => {
    cy.visit('/dashboard')
    cy.url().should('include', '/login') // should redirect back
    cy.contains('Login').should('be.visible')
  })

  //
  // TEST 5 — Try to with incorrect credentials
  //
  it('logs in and redirects to MFA page', () => {
    cy.login('fail@example.com', 'wrongpassword')
    cy.url().should('not.include', '/mfa')
    cy.contains('Invalid login').should('be.visible')
  })
})
