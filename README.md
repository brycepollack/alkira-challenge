# Alkira Take-Home Exercise

Demo React/Redux app with login, MFA, signup, and a protected dashboard. Includes Cypress E2E tests.

## Setup

1. Create app:

```bash
git clone https://github.com/brycepollack/alkira-challenge.git
cd alkira-challenge
pnpm install
```

2. Run app:

```bash
pnpm dev
```

## Using App

- Once app is running, go to http://localhost:3000
- You can either sign in with one of the two existing accounts or create your own
  - READ ONLY: { email: 'user@example.com', password: 'password' }
  - READ-WRITE: { email: 'admin@example.com', password: 'password' }
  - All newly created accounts will be read-only
- Follow the mock MFA instructions to complete the auth flow

## QA Testing

Cypress UI:

```bash
pnpm cy:open
```

Cypress (headless):

```bash
pnpm cy:run
```
