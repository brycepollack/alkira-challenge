// ***********************************************************
// This support file is processed and loaded automatically
// before your test files.
//
// You can use this file to import custom commands,
// global configuration, and test setup code.
//
// Read more: https://on.cypress.io/configuration
// ***********************************************************

import './commands'

Cypress.on('uncaught:exception', (err) => {
  console.error('Uncaught exception:', err)
  return false
})

beforeEach(() => {
  cy.clearLocalStorage()
  cy.log('Starting new test')
})
