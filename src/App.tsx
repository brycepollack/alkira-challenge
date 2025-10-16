import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { store } from './store/store'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import MfaPage from './pages/MfaPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
          />
          <Route
            path="/mfa"
            element={
              <Layout>
                <MfaPage />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <SignupPage />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Redirect any unknown route to /login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  )
}
