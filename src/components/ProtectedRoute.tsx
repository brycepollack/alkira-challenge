import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, token } = useAppSelector((s) => s.auth)
  const [isVerifying, setIsVerifying] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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

  if (isVerifying) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-gray-600">
        Checking authentication...
      </div>
    )
  }
  if (!isAuthenticated) return <Navigate to="/login" />

  return <>{children}</>
}
