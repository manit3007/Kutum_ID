import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OAuthCallback() {
  const navigate = useNavigate()
  const processed = useRef(false)

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (processed.current) {
      return
    }
    processed.current = true

    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    console.log('OAuth Callback - Token:', token ? 'Present' : 'Missing')

    if (token) {
      localStorage.setItem('token', token)
      // Decode token to get user info (in production, verify with backend)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        console.log('OAuth Callback - Decoded payload:', payload)

        localStorage.setItem('user', JSON.stringify({
          id: payload.userId,
          username: payload.username,
          role: payload.role,
          family_id: payload.familyId
        }))

        console.log('OAuth Callback - Redirecting to:', payload.role === 'ADMIN' ? '/admin' : '/citizen')

        // Redirect based on role
        if (payload.role === 'ADMIN') {
          navigate('/admin')
        } else {
          navigate('/citizen')
        }
      } catch (error) {
        console.error('Failed to decode token:', error)
        navigate('/login?error=token_decode_failed')
      }
    } else {
      console.error('No token in URL')
      navigate('/login?error=no_token')
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing login...</p>
      </div>
    </div>
  )
}
