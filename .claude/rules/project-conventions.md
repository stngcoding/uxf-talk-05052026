---
paths:
  - "*.tsx"
  - "*.ts"
  - "*.css"
---

# Project Conventions

This is a **Next.js 15 + React 19 dashboard UI kit** — a multi-page admin/creator dashboard. Do not confuse it with the XORA landing page.

## Stack

- **Next.js 15** App Router, **React 19**
- **Tailwind CSS v4** — sole styling system; configured via `@theme {}` in `app/globals.css`
- **next-themes** — dark mode (writes `data-theme="dark"` to `<html>`)
- No test suite. Use **yarn** (`yarn dev`, `yarn build`, `yarn lint`).

## Folder structure

```
app/           – Next.js routes (App Router)
components/    – Shared UI primitives (Button, Icon, Card, Layout, Sidebar, Header…)
templates/     – Page-level compositions (HomePage, Products, Customers, Income…)
types/         – TypeScript interfaces (Product, Customer, Comment, Refund…)
mocks/         – Static mock data arrays
constants/     – Shared data constants (products, navigation…)
public/        – Static assets (images, icons)
```

## Architecture layers

- **`components/`** — reusable primitives (Button, Layout, Sidebar, Header, Card, Field, Table, ProductCard…). All styled with Tailwind.
- **`templates/`** — page compositions. Always wrap in `<Layout title="...">`. Use Tailwind utilities directly.

## Layout system

Every template uses the `Layout` shell (`components/Layout/index.tsx`):

```tsx
<Layout title="Dashboard">
  <div className="flex max-lg:block">
    <div className="col-left">...</div>
    <div className="col-right">...</div>
  </div>
</Layout>
```

`Layout` renders: `<Sidebar>` + `<Header>` + content area. The `.center`, `.center-with-sidebar`, `.col-left`, `.col-right`, `.card` utilities are defined in `app/globals.css` — use them directly as class names (no `styles.` prefix).

## Dark mode

- Toggle via `ThemeButton` which calls `next-themes` `setTheme("dark" | "light")`
- Library writes `data-theme="dark"` to `<html>`
- Tailwind resolves `dark:` prefixes via the `@custom-variant` declared in `globals.css`
- CSS custom properties auto-swap when `data-theme` changes — all Tailwind semantic classes (`bg-b-surface2`, `text-t-primary`, etc.) automatically reflect the correct theme value

## Page & route setup

- `app/layout.tsx` — server component (no `"use client"`); imports `app/globals.css` (Tailwind + theme); sets up fonts (Inter + Poppins via `next/font/google`)
- `app/page.tsx` — `"use client"` root page; imports templates and renders them

## Content / data

- Static data lives in `mocks/` or `constants/`; imported by templates or components that need it
- Types defined once in `types/`; import from there — do not redeclare inline
