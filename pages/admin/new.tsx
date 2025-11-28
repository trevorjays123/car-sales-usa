import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NewCar() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    description: '',
    image: '',
  })
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' || name === 'price' ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        alert('Failed to create car')
      }
    } catch (err) {
      console.error('Submit error:', err)
      alert('Error creating car')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
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
            value={formData.description}
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
            value={formData.image}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Car'}
        </button>
        <Link href="/admin" className="ml-2 text-gray-600">
          Cancel
        </Link>
      </form>
    </main>
  )
}
