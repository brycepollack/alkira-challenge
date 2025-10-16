import React, { useState, useEffect } from 'react'
import { mfa, logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'

export default function MfaPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error, user } = useAppSelector((s) => s.auth)

  const [code, setCode] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else if (status === 'authenticated') {
      navigate('/dashboard')
    }
  }, [user, status, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.email) return setLocalError('Missing user email')
    setLocalError(null)

    await dispatch(mfa({ email: user.email, code }))
  }

  const loading = status === 'loading'

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit} className="form-container">
        {status === 'mfaRequired' && (
          <div className="alert-mfa">
            Demo: Your MFA code is <strong>123456</strong>
          </div>
        )}

        <h1 className="text-header mb-4 text-center text-xl font-semibold">
          Multi-Factor Authentication
        </h1>

        <p className="text-body mt-4 text-center text-sm">
          A verification code was sent to your email.
        </p>

        {(error || localError) && (
          <div className="alert-error">{localError || error}</div>
        )}

        <input
          type="text"
          placeholder="Enter MFA code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="input-mfa text-body"
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn ${loading ? 'btn-loading' : 'btn-primary'}`}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        <p className="text-body mt-4 text-center text-sm">
          <button
            type="button"
            onClick={() => {
              dispatch(logout())
              navigate('/login')
            }}
            className="link"
          >
            Back to login
          </button>
        </p>
      </form>
    </div>
  )
}
