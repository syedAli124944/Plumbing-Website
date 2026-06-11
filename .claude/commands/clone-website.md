# /clone-website — Website Reverse-Engineering Skill

Reverse-engineer any website and rebuild it as a pixel-perfect clone.

## Usage
```
/clone-website <target-url>
```

---

## Pipeline Overview

When this command is triggered with a `<target-url>`, execute the following **multi-phase pipeline**:

---

## Phase 1: Reconnaissance

1. Open the target URL in the browser (via Chrome MCP or screenshot tool).
2. Capture **screenshots** of:
   - Desktop, tablet, and mobile viewports
   - Dark/light mode variants (if applicable)
   - Key interaction states: hover, active, open menus, modals, loading, empty, error
3. Extract **design tokens** using DevTools / `getComputedStyle()`:
   - Colors: background, text (primary/secondary/muted), accent, border, hover, error, success
   - Typography: font family, sizes (h1–h6, body, caption, label), weights, line heights, letter spacing
   - Spacing: padding/margin scale (4px, 8px, 12px, 16px, 24px, 32px, etc.)
   - Border radius: buttons, cards, avatars, inputs
   - Shadows/elevation: cards, dropdowns, modals
   - Breakpoints: at which widths does layout shift?
   - Icons: library used, custom SVGs, sizes
4. Perform an **interaction sweep**: scroll, click all nav items, hover interactive elements, check responsive layout
5. Analyze **tech stack**: check for `__NEXT_DATA__`, `__NUXT__`, `ng-version`, network tab for GraphQL, font loading strategy, image CDN patterns

Save all screenshots to `docs/design-references/`.

---

## Phase 2: Foundation Setup

1. Update `src/app/globals.css` with extracted design tokens (oklch color palette, font imports, spacing scale)
2. Update `tailwind.config.ts` with custom tokens
3. Download all assets:
   - Images → `public/images/`
   - Videos → `public/videos/`
   - Favicons/OG images → `public/seo/`
4. Configure fonts (Next.js `next/font` or CSS `@font-face`)

---

## Phase 3: Component Specifications

For each distinct UI section/component, write a detailed spec file in `docs/research/components/<ComponentName>.md` containing:
- **Structure**: HTML elements and child components
- **Variants**: sizes, colors, states
- **States**: default, hover, active, disabled, loading, error, empty
- **Responsive behavior**: layout changes at each breakpoint
- **Interactions**: click, hover, focus, keyboard, animations
- **Exact CSS values**: from `getComputedStyle()` — no guessing
- **Content**: actual text, copy, and asset paths from the target

Also create:
- `docs/research/DESIGN_TOKENS.md`
- `docs/research/COMPONENT_INVENTORY.md`
- `docs/research/LAYOUT_ARCHITECTURE.md`
- `docs/research/INTERACTION_PATTERNS.md`
- `docs/research/TECH_STACK_ANALYSIS.md`

---

## Phase 4: Parallel Build (Agent Worktrees)

1. Identify all major page sections/components from the inventory
2. For each section, **dispatch a builder sub-agent** working in its own **git worktree branch**:
   ```
   git worktree add ../clone-<section-name> -b feat/<section-name>
   ```
3. Each agent receives:
   - The full component spec file inline
   - Exact computed CSS values
   - Asset paths
   - Interaction models and responsive breakpoints
4. Agents build their section as a standalone React component under `src/components/`
5. **No guessing** — every value must come from the spec

> **CRITICAL RULE**: Each builder agent ALWAYS works in its own worktree branch. Never build multiple sections in the same branch in parallel.

---

## Phase 5: Assembly & QA

1. Merge all worktree branches into `main`, resolving conflicts with full context of goals
2. Wire up `src/app/page.tsx` to compose all sections in correct order
3. Run `npm run dev` and take a screenshot of the result
4. Run a **visual diff** against the original site screenshots from Phase 1
5. Identify gaps — spacing, colors, interactions, missing states
6. Iterate until the clone matches the original

---

## Design Principles

- **Pixel-perfect emulation** — match spacing, colors, typography exactly
- **No personal aesthetic changes during emulation phase** — match 1:1 first, customize later
- **Real content** — use actual text and assets from the target site, not placeholders
- **Beauty-first** — every pixel matters

---

## Output

When complete, report:
- ✅ Sections built
- ⚠️ Known gaps or deviations from the original
- 🖼️ Screenshot comparison
- 📁 Files created
