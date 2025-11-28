import Link from 'next/link'
import { useEffect, useState } from 'react'

type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
  image?: string
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    fetch('/api/cars')
      .then((r) => r.json())
      .then((data) => setCars(data.slice(0, 6)))
  }, [])

  return (
    <main className="container py-12">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Car Sales USA</h1>
        <nav className="space-x-4">
          <Link href="/listings">Listings</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Listings</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {cars.map((c) => (
            <article key={c.id} className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">{c.year} {c.make} {c.model}</h3>
              <p className="text-sm text-gray-600">${c.price.toLocaleString()}</p>
              <Link href={`/listings/${c.id}`} className="text-blue-600 text-sm mt-2 inline-block">View</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
