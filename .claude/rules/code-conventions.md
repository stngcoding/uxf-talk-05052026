---
paths:
  - "*.tsx"
  - "*.ts"
  - "*.css"
---

# Code Conventions

## Component shape

Arrow function, local `type Props`, default export. No named exports for components.

```tsx
type Props = {
    className?: string;
    children: React.ReactNode;
};

const MyComponent = ({ className, children }: Props) => {
    return <div className={`... ${className || ""}`}>{children}</div>;
};

export default MyComponent;
```

- A component with no props still declares `type Props = {}` and destructures `({}: Props)`.
- `"use client"` only on components that use hooks or browser APIs. Do NOT put it on every component.
- Ref: `components/ProductCard/index.tsx`, `components/ShopHeader/index.tsx`

## Styling — Tailwind only

The project uses **Tailwind CSS v4** exclusively. Do NOT create `.sass` or `.scss` files.

- Compose classes with template literals or direct strings:
  ```tsx
  className={`inline-flex items-center h-12 rounded-3xl ${isWhite ? "bg-b-surface2" : ""} ${className || ""}`}
  ```
- Use `dark:` prefix for dark-mode variants: `dark:bg-shade-04`, `dark:text-t-light`
- Use design-token Tailwind classes — never hardcode hex colors (see Design Tokens below)

> **Legacy note:** A few components (`ProductCard`, `ShopHeader`, `ProductGallery`, `ProductFilter`, `ProductBody`, `ProductHeader`, `ProductSection`, `ProfileSection`, `CommentsSection`, `RecommendationsSection`, `ModeContainer`) still contain `import styles from "*.module.sass"` — these are broken imports awaiting migration to Tailwind. When touching these components, migrate their class names to Tailwind utilities and remove the `styles` import and `cn` usage.

## Design tokens — Tailwind color classes

Never use hex values directly. Use semantic token classes mapped from CSS custom properties in `globals.css`.

**Backgrounds:**
- `bg-b-surface1` — page background (light gray / near-black)
- `bg-b-surface2` — card/panel background (white / dark gray)
- `bg-b-pop` — elevated popup surface
- `bg-b-dark1`, `bg-b-dark2` — inverted dark surfaces
- `bg-b-primary` — primary blue fill

**Text:**
- `text-t-primary`, `text-t-secondary`, `text-t-tertiary`, `text-t-light`, `text-t-blue`

**Stroke / border:**
- `border-s-stroke2` — default border
- `border-s-subtle` — barely-visible border
- `border-s-focus` — focused input ring (primary blue)
- `border-s-highlight` — medium emphasis border

**Primary colors (use sparingly for accent/status):**
- `bg-primary-01` (blue), `bg-primary-02` (green), `bg-primary-03` (red), `bg-primary-04` (purple), `bg-primary-05` (orange)

**Primitives (direct shade use):**
- `shade-01..10` (near-black → near-white): e.g. `bg-shade-04`, `text-shade-07`

**Secondary/tint colors:** `secondary-01..05` (peach, lavender, sky, mint, yellow)

**Accent:** `text-accent` / `bg-accent` (#f52495 pink — same in both themes)

**Charts:** `text-chart-green`, `text-chart-purple`, `text-chart-yellow`

## Typography classes

Use `text-{scale}` Tailwind utilities — never set font-size/weight/line-height manually.

| Class | Size | Weight |
|---|---|---|
| `text-h1` .. `text-h6` | 6rem → 1.25rem | 300..600 |
| `text-sub-title-1` | 1rem | 600 |
| `text-sub-title-2` | 0.875rem | 700 |
| `text-body-1` | 1rem | — |
| `text-body-2` | 0.875rem | — |
| `text-button` | 0.875rem | 600 |
| `text-caption` | 0.75rem | — |
| `text-overline` | 0.625rem | 500 |

## Shadow classes

| Class | Use |
|---|---|
| `shadow-widget` | Default card widget |
| `shadow-depth` | Elevated floating card |
| `shadow-dropdown` | Dropdown/popover |
| `shadow-depth-toggle` | Floating toggle pill |
| `shadow-press-pressing` | Button pressed state (inset) |
| `shadow-hover-light` | Inner ring on hover |
| `shadow-input-typing` | Focused input |

## Breakpoints (max-width convention)

Custom breakpoints — use as **max-** prefixes (mobile-last approach in this project):

| Prefix | Max width |
|---|---|
| `max-sm:` | 480px |
| `max-md:` | 767px |
| `max-lg:` | 1023px |
| `max-xl:` | 1259px |
| `max-2xl:` | 1419px |
| `max-3xl:` | 1719px |
| `max-4xl:` | 1899px |

## Layout utility classes (from `globals.css`)

Use these as plain class names (not via `styles.`):

- `.center` — full-width page container (no sidebar)
- `.center-with-sidebar` — page container with sidebar offset
- `.col-left` / `.col-right` — responsive two-column primitives
- `.card` — standard card surface (`rounded-4xl bg-b-surface2 shadow-widget`)
- `.label`, `.label-green`, `.label-red`, `.label-yellow`, `.label-gray` — status badge/pill
- `.action` — small ghost icon-text action button
- `.box-hover` — gradient card hover overlay
- `.chart-tooltip` / `.chart-tooltip-up` — Recharts tooltip
- `.gradient-menu`, `.gradient-card` — composite gradient backgrounds

## Icons

Use `<Icon name="..." />` from `components/Icon/index.tsx` — an inline SVG path dictionary.

- `size` prop (default 24): `<Icon name="star" size={16} />`
- `fill` prop: `fill="currentColor"` to inherit, or `fill="var(--text-secondary)"`
- To add a new icon: add a `path` entry to the dictionary in `Icon/index.tsx` — do not import SVG files
- Figma MCP returns icons as asset URLs — extract the `d="..."` path and add it to the dictionary

## Images

Use the custom `Image` wrapper from `components/Image/index.tsx` (wraps `next/image` with opacity fade-in):

```tsx
import Image from "@/components/Image";

// With explicit dimensions
<Image src="/assets/cover.png" width={355} height={244} alt="Product cover" />

// With fill (container must be position:relative with explicit dimensions)
<Image src={product.image} fill alt={product.title} sizes="(max-width: 1600px) 33vw, 500px" style={{ objectFit: "cover" }} />
```

- Never use `<img>` tags except for SVGs where ESLint-suppression is deliberate
- Files live in `public/`, referenced by root-absolute path (`/assets/...`)

## Imports & path alias

`@/*` maps to the repo root. Use it for cross-folder imports; relative paths are fine within the same component folder.

```tsx
import Button from "@/components/Button";            // cross-folder
import { products } from "@/constants/products";    // cross-folder data
import Icon from "../Icon";                         // sibling folder — relative OK
```

## TypeScript

- `strict` is on. Type all props explicitly; avoid `any`.
- Optional props: `onClick?: () => void`, `className?: string`
- Import types from `types/` — don't inline-redeclare shared data shapes
