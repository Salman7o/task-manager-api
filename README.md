# ✅ Task Manager API — TypeScript + Express

A clean RESTful API for managing tasks, built with TypeScript and Express.js. Features full CRUD operations, filtering, priority levels, and status tracking.

## Features

- Full CRUD — Create, Read, Update, Delete tasks
- Filter tasks by `status` or `priority` via query params
- Task stats endpoint (total, by status, high priority count)
- Strongly typed with TypeScript interfaces throughout
- Clean architecture: routes → controllers → models
- CORS enabled, request logging with Morgan

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript |
| Runtime | Node.js |
| Framework | Express.js |
| ID Generation | uuid |
| Logging | Morgan |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Salman7o/task-manager-api.git
cd task-manager-api

# Install dependencies
npm install

# Run in development mode (hot reload)
npm run dev

# Build for production
npm run build
npm start
```

Server runs at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/tasks/stats` | Get task statistics |

### Query Filters
```
GET /api/tasks?status=todo
GET /api/tasks?priority=high
GET /api/tasks?status=in-progress&priority=medium
```

### Create Task — Request Body
```json
{
  "title": "Build portfolio website",
  "description": "React + Tailwind",
  "priority": "high",
  "dueDate": "2026-07-01"
}
```

### Update Task — Request Body
```json
{
  "status": "in-progress",
  "priority": "medium"
}
```

## Project Structure

```
src/
├── index.ts                      # App entry point
├── models/
│   └── task.model.ts             # TypeScript interfaces & types
├── controllers/
│   └── task.controller.ts        # Business logic
├── routes/
│   └── task.routes.ts            # Route definitions
└── middleware/
    └── error.middleware.ts       # 404 + error handlers
```

## Author

**Salman Hamzo** — [GitHub](https://github.com/Salman7o) | [Portfolio](https://salman-portfolio-8bc67.web.app/)
