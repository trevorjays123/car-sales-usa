import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        localStorage.setItem('adminToken', 'authenticated')
        router.push('/admin')
      } else {
        alert('Invalid password')
      }
    } catch (err) {
      console.error('Login error:', err)
      alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container py-12 flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  )
}
