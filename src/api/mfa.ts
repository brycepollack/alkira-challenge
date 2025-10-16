import { users } from './mockdb'
import type { MfaRequest, MfaResponse, DbUser } from '../types/types'

export async function MfaService(request: MfaRequest): Promise<MfaResponse> {
  const { email, code } = request

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Fake MFA validation — accept "123456" as the correct code
      if (code !== '123456') {
        return reject(new Error('Invalid MFA code'))
      }

      const user = users.find((u: DbUser) => u.email === email)
      if (!user) {
        return reject(new Error('User not found'))
      }

      const { password: _removed, ...safeUser } = user

      // Return a fake JWT token
      resolve({
        success: true,
        token: `mock-jwt-${Math.random().toString(36).substring(2)}`,
        user: safeUser,
      })
    }, 1200) // simulate network delay
  })
}
