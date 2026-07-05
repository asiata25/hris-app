# Labourlink — Employee Dashboard

> A modern internal HR tool built with React 19, TypeScript, and Tailwind CSS v4.  
> Take-home assignment for the **Rock Paper Scissors (RPS)** Junior Frontend Developer position.

---

## 🚀 Live Demo

> _Deploy link will be added after production build is pushed to Vercel/Netlify._

---

## 📦 Setup

> **Prerequisites:** Node.js ≥ 20 and pnpm installed globally (`npm i -g pnpm`).

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/employee-dashboard.git
cd employee-dashboard

# 2. Install dependencies
pnpm install

# 3. (Optional) Configure the AI Summarizer
#    Create a .env.local file with your Anthropic API key:
echo "VITE_ANTHROPIC_API_KEY=sk-ant-..." > .env.local

# 4. Start the dev server
pnpm dev
```

The app will be available at **http://localhost:5173**.

> **Note on AI feature:** If `VITE_ANTHROPIC_API_KEY` is not set, the "Summarize" button on the Announcements detail page will render a graceful fallback message instead of calling the API. The rest of the app works fully without it.

---

## ✨ Features

| Screen                                 | Route                                       | Status     |
| -------------------------------------- | ------------------------------------------- | ---------- |
| Home Dashboard                         | `/`                                         | ✅ Done    |
| Team Directory                         | `/team`                                     | ✅ Done    |
| Attendance Dashboard                   | `/attendance`                               | ✅ Done    |
| Leave Summary                          | `/leave`                                    | ✅ Done    |
| Leave Request Form                     | `/leave/new`                                | ✅ Done    |
| Company Announcements                  | `/announcements`                            | ✅ Done    |
| Announcement Detail + AI Summarizer    | `/announcements/:id`                        | ❌ Not yet |
| Dark Mode                              | global toggle                               | ✅ Done    |
| Notification Panel                     | topbar bell icon                            | ✅ Done    |
| Support (Privacy, Contact, Report Bug) | `/privacy-terms`, `/contact`, `/report-bug` | ✅ Done    |

### Functional Highlights

- **Quick Attend widget** — check-in and check-out with live elapsed time directly from the home dashboard.
- **Attendance history** — 14-day team attendance calendar strip with per-day status breakdown and presence charts.
- **Leave balances** — progress bar cards for Annual, Sick, and Unpaid leave; balances update dynamically when a request is submitted.
- **Leave request form** — date validation (end ≥ start), required reason field, file attachment support, and immediate optimistic state update.
- **Team directory** — real-time search across name, role, and department; department filter dropdown; loading skeletons; empty state with filter clear.
- **Announcements feed** — editorial-style cards with body truncation toggle, category badges, and pagination.
- **AI Announcement Summarizer** — calls the Anthropic Claude API client-side; shows a spinner during the request and a graceful fallback on error.
- **Notification panel** — click-triggered dropdown anchored to the topbar bell icon; read/unread distinction; mixed leave and announcement content.
- **Dark / Light mode** — class-based theme toggle (`localStorage` persisted, blocking inline script in `index.html` prevents flash).

---

## 🗂 Architecture

The project uses a **feature-first folder structure** rather than a type-based one (e.g., no top-level `pages/` or `containers/` directories). Each domain lives in its own folder inside `src/features/`, making it easy to locate all related logic, components, and types for a given screen in one place.

```
src/
├── app/
│   ├── App.tsx              # RouterProvider mount point
│   └── router.tsx           # Route definitions (createBrowserRouter)
│
├── layouts/
│   ├── DashboardLayout.tsx  # Root shell: sidebar + topbar + <Outlet>
│   ├── sidebar/             # Sidebar nav, footer links, collapse logic
│   └── topbar/              # Topbar: search, notification panel, theme toggle
│
├── features/
│   ├── home/                # Home Dashboard, MetricCards, charts, QuickAttend
│   ├── team/                # Team Directory, filters, member table
│   ├── attendance/          # Attendance Dashboard, history strip, charts
│   ├── leave/               # Leave Dashboard, balances, request form
│   ├── announcements/       # Announcements feed, detail page, AI summarizer
│   └── support/             # Privacy/Terms, Contact, Report Bug
│
├── components/
│   └── ui/                  # Reusable primitives (see table below)
│
├── hooks/                   # Custom React hooks
├── lib/
│   ├── cn.ts                # clsx helper
│   └── mockDb.ts            # In-memory mock DB backed by localStorage
├── types/
│   └── index.ts             # Shared TypeScript types
└── index.css                # Tailwind v4 @theme tokens + dark/light variables
```

### UI Primitive Components (`src/components/ui/`)

| Component        | Purpose                                                                            |
| ---------------- | ---------------------------------------------------------------------------------- |
| `Button`         | Typed, ref-forwarded; variants: `primary`, `secondary`, `ghost`; sizes: `sm`, `md` |
| `Card`           | Standard surface container with border and padding                                 |
| `Badge`          | Status pill: `present`, `absent`, `pending`                                        |
| `Avatar`         | Initials fallback avatar with deterministic color                                  |
| `MetricCard`     | Stat tile with icon, label, value, and optional trend                              |
| `ProgressBar`    | Labelled percentage bar for leave balance display                                  |
| `InputField`     | Controlled text input with label and error state                                   |
| `TextArea`       | Controlled textarea with label and error state                                     |
| `SelectDropdown` | Controlled native select with label                                                |
| `DatePicker`     | Controlled date input wrapper                                                      |
| `FileUpload`     | Drag-and-drop + click file upload with preview list                                |
| `QuickAttend`    | Check-in / check-out widget with elapsed timer                                     |
| `PageHeader`     | Consistent page title + subtitle block                                             |
| `SectionHeader`  | Section-level heading with optional action slot                                    |
| `BodyText`       | Typography helper for prose content                                                |

### Mock Data Layer (`src/lib/mockDb.ts`)

All state is managed client-side via **localStorage** using a thin mock-DB module:

- **Seed data** is written once on first load (`initializeDb()`).
- **CRUD helpers** expose typed read/write functions (`getEmployeesFromDb`, `saveLeaveRequestsToDb`, etc.) so feature components never touch `localStorage` directly.
- **Attendance generation** is deterministic: 14 days × 12 employees, with weekends, random absences, and leave statuses derived from employee status.
- **Leave balance recalculation** runs automatically inside `saveLeaveRequestsToDb` — approved requests are summed to update the `used` field.

### Routing

React Router v8 (`react-router`, **not** `react-router-dom`) with `createBrowserRouter`. All routes are nested under `DashboardLayout`, which renders the sidebar and topbar. Leaf routes map 1:1 to feature page components.

### Theming

Tailwind CSS v4's `@theme` block declares token aliases (e.g. `--color-accent`) that map to CSS custom properties defined in `:root` (light) and `.dark` (dark). A blocking inline `<script>` in `index.html` reads `localStorage` before React hydrates, preventing a flash of wrong theme.

---

## 🛠 AI Tools Used

This project was built with **Antigravity (Google DeepMind)** as the primary AI pair-programming assistant, with the developer directing architecture decisions, reviewing every generated file, and writing business logic corrections.

| Task                                                      | AI involvement                | Written by hand                                    |
| --------------------------------------------------------- | ----------------------------- | -------------------------------------------------- |
| Project scaffolding (Vite config, tsconfig, path aliases) | Generated initial config      | Reviewed and corrected                             |
| Feature implementations (all 5 screens)                   | Generated component structure | Directed design, corrected logic, added validation |
| Mock data generation                                      | Generated seed data           | Shaped realistic names, status distributions       |
| CSS design tokens and dark mode                           | Suggested token names         | Chose all color values, tested contrast            |
| AI Summarizer integration                                 | Generated API call shape      | Wrote error handling and env guard                 |
| README                                                    | Drafted structure             | Written with full understanding of every section   |

> Per the assignment brief, a **2-3 minute screen-recording demo** narrating the app and AI tool usage is available at: _(link to be added after recording)_.

---

## ⚖️ Assumptions & Trade-offs

These were deliberate decisions made to stay within the assignment's time budget and rubric priorities:

| Decision                             | Reason                                                                                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **No auth / login system**           | Not required by the rubric; a mock current user (`CURRENT_USER_ID = "2"`, Johannes Kepler) is hardcoded. Adding auth would add risk with zero rubric reward. |
| **No real backend or database**      | `localStorage` with a typed mock-DB layer (`mockDb.ts`) is explicitly allowed. All state resets cleanly via `resetDb()`.                                     |
| **Client-side AI API call**          | Simplest path to a working demo; would be server-side in production (noted in UI).                                                                           |
| **One P1 bonus feature (dark mode)** | Responsive layout and dark mode were implemented; skipped voice search and AI chat — highest effort for lowest marginal rubric gain.                         |
| **No unit or integration tests**     | Time budget prioritized screen completeness and UI polish over test coverage for a take-home submission.                                                     |
| **No pixel-perfect Figma handoff**   | Design system uses consistent tokens and spacing from the start; visual consistency comes from the token layer, not component-by-component design specs.     |
| **`lucide-react` for all icons**     | Single dependency, comprehensive icon set, tree-shakeable — no need for a second icon library.                                                               |
| **`recharts` for charts**            | Composable, Tailwind-friendly, works well with React 19. Used on the Home Dashboard and Attendance screen.                                                   |

---

## 🧰 Tech Stack

| Layer           | Choice                                | Version |
| --------------- | ------------------------------------- | ------- |
| Framework       | React                                 | 19.x    |
| Language        | TypeScript (strict)                   | ~6.0    |
| Build tool      | Vite                                  | 8.x     |
| Styling         | Tailwind CSS v4 (`@tailwindcss/vite`) | 4.x     |
| Routing         | React Router (`react-router`)         | 8.x     |
| Icons           | lucide-react                          | 1.x     |
| Charts          | Recharts                              | 3.x     |
| CSS utility     | clsx                                  | 2.x     |
| AI API          | Anthropic Claude (claude-3-5-haiku)   | —       |
| Package manager | pnpm                                  | —       |

---

## 📝 Scripts

```bash
pnpm dev       # Start Vite dev server (http://localhost:5173)
pnpm build     # Type-check + production bundle (dist/)
pnpm preview   # Preview production build locally
pnpm lint      # Run ESLint
```

---

## 📁 Key Files at a Glance

| File                              | What it does                                     |
| --------------------------------- | ------------------------------------------------ |
| `src/app/router.tsx`              | All route definitions                            |
| `src/lib/mockDb.ts`               | Seed data + localStorage CRUD helpers            |
| `src/types/index.ts`              | Shared TypeScript interfaces                     |
| `src/index.css`                   | Tailwind @theme tokens, light/dark CSS variables |
| `src/layouts/DashboardLayout.tsx` | Root shell layout                                |

---

_Built by Lutfi Khoir — July 2026._
