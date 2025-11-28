import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">Car Sales USA</Link>
        <nav className="space-x-4 text-sm">
          <Link href="/listings" className="text-gray-700 hover:text-blue-600">Listings</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
