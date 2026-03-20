# Harusi Planners

East Africa's wedding planning platform. Built with Vite + React + Tailwind, deployed on Vercel.

## Environment Variables

Set these in Vercel dashboard → Project → Settings → Environment Variables.

| Variable | Description |
|---|---|
| `MAILCHIMP_API_KEY` | From Mailchimp → Account → Extras → API Keys |
| `MAILCHIMP_LIST_ID` | From Mailchimp → Audience → Settings → Audience name & defaults |
| `MAILCHIMP_SERVER_PREFIX` | The prefix in your API key, e.g. `us21` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number in international format, e.g. `254799644100` |

Without the Mailchimp vars, the newsletter and quiz email capture will return a 500 error in production.

## Deploy

```bash
vercel --prod
```

## Project Structure

```
src/
  components/   Navbar, Footer, ThemeToggle, etc.
  pages/        Home, Vendors, VendorProfile, Pricing, Inspiration, Blog, BlogPost
  data/         packages.js, vendors.js, weddings.js, quiz.js, blog.js
  utils/        constants.js
api/
  subscribe.js  Vercel serverless function — Mailchimp proxy
public/
  logo.svg, logo-white.svg, logo-mark.svg
```

## Adding a Blog Post

Open `src/data/blog.js` and add an object to the `POSTS` array following the existing pattern. The `slug` must be unique and URL-safe. Content is an array of typed blocks (`paragraph`, `heading`, `list`, `quote`).

## Stack

- Vite 5 + React 18
- Tailwind CSS 3 (custom brand tokens in `tailwind.config.js`)
- React Router v6
- react-helmet-async for SEO
- Lucide React for icons
- Vercel for hosting + serverless functions
