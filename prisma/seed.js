const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Clear existing cars
  await prisma.car.deleteMany();

  // Create sample cars
  const cars = await Promise.all([
    prisma.car.create({
      data: {
        make: 'Toyota',
        model: 'Camry',
        year: 2019,
        price: 18900,
        description: 'Well maintained, one owner.',
        image: '/images/1.svg',
      },
    }),
    prisma.car.create({
      data: {
        make: 'Honda',
        model: 'Civic',
        year: 2018,
        price: 15950,
        description: 'Fuel efficient compact sedan.',
        image: '/images/2.svg',
      },
    }),
    prisma.car.create({
      data: {
        make: 'Ford',
        model: 'F-150',
        year: 2020,
        price: 27900,
        description: 'Reliable pickup with low miles.',
        image: '/images/3.svg',
      },
    }),
    prisma.car.create({
      data: {
        make: 'Chevrolet',
        model: 'Malibu',
        year: 2017,
        price: 12500,
        description: 'Affordable midsize sedan.',
        image: '/images/4.svg',
      },
    }),
    prisma.car.create({
      data: {
        make: 'Tesla',
        model: 'Model 3',
        year: 2021,
        price: 39999,
        description: 'Electric, autopilot features.',
        image: '/images/5.svg',
      },
    }),
    prisma.car.create({
      data: {
        make: 'Subaru',
        model: 'Outback',
        year: 2019,
        price: 22900,
        description: 'All-wheel drive, great for outdoors.',
        image: '/images/6.svg',
      },
    }),
  ]);

  console.log('Seeded cars:', cars);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
