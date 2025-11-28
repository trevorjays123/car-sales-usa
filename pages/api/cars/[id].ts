import type { NextApiRequest, NextApiResponse } from 'next'

let prisma: any = null

async function getPrisma() {
  if (!prisma) {
    try {
      const clientModule: any = await import('@prisma/client')
      const PrismaClientClass = clientModule.PrismaClient || clientModule.default || clientModule.prisma?.PrismaClient
      if (!PrismaClientClass) return null
      prisma = new PrismaClientClass()
    } catch (e) {
      return null
    }
  }
  return prisma
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const { method } = req

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid car ID' })
  }

  try {
    const prismaClient = await getPrisma()

    if (!prismaClient) {
      return res.status(500).json({ error: 'Database not available' })
    }

    if (method === 'PUT') {
      // Update car
      const { make, model, year, price, description, image } = req.body
      const car = await prismaClient.car.update({
        where: { id },
        data: { make, model, year, price, description, image },
      })
      res.status(200).json(car)
    } else if (method === 'DELETE') {
      // Delete car
      await prismaClient.car.delete({ where: { id } })
      res.status(200).json({ message: 'Car deleted' })
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error: any) {
    console.error('API error:', error)
    if (error.code === 'P2025') {
      // Record not found
      res.status(404).json({ error: 'Car not found' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
