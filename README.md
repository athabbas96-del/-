This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Dashboard

A no-code admin panel lives at `/admin` for managing projects, services,
clients, articles, site texts, and media (images/videos/PDFs) without
touching code.

**Login:** `/admin/login`, username `admin`. The password was generated for
this session — see the chat where it was created, or reset it:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"
```

Put the result in `.env.local` as `ADMIN_PASSWORD_HASH`. **Escape every `$`
as `\$`** — Next.js expands `$VAR` in `.env` files, which corrupts bcrypt
hashes otherwise. Also set `AUTH_SECRET` (any long random string) and
`ADMIN_USERNAME` if you want a different username. See `.env.example`.

**Storage:** content lives in a local SQLite file at `data/app.db`, and
uploaded media in `public/uploads/`. Both are gitignored — they persist as
long as this runs on a regular server/VPS with a persistent disk. On
serverless hosts (e.g. Vercel) the filesystem resets on every deploy and
this storage will NOT persist; that setup would need swapping in a hosted
database and object storage (S3/Cloudinary/etc.) instead.

On first run, the database auto-seeds itself from the site's original
content so nothing is lost.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
