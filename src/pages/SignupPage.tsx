import React, { useState } from 'react'
import { signup } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'

export default function SignupPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((s) => s.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    const resultAction = await dispatch(signup({ email, password }))

    if (signup.fulfilled.match(resultAction)) {
      navigate('/login')
    }
  }

  const loading = status === 'loading'

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="text-header mb-4 text-center text-xl font-semibold">
          Sign Up
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
          className="input-base text-body"
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input-base text-body"
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn ${loading ? 'btn-loading' : 'btn-primary'}`}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="text-body mt-4 text-center text-sm">
          <a href="/login" className="link">
            Back to login
          </a>
        </p>
      </form>
    </div>
  )
}
