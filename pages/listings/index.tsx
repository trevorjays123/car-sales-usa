import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
  image?: string
}

export default function Listings() {
  const [cars, setCars] = useState<Car[]>([])
  const [query, setQuery] = useState('')
  const [makeFilter, setMakeFilter] = useState('')
  const [minYear, setMinYear] = useState<number | ''>('')
  const [maxPrice, setMaxPrice] = useState<number | ''>('')

  useEffect(() => {
    fetch('/api/cars')
      .then((r) => r.json())
      .then((data) => setCars(data))
  }, [])

  const makes = useMemo(() => {
    const s = new Set<string>()
    cars.forEach((c) => s.add(c.make))
    return Array.from(s).sort()
  }, [cars])

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      if (query) {
        const q = query.toLowerCase()
        if (!(`${c.make} ${c.model}`.toLowerCase().includes(q))) return false
      }
      if (makeFilter && c.make !== makeFilter) return false
      if (minYear !== '' && c.year < Number(minYear)) return false
      if (maxPrice !== '' && c.price > Number(maxPrice)) return false
      return true
    })
  }, [cars, query, makeFilter, minYear, maxPrice])

  return (
    <main className="container py-12">
      <h1 className="text-2xl font-bold mb-6">All Listings</h1>

      <section className="mb-6 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search make or model"
            className="border rounded px-3 py-2"
          />
          <select
            value={makeFilter}
            onChange={(e) => setMakeFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Makes</option>
            {makes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="number"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Min year"
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Max price"
            className="border rounded px-3 py-2"
          />
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <article key={c.id} className="bg-white rounded shadow overflow-hidden">
            <div className="h-44 w-full bg-gray-100 overflow-hidden">
              {c.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image} alt={`${c.make} ${c.model}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{c.year} {c.make} {c.model}</h3>
              <p className="text-sm text-gray-600">${c.price.toLocaleString()}</p>
              <Link href={`/listings/${c.id}`} className="text-blue-600 text-sm mt-2 inline-block">View</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
