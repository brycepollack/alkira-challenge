import type { DbUser } from '../types/types'

// Initial mock database
export const users: DbUser[] = [
  { email: 'user@example.com', password: 'password', role: 'read-only' },
  { email: 'admin@example.com', password: 'password', role: 'read-write' },
]
