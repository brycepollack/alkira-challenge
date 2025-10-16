import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { user, token } = useAppSelector((s) => s.auth)
  const [isVerifying, setIsVerifying] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // TODO: we'd want to send token to backend to auth
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (user && token) {
          setIsAuthenticated(true)
          return
        }
      } catch (err) {
        console.error('Auth validation failed', err)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyAuth()
  }, [user])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate('/')}>
        <img
          src="/favicon.png"
          alt="Alkira logo"
          className="mr-2 h-[1em] w-[1em]"
        />
        <span>Alkira Auth Flow</span>
      </div>

      <nav className="header-nav">
        {isAuthenticated ? (
          <>
            <span className="header-text">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="header-button header-button-logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="header-button header-button-login"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="header-button header-button-signup"
            >
              Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  )
}
