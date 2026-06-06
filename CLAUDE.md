# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev      # start dev server at localhost:3000
yarn build    # production build
yarn lint     # ESLint via next lint
```

No test suite is configured.

## Architecture

**Three-tier component hierarchy:**

1. `app/` — Next.js App Router pages. Every page file does nothing but import and render a single template:
   ```tsx
   // app/products/page.tsx
   import ProductsPage from "@/templates/Products/OverviewPage";
   export default function Page() { return <ProductsPage />; }
   ```

2. `templates/` — Page-level assemblies that compose section components and wire up mock data. Organized by feature (`Products/`, `Customers/`, `Income/`, etc.), further subdivided by sub-page.

3. `components/` — Reusable primitives (`Button`, `Card`, `Modal`, `Field`, `Icon`, `Table`, `Dropdown`, etc.). Each lives in its own subdirectory as `components/<Name>/index.tsx`. The `Layout` component (`components/Layout/index.tsx`) wraps every page with `Sidebar` + `Header` and handles mobile sidebar toggle.

**Supporting directories:**
- `mocks/` — Static TypeScript mock data consumed directly by templates (no API layer).
- `types/` — Shared TypeScript interfaces (`product.ts`, `customer.ts`, `refund.ts`, etc.).
- `hooks/` — Custom hooks (currently only `useSelection.ts`).
- `contstants/` — Navigation config (`navigation.tsx`). Note: directory name is intentionally misspelled in the repo.

## Tailwind Design Tokens

The project uses Tailwind v4 with a custom token vocabulary defined in `app/globals.css`. Use these instead of raw colors or arbitrary values:

**Backgrounds** (`bg-*`): `b-surface1`, `b-surface2`, `b-surface3`, `b-pop`, `b-dark1`, `b-dark2`, `b-highlight`, `b-depth`, `b-primary`

**Text** (`text-*`): `t-primary`, `t-secondary`, `t-tertiary`, `t-light`, `t-blue`

**Strokes/Borders** (`border-*`): `s-border`, `s-subtle`, `s-focus`, `s-highlight`, `s-stroke2`

**Accent colors**: `primary-01` (blue #2a85ff), `primary-02` (green #00a656), `primary-03` (red #ff381c), `primary-04` (purple #7f5fff), `primary-05` (orange #ff9d34)

**Typography** (`text-*`): `h1`–`h6`, `sub-title-1`, `sub-title-2`, `body-1`, `body-2`, `button`, `caption`, `overline`

**Shadows** (`shadow-*`): `depth`, `widget`, `depth-toggle`, `dropdown`, `press-pressing`

**Custom breakpoints** (max-width, used as `max-sm:`, `max-md:`, etc.): sm=480px, md=767px, lg=1023px, xl=1259px, 2xl=1419px, 3xl=1719px, 4xl=1899px

**Global component classes** (use in `className`): `.card`, `.center`, `.center-with-sidebar`, `.col-left`, `.col-right`, `.label`, `.label-green`, `.label-red`, `.label-yellow`, `.label-gray`, `.action`, `.box-hover`, `.gradient-menu`, `.gradient-card`, `.chart-tooltip`

## Dark Mode

Dark mode is toggled via `next-themes` (stored as `data-theme="dark"` on `<html>`). Use the Tailwind `dark:` variant for dark-mode overrides. The custom dark variant is defined in globals.css as `[data-theme=dark]`.

## Icon Component

All icons are rendered via `<Icon name="..." />` from `components/Icon/index.tsx`, which renders an SVG from an internal lookup table. Use icon names that already exist in the table (e.g. `"dashboard"`, `"edit"`, `"close"`, `"chart"`, `"bell"`, `"arrow"`, `"chevron"`, `"dots"`).

## Layout Usage

Wrap page content with `<Layout>` from `components/Layout/index.tsx`:
```tsx
<Layout title="Page Title">
  {/* page sections */}
</Layout>
```
Props: `title` (header title), `newProduct` (adjusts mobile header height), `hideSidebar` (full-width layout without sidebar).
