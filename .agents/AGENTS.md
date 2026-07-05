# Workspace Agent Rules: Employee Dashboard

These rules guide the development of the Employee Dashboard application. Always follow these rules for code consistency, folder structure, design tokens, component architecture, and styling patterns.

---

## 1. Project Technology Stack

- **Framework**: Vite + React 19 + TypeScript (Strict Mode).
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin).
- **Routing**: React Router v8. Always import core routing components (`createBrowserRouter`, `RouterProvider`, `NavLink`, `Outlet`, `useNavigate`, etc.) from **`react-router`** (do NOT use `react-router-dom`).
- **CSS Utility**: `clsx` (no `tailwind-merge` or `cva` unless scale demands).
- **Icons**: `lucide-react`.

---

## 2. Folder Structure

Always respect the following project structure. Place code files in their designated directories:

```text
src/
├── app/
│   ├── App.tsx          # RouterProvider mount point
│   └── router.tsx       # Route definitions & home screen
├── layouts/
│   ├── DashboardLayout.tsx
│   ├── Sidebar.tsx      # Sidebar navigation
│   └── Topbar.tsx       # Header with search, user profile, theme toggle
├── features/
│   ├── team/            # Team feature module (stubs/files)
│   ├── attendance/      # Attendance feature module (stubs/files)
│   └── leave/           # Leave feature module (stubs/files)
├── components/
│   └── ui/              # Global UI Primitives
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
├── hooks/               # Custom hooks
├── lib/
│   └── cn.ts            # Helper function using clsx
├── types/
│   └── index.ts         # TypeScript shared types
├── index.css            # Stylesheet (Tailwind v4 tokens ONLY)
└── main.tsx             # Application bootloader
```

---

## 3. Path Aliases

Always use the `@/` path prefix alias pointing to `./src/` directory (e.g. `import { Button } from "@/components/ui/Button"`).

---

## 4. Theme & Design Tokens (`src/index.css`)

All color/radius/typography values must map to the token definitions in `src/index.css`.
- Do NOT write raw hex values or arbitrary Tailwind values (like `bg-[#0F1115]`) in component files.
- The theme supports dynamic **Light** and **Dark** modes using CSS custom properties triggered by the `.dark` class on the `<html>` element.

### Colors and Theme Variables:
```css
/* Light Theme (Default) */
:root {
  --surface: #F8FAFC;
  --surface-raised: #FFFFFF;
  --accent: #4F7CFF;
  --accent-muted: #E0E7FF;
  --ink: #0F1115;
  --ink-muted: #64748B;
  --status-present: #10B981;
  --status-absent: #EF4444;
  --status-pending: #F59E0B;
}

/* Dark Theme (Class-based override) */
.dark {
  --surface: #0F1115;
  --surface-raised: #171A21;
  --accent: #4F7CFF;
  --accent-muted: #2A3B66;
  --ink: #E7E9EE;
  --ink-muted: #8B90A0;
  --status-present: #3DD68C;
  --status-absent: #FF6B6B;
  --status-pending: #F4B740;
}
```

---

## 5. Component Development Guidelines

### Primitives (components/ui/):
- **`Button.tsx`**: Typed attributes, `ref` forwarding, sizes (`sm`, `md`), and variants:
  - `primary`: `bg-accent text-white hover:bg-accent/90`
  - `secondary`: `bg-surface-raised border border-ink-muted/20 text-ink hover:bg-surface-raised/80`
  - `ghost`: `bg-transparent text-ink hover:bg-surface-raised/80`
- **`Card.tsx`**: Styled container (`bg-surface-raised rounded-md p-6 border border-ink-muted/10 text-ink`).
- **`Badge.tsx`**: Status pill variants (`present`, `absent`, `pending`) mapping to opacity-muted background status colors (e.g. `bg-status-present/20 text-status-present`).

### Layout Components (layouts/):
- **Theme Selection**: Theme selection is state-driven in `Topbar.tsx` and initialized in `index.html` via an inline blocking script.
- **Sidebar Navigation**: Active sidebar items are highlighted using `bg-accent/10 text-accent font-semibold` and an accent-colored border strip indicator on the active route.
