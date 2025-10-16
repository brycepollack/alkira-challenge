import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'

export default function DashboardPage() {
  const { user } = useAppSelector((s) => s.auth)

  const role: 'read-only' | 'read-write' = user?.role ?? 'read-only'
  const email = user?.email ?? 'Guest'

  return (
    <div className="page-wrapper flex-col items-center justify-center p-6">
      <h1 className="text-header mb-2 text-3xl font-bold">Hello, {email}!</h1>
      <p className="text-body">
        {role === 'read-only' ? 'Read-only' : 'Read / Write'}
      </p>
    </div>
  )
}
