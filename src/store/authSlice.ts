import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LoginService } from '../api/login'
import { SignupService } from '../api/signup'
import { MfaService } from '../api/mfa'
import type {
  User,
  LoginRequest,
  SignupRequest,
  MfaRequest,
} from '../types/types'

type AuthStatus = 'idle' | 'loading' | 'mfaRequired' | 'authenticated' | 'error'

interface AuthState {
  status: AuthStatus
  user: User | null
  token: string | null
  error: string | null
}

const initialState: AuthState = {
  status: 'idle',
  user: null,
  token: null,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const res = await LoginService(credentials)
      if (res.success && res.user) {
        return res
      } else {
        throw new Error('Invalid login. Please try again')
      }
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const mfa = createAsyncThunk(
  'auth/mfa',
  async (payload: MfaRequest, { rejectWithValue }) => {
    try {
      const res = await MfaService(payload)
      if (res.success && res.user && res.token) {
        return res
      } else {
        throw new Error('Invalid MFA code')
      }
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: SignupRequest, { rejectWithValue }) => {
    try {
      const res = await SignupService(credentials)
      if (res.success) {
        return res
      } else {
        throw new Error('Invalid signup')
      }
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // --- LOGIN ---
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'mfaRequired'
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload as string
      })

      // --- MFA ---
      .addCase(mfa.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(mfa.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.user = action.payload.user
        state.token = action.payload.token || null
      })
      .addCase(mfa.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload as string
      })

      // --- SIGNUP ---
      .addCase(signup.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload as string
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
