export interface User {
  email: string
  role: 'read-only' | 'read-write'
}

export interface DbUser {
  email: string
  password: string
  role: 'read-only' | 'read-write'
}

// --- AUTH REQUESTS ---
export interface SignupRequest {
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface MfaRequest {
  email: string
  code: string
}

// --- AUTH RESPONSES ---
export interface SignupResponse {
  success: boolean
  message: string
}

export interface LoginResponse {
  success: boolean
  user: User
}

export interface MfaResponse {
  success: boolean
  token: string
  user: User
}
