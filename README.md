# Car Sales USA — Starter

This is a starter Next.js + TypeScript + Tailwind project for a car sales website targeted at USA buyers.

## Quick Start (Windows PowerShell)

```powershell
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Open http://localhost:3000 in your browser.

## Features

- **Responsive UI** with Tailwind CSS
- **Search & Filters** — filter listings by make, year, price
- **Database** — SQLite with Prisma ORM
- **API Route** — `/api/cars` returns all cars from the database
- **Sample Data** — 6 pre-populated vehicles
- **Image Thumbnails** — SVG placeholders for each car

## Database

The project uses SQLite (via Prisma) for data persistence. The schema includes a `Car` model with fields for make, model, year, price, description, and image.

### Useful Commands

- `npx prisma studio` — Open Prisma Studio to browse/edit database
- `npm run seed` — Populate database with sample cars
- `npx prisma migrate dev` — Run migrations and generate Prisma client

## Notes

- Replace sample data and extend the schema as needed.
- Customize colors and styles in `tailwind.config.cjs` and `styles/globals.css`.

