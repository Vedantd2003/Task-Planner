# Task Planner

A Kanban-style task planner built with Next.js.

## What it is
A Trello-like task board app built in Next.js, with drag-and-drop-style columns (To Do / In Progress / Done), task creation/editing, user assignment, and a Pages API route for board persistence.

## Demo
[TODO: add live demo link]

## Tech Stack
- Next.js 15 (App Router + a Pages API route)
- React 19
- Zustand (with `persist` middleware) for client-side state
- `nanoid` for ID generation
- Tailwind CSS 4

## Features
- Kanban board with three columns: To Do, In Progress, Done (`Board.jsx`, `Column.jsx`)
- Create/edit tasks via modal, with title, description, assignee, due date, and priority (`NewtaskModal.jsx`, `TaskCard.jsx`)
- Toggle task completion and delete tasks
- Add/remove users and assign tasks to them (`AssignUserSelect.jsx`)
- Local persistence via Zustand's `persist` middleware (localStorage)
- Mock API routes for board and user data (`app/pages/api/board.js`, `app/pages/api/users.js`) used as a fetch/save layer

## Local Setup
```bash
git clone https://github.com/Vedantd2003/Task-Planner.git
cd Task-Planner
npm install
npm run dev
```
Open http://localhost:3000.

## What I Learned
Combining Zustand's persisted store for the source of truth with simple API routes for board state gave a clean separation between client-side UI state and a (mock) server sync layer — useful groundwork for swapping in a real backend later.
