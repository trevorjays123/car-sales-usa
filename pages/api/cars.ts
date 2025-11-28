import type { NextApiRequest, NextApiResponse } from 'next'

// Fallback to static data if database isn't initialized
const fallbackCars = [
  { id: '1', make: 'Toyota', model: 'Camry', year: 2019, price: 18900, description: 'Well maintained, one owner.', image: '/images/1.svg' },
  { id: '2', make: 'Honda', model: 'Civic', year: 2018, price: 15950, description: 'Fuel efficient compact sedan.', image: '/images/2.svg' },
  { id: '3', make: 'Ford', model: 'F-150', year: 2020, price: 27900, description: 'Reliable pickup with low miles.', image: '/images/3.svg' },
  { id: '4', make: 'Chevrolet', model: 'Malibu', year: 2017, price: 12500, description: 'Affordable midsize sedan.', image: '/images/4.svg' },
  { id: '5', make: 'Tesla', model: 'Model 3', year: 2021, price: 39999, description: 'Electric, autopilot features.', image: '/images/5.svg' },
  { id: '6', make: 'Subaru', model: 'Outback', year: 2019, price: 22900, description: 'All-wheel drive, great for outdoors.', image: '/images/6.svg' },
]

let prisma: any = null

async function getPrisma() {
  if (!prisma) {
    try {
      const { PrismaClient } = await import('@prisma/client')
      prisma = new PrismaClient()
    } catch (e) {
      return null
    }
  }
  return prisma
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const prismaClient = await getPrisma()
    if (prismaClient) {
      const cars = await prismaClient.car.findMany()
      res.status(200).json(cars)
    } else {
      res.status(200).json(fallbackCars)
    }
  } catch (error) {
    res.status(200).json(fallbackCars)
  }
}
