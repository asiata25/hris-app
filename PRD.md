# Employee Dashboard — Take-Home Assignment Plan

**Company:** Rock Paper Scissors (RPS) — Junior Frontend Developer
**Received:** Jul 3, 2026, 7:43 PM
**Real deadline:** Jul 5, ~7:43 PM (email says "within two days" — treat this as the hard limit, not the PDF's "2-3 working days")
**Reviewer:** Ananya Rao

---

Given the rubric weights, here's where your hours should go:

| Criteria           | Weight | Your time allocation                              |
| ------------------ | ------ | ------------------------------------------------- |
| React Fundamentals | 25%    | High                                              |
| Code Quality       | 20%    | High                                              |
| UI/UX              | 20%    | High                                              |
| AI Feature         | 15%    | Medium                                            |
| State Management   | 10%    | Medium                                            |
| Documentation      | 5%     | Low effort, high leverage (do it well, it's fast) |
| Creativity         | 5%     | Free — comes from polish, not extra features      |

65% of your score is React fundamentals + code quality + UI/UX. **Do NOT spend time on bonus features until the 5 core screens are clean.** A polished 5-screen app beats a buggy 8-screen app every time in a junior review.

---

## 1. Problem Statement

RPS wants to see whether you can independently build a small, realistic internal tool (an HR/employee dashboard) using modern frontend practices, integrate one AI-powered feature, and document your engineering decisions — within a tight timebox that simulates real sprint pressure.

## 2. Goals (what "done" looks like)

1. All 5 functional requirements are implemented and demoable, not just stubbed.
2. Code is componentized, typed, and readable enough that a stranger could onboard from the README alone.
3. One AI feature works end-to-end with a visible, understandable output (not just an API call with no UI payoff).
4. The app doesn't look like a bootcamp project — spend real UI budget here, it's 20% of the score and the cheapest points to win.
5. Submission is live: a deployed link + repo, no "clone and run" friction for the reviewer.

## 3. Non-Goals (say no to these, on purpose)

- **Auth/login system** — not required, adds risk for no rubric points. Mock a logged-in user.
- **Real backend/DB** — mock JSON or local state is explicitly allowed. Don't build a backend.
- **Multiple bonus features** — pick **one** bonus max (see Day 2 section) after core is solid. Spreading thin hurts Code Quality and UI/UX more than one bonus helps you.
- **Pixel-perfect design system** — good, consistent, and clean beats "designed from scratch in Figma." Use shadcn/ui or similar to move fast without looking generic.
- **Voice search / AI chat assistant** — highest-effort bonus items for the least rubric weight (15% split across "AI Feature" and any bonus credit). Skip unless Day 2 goes very smoothly.

## 4. Scope — Must-Have (P0)

All 5 are explicitly required; none are optional:

1. **Attendance Dashboard** — Given mock daily attendance data, when the user opens the dashboard, then they see today's status + a recent history view (table or simple calendar strip).
2. **Leave Summary** — Given a mock leave balance object, when the user views the summary, then they see leave types (e.g. Annual, Sick, Unpaid) with used/remaining counts, visually (progress bars or simple cards).
3. **Leave Request Form** — Given the form, when the user submits Start Date, End Date, Leave Type, Reason, then a new leave request is added to local/mock state, validated (end ≥ start, reason not empty), with a success/error state shown.
4. **Team Directory** — Given a mock list of employees, when the user searches or filters (by name, department, or role), then the list updates live with no full-page reload, and shows an empty state when no match.
5. **Company Announcements** — Given mock announcement data, when the user opens the announcements panel, then they see a list of posts (title, date, body) — this feeds directly into your AI feature (#6).

## 5. Scope — Required AI Feature (P0, 15% of score)

**Recommendation: AI Announcement Summarizer.**
Why this one specifically, not AI chat or voice search: it's the least engineering-risky (no state machine for a whole conversation), it's easy to demo in 30 seconds, and it visibly ties into a core requirement (Announcements) rather than sitting bolted on the side.

- Given a long announcement, when the user clicks "Summarize," then a 1-2 sentence AI-generated summary appears (loading state while waiting, graceful fallback text if the API call fails).
- Use the Anthropic API (Claude) directly, or any LLM API you have a key for — a client-side call is fine for a take-home; just say so in the README as a known trade-off ("in production this would be server-side to protect the API key").

## 6. Scope — Nice-to-Have (P1, pick ONE if time allows on Day 2)

Ranked by effort-to-payoff ratio for a junior React portfolio:

1. **Responsive design** — do this regardless, it's nearly free if you use Tailwind properly from the start, and its absence is very noticeable to a reviewer on their phone.
2. **Dark mode** — cheap with Tailwind's `dark:` variants + a toggle in state; high visual "wow" for low effort.
3. **Loading states / skeletons** — cheap, and directly supports "attention to detail" in the rubric.
4. **Charts** (e.g. attendance trend) — moderate effort, strong visual payoff on the Attendance screen specifically.

Treat responsive + loading states as near-P0 (they're cheap and reviewers notice their absence). Dark mode and charts are the actual optional bonus slots.

## 7. Non-Goals for AI usage disclosure

The email explicitly says AI tools are fine — **and asks for a video demo if you use them.** Don't skip this: record a 2-3 min screen recording narrating what you built and how you used AI tools (Claude Code, Cursor, whatever you use). This is a required deliverable per the email, not optional bonus.

## 8. Day-by-Day Plan (~30 hour budget)

**Day 1 (today) — Foundation + 3 of 5 screens**

- [ ] 30 min: Scaffold project (Vite + React + TS + Tailwind), set up folder structure, mock JSON data files for employees/attendance/leave/announcements
  - **Partial:** Vite + React + TS + Tailwind are scaffolded, base folder structure exists (`app`, `layouts`, `components/ui`, `features`), but mock JSON/data files are not added yet.
- [x] 30 min: Layout shell — sidebar/nav + routing (React Router), responsive breakpoints from the start
  - **Done:** Dashboard layout, sidebar navigation, topbar, React Router routes, and responsive spacing/visibility patterns are in place.
- [ ] 2-3 hrs: Team Directory (search/filter) — do this first, it's the most "React fundamentals"-heavy one (derived state, controlled inputs)
  - **Not started:** `/team` route exists, but it is still a placeholder.
- [ ] 2-3 hrs: Attendance Dashboard
  - **Not started:** `/attendance` route exists, but it is still a placeholder.
- [ ] 2-3 hrs: Leave Summary
  - **Not started:** `/leave` route exists, but it is still a placeholder.
- [x] Commit frequently with clear messages — reviewers sometimes skim commit history for process, not just the final diff
  - **In progress:** Initial scaffold, Tailwind setup, and layout/routing work have separate commits.

**Day 2 — Remaining screens + AI feature + polish**

- [ ] 2 hrs: Leave Request Form (with validation)
  - **Not started:** No request form or leave state mutation yet.
- [ ] 2 hrs: Company Announcements + AI Summarizer integration
  - **Not started:** No announcements route/data or summarizer UI yet.
- [x] 1-2 hrs: Pick ONE P1 bonus (responsive polish / dark mode / loading states)
  - **Done:** Dark mode toggle is implemented in the topbar with `localStorage` persistence and theme CSS variables.
- [ ] 1 hr: Deploy (Vercel/Netlify — push button, don't overthink hosting)
  - **Not started:** No deployment config or live URL recorded yet.
- [ ] 1-2 hrs: README (setup, architecture, AI tools used, assumptions/trade-offs) + record the AI-usage video demo
  - **Not started:** README still contains the default Vite template content; AI-usage demo still needs to be recorded.
- [ ] Buffer: 2-3 hrs for bugs, because there will be bugs
  - **Pending:** Use after core screens and README are complete.

## 9. README Structure (5% weight, but also your first impression)

1. **Setup** — exact commands, nothing assumed
2. **Architecture** — folder structure + why (e.g. "features/ folder per domain, not type-based, for scalability")
3. **AI tools used** — be specific and honest: what you used Claude/Cursor for, what you wrote yourself, what you'd change with more time
4. **Assumptions & trade-offs** — explicitly list your Non-Goals from Section 3. This signals judgment, which is exactly what a junior-to-mid transition candidate should be showing.
