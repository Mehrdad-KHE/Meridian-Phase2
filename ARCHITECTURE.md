# ARCHITECTURE

Updated: 2026-05-15

## Current Architecture

The app is a Vite-based React 18 + TypeScript single-page application.

### Entry Flow

```text
index.html
  -> src/main.tsx
    -> app/App.tsx
      -> AppProvider
      -> Layout
      -> active screen renderer
```

### Main Modules

- `app/App.tsx`
  - mounts the app shell
  - selects the current screen from `state.currentScreen`
  - wraps the UI in error boundaries and the toaster
- `app/context/AppContext.tsx`
  - owns the local application state
  - exposes all CRUD and workflow actions
  - keeps the workflow entirely in memory
- `app/types/index.ts`
  - defines firms, clients, periods, cases, documents, transactions, review items, accountant questions, vendor rules, audit events, and app state
- `app/data/sampleData.ts`
  - provides empty state and seeded demo state
- `app/screens/*`
  - contains the major workflow screens
- `app/components/*`
  - contains layout, error boundary, and shared UI primitives
- `styles/*`
  - contains the global styles and theme files

## State Model

- State is local and context-driven.
- There is no backend database wired into this prototype.
- Audit events are recorded in app state.
- Screen navigation is controlled by `state.currentScreen`.

## Technology Stack

- React 18.3.1
- TypeScript 5.8.3
- Vite 6.3.5
- Tailwind CSS 4.1.12
- Radix UI primitives
- Lucide React icons
- Sonner toasts
- React Router 7.13.0
- Recharts 2.15.2
- React DnD 16.0.1
- MUI and Emotion are installed in the project dependencies

## Architecture Rules

- Keep the existing file structure intact unless a task explicitly requires change.
- Keep `AppContext` as the local state authority for this prototype.
- Do not introduce hidden architecture changes through control-doc edits.
