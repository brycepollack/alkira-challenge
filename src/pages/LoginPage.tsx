import React, { useState, useEffect } from 'react'
import { login, logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((s) => s.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  useEffect(() => {
    if (status === 'mfaRequired') {
      navigate('/mfa')
    } else if (status === 'authenticated') {
      navigate('/dashboard')
    }
  }, [status, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    await dispatch(login({ email, password }))
  }

  const loading = status === 'loading'

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="text-header mb-4 text-center text-xl font-semibold">
          Login
        </h1>

        {(error || localError) && (
          <div className="alert-error">{localError || error}</div>
        )}

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-base text-body"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-password text-body"
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn ${loading ? 'btn-loading' : 'btn-primary'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-body mt-4 text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="link">
            Sign up here!
          </a>
        </p>
      </form>
    </div>
  )
}
