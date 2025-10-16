declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      mfa(code: string): Chainable<void>
    }
  }
}

export {}

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')
  cy.get('input[type=email]').type(email)
  cy.get('input[type=password]').type(password)
  cy.get('button[type=submit]').click()
})
Cypress.Commands.add('mfa', (code) => {
  cy.get('input[placeholder="Enter MFA code"]').type(code)
  cy.get('button[type=submit]').click()
})
