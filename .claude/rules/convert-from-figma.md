---
paths:
  - "*.tsx"
  - "*.ts"
  - "*.css"
---


# MCP Servers
## Figma MCP server rules
  - The Figma MCP server provides an assets endpoint which can serve image and SVG assets
  - IMPORTANT: If the Figma MCP server returns a localhost source for an image or an SVG, use that image or SVG source directly
  - IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload
  - IMPORTANT: do NOT use or create placeholders if a localhost source is provided

  ## Figma MCP Integration Rules
These rules define how to translate Figma inputs into code for this project and must be followed for every Figma-driven change.

### Required flow (do not skip)
1. Run get_design_context first to fetch the structured representation for the exact node(s).
2. If the response is too large or truncated, run get_metadata to get the high‑level node map and then re‑fetch only the required node(s) with get_design_context.
3. Run get_screenshot for a visual reference of the node variant being implemented.
4. Only after you have both get_design_context and get_screenshot, download any assets needed and start implementation.
5. Translate the output (usually React + Tailwind) into this project's conventions, styles and framework.  Reuse the project's color tokens, components, and typography wherever possible.
6. Validate against Figma for 1:1 look and behavior before marking complete.

### Implementation rules
- Treat the Figma MCP output (React + Tailwind) as a representation of design and behavior, not as final code style.
- Replace Tailwind utility classes with the project's preferred utilities/design‑system tokens when applicable.
- Reuse existing components (e.g., buttons, inputs, typography, icon wrappers) instead of duplicating functionality.
- Use the project's color system, typography scale, and spacing tokens consistently.
- Respect existing routing, state management, and data‑fetch patterns already adopted in the repo.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design‑system tokens and adjust spacing or sizes minimally to match visuals.
- Validate the final UI against the Figma screenshot for both look and behavior.

### Icon handling (CRITICAL — do this before touching any image asset)

The Figma MCP often returns small UI icons as temporary asset URLs (`<img src="https://www.figma.com/api/mcp/asset/…">`). **These are NOT raster images** — they are SVG glyphs masquerading as asset URLs. Never use `<Image>` or `<NextImage>` for them.

**Resolution order — follow strictly:**

1. **Check the Icon dictionary first.** Open `components/Icon/index.tsx` and scan the `icons` map for a matching name (e.g. `star-stroke`, `laptop`, `chevron`, `filters`, `twitter`, `instagram`, `threads`). If a match exists, use `<Icon name="…" fill="…" />` directly — do NOT download or reference the Figma URL.

2. **Check the Figma node type.** If the node is `VECTOR`, `BOOLEAN_OPERATION`, or a group of only vectors and ≤32 px / monochrome, it is a UI icon. Extract the `d="…"` path string from the inline `<svg>` the MCP returns, add it to the `icons` map in `components/Icon/index.tsx` under a descriptive key, then reference it as `<Icon name="your-key" />`.

3. **Only use `<Image>` for genuine raster content** — product photos, cover images, profile pictures, hero illustrations. Never for glyphs or icons.

**Icon sizing:** `<Icon>` accepts an optional `size` prop (defaults to 24). Pass `size={16}` for small meta icons (rating stars, category glyphs). Use `fill="currentColor"` to inherit the parent's CSS `color`, or pass an explicit CSS variable: `fill="var(--text-secondary)"`.

```tsx
// ✅ Correct
<Icon name="star-stroke" size={16} fill="currentColor" />
<Icon name="chevron" fill="var(--text-secondary)" />

// ❌ Wrong — Figma icon URL treated as raster
<NextImage src="/assets/icon-star.png" fill alt="" sizes="16px" />
<Image src="/assets/icon-filter.png" width={24} height={24} alt="" />
```

### Design tokens

The project uses CSS custom properties defined in `app/globals.css`, mapped to Tailwind via `@theme {}`. Always use the Tailwind class — never hardcode hex values.

| Figma variable | CSS var | Tailwind class |
|---|---|---|
| `--text-primary` | `var(--text-primary)` | `text-t-primary` |
| `--text-secondary` | `var(--text-secondary)` | `text-t-secondary` |
| `--text-tertiary` | `var(--text-tertiary)` | `text-t-tertiary` |
| `--text-light` | `var(--text-light)` | `text-t-light` |
| `--backgrounds-surface1` | `var(--backgrounds-surface1)` | `bg-b-surface1` |
| `--backgrounds-surface2` | `var(--backgrounds-surface2)` | `bg-b-surface2` |
| `--stroke-stroke2` | `var(--stroke-stroke2)` | `border-s-stroke2` |
| `--stroke-subtle` | `var(--stroke-subtle)` | `border-s-subtle` |
| `--stroke-focus` | `var(--stroke-focus)` | `border-s-focus` |
| `primary-01` | `var(--primary-01)` (`#2a85ff`) | `bg-primary-01` |
| `primary-02..05` | `var(--primary-02..05)` | `bg-primary-02..05` |
| `--shade-01..10` | `var(--shade-01..10)` | `bg-shade-01..10` |

- Dark button gradient: `linear-gradient(to bottom, #2c2c2c, #282828)` with inner glow `inset 2px 0px 8px 2px rgba(248,248,248,0.2)` — encapsulated in `Button isBlack` prop.

### Typography

Font family for all text: **Inter Display**. Map Figma text styles to project typography mixins:

| Figma style | Size | Weight | Line-height | Mixin |
|---|---|---|---|---|
| H4 | 32px | 600 | 1.45 | `+h4` |
| Sub Title 1 | 16px | 600 | 1.5 | `+body-1` |
| Body 2 | 14px | 400 | 1.5 | `+body-2` |
| Button | 14px | 600 | 1 | `+button` |
| Caption 2 | 12px | 400 | 1.6 | `+caption` |

Button text uses `font-feature-settings: "ss01" 1`.

### Visual design conventions

- **Cards / panels**: `border-radius: 32px`, `background: var(--backgrounds-surface2)`, padding `8px`.
- **Circular icon buttons**: 48×48px, `border-radius: 90px`.
- **Pill buttons**: `border-radius: 32px`, `padding: 17px 28px`.
- **Product card image area**: `border-radius: 24px`, aspect ratio 355/244.
- **Page surface**: `background: var(--backgrounds-surface1)`, `border-radius: 32px`, `padding: 20px`.
- **Content max-width**: `1600px`, horizontal padding `120px`.
- **Card grid gap**: `24px`. **Section gap**: `40px`.
- **Depth/light shadow** (cards, floating surfaces): multi-layer drop shadow + `backdrop-filter: blur(64px)`.
