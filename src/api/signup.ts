import { users } from './mockdb'
import type { SignupRequest, SignupResponse, DbUser } from '../types/types'

export async function SignupService(
  request: SignupRequest,
): Promise<SignupResponse> {
  const { email, password } = request

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.some((u: DbUser) => u.email === email)) {
        reject(new Error('User already exists'))
        return
      }

      const role: DbUser['role'] = 'read-only'
      const newUser: DbUser = { email, password, role }
      users.push(newUser)

      resolve({
        success: true,
        message: 'Signup successful! Please log in.',
      })
    }, 1200) // simulate network delay
  })
}
