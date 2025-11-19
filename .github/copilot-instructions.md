Welcome — quick instructions for AI coding agents working in this repository.

Purpose
- This file captures the project-specific conventions, developer workflows, and integration points an AI coding agent should know to be immediately productive.

Project overview
- Framework: Next.js (app router) — see `src/app/layout.tsx` and `src/app/page.tsx` for entry points.
- Styling: Tailwind CSS with utility components under `src/components/ui/*`.
- State & context: authentication and language are implemented via `src/context/AuthContext.tsx` and `src/context/LanguageContext.tsx`.
- Translations: localized JSON files in `src/lib/locales/{en,es,pt}/common.json` managed by `next-i18next.config.js`.
- AI integrations: `genkit` + `@genkit-ai/googleai` configured in `src/ai/genkit.ts` (model set to `googleai/gemini-2.0-flash`).

Key commands
- Start frontend dev server: `npm run dev` (uses `next dev --turbopack -p 9002`).
- Start Genkit AI dev runner: `npm run genkit:dev` (runs `tsx src/ai/dev.ts`).
- Genkit watch mode: `npm run genkit:watch`.
- Build: `npm run build`. Lint/typecheck: `npm run lint` / `npm run typecheck`.

AI / Genkit notes
- Credentials and environment: `src/ai/dev.ts` loads `dotenv`. Ensure required API keys are present in environment when running `genkit` tasks.
- Plugin setup: `src/ai/genkit.ts` instantiates `genkit({ plugins: [googleAI()], model: 'googleai/gemini-2.0-flash' })`. When writing or updating AI code, mirror this pattern and prefer using the shared `ai` export.
- Typical workflow: use `npm run genkit:dev` to iterate on AI scripts in `src/ai/*`. `genkit` scripts run with Node/TS via `tsx`.

Repository patterns & conventions
- App router layout: use files under `src/app/*` for routes and nested layouts (see `src/app/demo/*`).
- Component primitives: `src/components/ui/*` holds reusable low-level UI building blocks (Radix wrappers). Higher-level components live in `src/components` (e.g., `FlightSearchForm.tsx`).
- CSS/class merging: use `cn()` from `src/lib/utils.ts` (wraps `clsx` + `twMerge`) instead of manual string concatenation.
- Client vs server: Next 13+ app router conventions apply — be mindful of "use client" directives in interactive components.
- Localization keys: prefer keys in `src/lib/locales/*/common.json` and `next-i18next.config.js` for language switching.

Integration & infra points
- Firebase: `firebase` is a dependency — authentication and DB may be wired elsewhere (search `firebase` usages). Be cautious when altering auth flows.
- Remote images: `next.config.ts` lists trusted hosts (e.g., `gate.shyaviation.com`, `placehold.co`). If adding external images update `next.config.ts` accordingly.

Editing guidelines for AI agents
- Preserve existing component API shapes — prefer minimal, focused changes to maintain Next.js conventions.
- When adding server-side code (API routes / server components), follow `src/app` routing and avoid introducing new global state without context providers.
- Example patterns to mimic:
  - `src/ai/genkit.ts` — single shared AI client export.
  - `src/lib/utils.ts` — small, single-purpose utility helpers.
  - `src/components/ui/*` — small composable primitives with clear props.

What not to guess
- Do not invent environment variables or secret keys. If an API key or config is required, add a clear TODO and reference `src/ai/dev.ts`'s use of `dotenv`.
- Do not change `next.config.ts` TypeScript / ESLint ignores without confirming the rationale — these were intentionally set (`ignoreBuildErrors`, `ignoreDuringBuilds`).

If you modify this file
- Merge rather than replace if a human-maintained `.github/copilot-instructions.md` exists. Preserve any hand-written policy or contact info.

Questions / next steps
- If anything below is unclear or you want more examples (e.g., common commit message formats or branch names), tell me which area to expand.

-- end --
