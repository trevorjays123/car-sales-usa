import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
  description?: string
}

export default function CarDetail() {
  const { query } = useRouter()
  const id = Array.isArray(query.id) ? query.id[0] : query.id
  const [car, setCar] = useState<Car | null>(null)

  useEffect(() => {
    if (!id) return
    fetch('/api/cars')
      .then((r) => r.json())
      .then((data: Car[]) => setCar(data.find((c) => c.id === id) ?? null))
  }, [id])

  if (!car) return <div className="container py-12">Loading...</div>

  return (
    <main className="container py-12">
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="h-64 w-full bg-gray-100">
          {car.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{car.year} {car.make} {car.model}</h1>
          <p className="text-gray-700 mb-4">${car.price.toLocaleString()}</p>
          <p className="text-sm text-gray-600">{car.description ?? 'No description provided.'}</p>
        </div>
      </div>
    </main>
  )
}
