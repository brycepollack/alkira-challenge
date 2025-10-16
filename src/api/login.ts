import { users } from './mockdb'
import type { LoginRequest, LoginResponse, DbUser } from '../types/types'

export async function LoginService(
  request: LoginRequest,
): Promise<LoginResponse> {
  const { email, password } = request

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u: DbUser) => u.email === email && u.password === password,
      )
      if (!user) {
        return reject(new Error('Invalid login. Please try again'))
      }

      const { password: _removed, ...safeUser } = user

      resolve({
        success: true,
        user: safeUser,
      })
    }, 1200) // simulate network delay
  })
}
