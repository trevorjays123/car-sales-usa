import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
  description?: string
  image?: string
}

export default function EditCar() {
  const router = useRouter()
  const { id } = router.query
  const [formData, setFormData] = useState<Car | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    fetchCar()
  }, [id])

  async function fetchCar() {
    try {
      const res = await fetch('/api/cars')
      const data: Car[] = await res.json()
      const car = data.find((c) => c.id === id)
      if (car) setFormData(car)
    } catch (err) {
      console.error('Failed to fetch car:', err)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!formData) return
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev!,
      [name]: name === 'year' || name === 'price' ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData) return
    setLoading(true)
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        alert('Failed to update car')
      }
    } catch (err) {
      console.error('Submit error:', err)
      alert('Error updating car')
    } finally {
      setLoading(false)
    }
  }

  if (!formData) return <div className="container py-12">Loading...</div>

  return (
    <main className="container py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Car</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Make</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            rows={3}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Car'}
        </button>
        <Link href="/admin" className="ml-2 text-gray-600">
          Cancel
        </Link>
      </form>
    </main>
  )
}
