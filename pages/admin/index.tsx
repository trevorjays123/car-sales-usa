import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
  image?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
    if (!token) {
      router.push('/admin/login')
    } else {
      setAuthenticated(true)
      fetchCars()
    }
  }, [])

  async function fetchCars() {
    try {
      const res = await fetch('/api/cars')
      const data = await res.json()
      setCars(data)
    } catch (err) {
      console.error('Failed to fetch cars:', err)
    } finally {
      setLoading(false)
    }
  }

  async function deleteCar(id: string) {
    if (!confirm('Are you sure you want to delete this car?')) return
    try {
      const res = await fetch(`/api/cars/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCars(cars.filter((c) => c.id !== id))
      } else {
        alert('Failed to delete car')
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  if (!authenticated) return <div className="container py-12">Checking auth...</div>

  return (
    <main className="container py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="space-x-2">
          <Link href="/admin/new" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Car
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken')
              router.push('/admin/login')
            }}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4">Make</th>
                <th className="text-left p-4">Model</th>
                <th className="text-left p-4">Year</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{car.make}</td>
                  <td className="p-4">{car.model}</td>
                  <td className="p-4">{car.year}</td>
                  <td className="p-4">${car.price.toLocaleString()}</td>
                  <td className="p-4 space-x-2">
                    <Link href={`/admin/${car.id}`} className="text-blue-600 text-sm">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCar(car.id)}
                      className="text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
