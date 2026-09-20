import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CitizenLayout from './components/layouts/CitizenLayout'
import AdminLayout from './components/layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

import CitizenDashboard from './pages/citizen/CitizenDashboard'
import SuvidhaPortal from './pages/citizen/SuvidhaPortal'
import Applications from './pages/citizen/Applications'
import BenefitWallet from './pages/citizen/BenefitWallet'
import AdminDashboard from './pages/admin/AdminDashboard'
import DuplicateReview from './pages/admin/DuplicateReview'
import FamilyVerification from './pages/admin/FamilyVerification'
import AuditLogs from './pages/admin/AuditLogs'
import LifeEventSimulator from './pages/admin/LifeEventSimulator'
import Login from './pages/Login'
import Register from './pages/Register'
import OAuthCallback from './pages/OAuthCallback'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />

        {/* Citizen Routes */}
        <Route path="/citizen" element={
          <ProtectedRoute allowedRoles={['CITIZEN']}>
            <CitizenLayout />
          </ProtectedRoute>
        }>
          <Route index element={<CitizenDashboard />} />
          <Route path="suvidha" element={<SuvidhaPortal />} />
          <Route path="applications" element={<Applications />} />
          <Route path="wallet" element={<BenefitWallet />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="duplicates" element={<DuplicateReview />} />
          <Route path="verifications" element={<FamilyVerification />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="simulator" element={<LifeEventSimulator />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
