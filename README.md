# Pushkin School 37

Website for School 37 in Tashkent, with an admin panel where school staff manage the content themselves: news, events, staff profiles, photos and the text of every page. Messages sent through the contact form arrive in an inbox inside the admin panel.

Live at https://pushkin-school-37.vercel.app

The public site is in Russian and English, at `/ru/...` and `/en/...`. Page content is translated per language in the admin panel.

## Pages

Home, About, Teachers, Students, News and Events, plus a contact form. The admin panel is at `/admin`.

## Tech stack

| Part        | Choice                                                                |
| ----------- | --------------------------------------------------------------------- |
| Framework   | Next.js 15 (App Router), React 19, TypeScript                         |
| CMS         | Payload CMS 3, running inside the same Next.js app                    |
| Database    | PostgreSQL: Vercel Postgres in production, Docker Compose locally     |
| File storage| Vercel Blob for uploaded images                                       |
| UI          | Tailwind CSS 4, shadcn/ui, react-hook-form with Zod                   |
| Hosting     | Vercel                                                                |

## Content model

- **Collections** (lists of entries): News, Events, Team members, Media, Contact submissions and admin Users.
- **Globals** (one document each): the text of the Home, About, Team, News and Events pages, and site settings such as contact details.

Schema changes are applied through Payload migrations in `src/migrations/`.

## Running it locally

Requires Node.js and Docker.

```bash
docker compose up -d     # Postgres 16 on port 5432, database school_cms_dev
npm install
npm run dev              # http://localhost:3000, admin panel at /admin
```

Create a `.env` file first:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/school_cms_dev
PAYLOAD_SECRET=any-long-random-string
```

On the first visit to `/admin`, Payload asks you to create the first admin user.

## Deploying

Vercel runs `npm run ci`, which applies pending migrations and then builds the site. Production needs `POSTGRES_URL` (Vercel Postgres), `PAYLOAD_SECRET` and `BLOB_READ_WRITE_TOKEN` (Vercel Blob).
