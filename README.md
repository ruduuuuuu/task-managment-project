# Task Management Application

A full-stack task management application built with Next.js (frontend) and Express + TypeORM (backend) with MySQL database.

## Features

### Authentication
- User registration with name, email, and password
- User login with email and password
- JWT token-based authentication for staying logged in
- Secure password hashing using bcrypt
- Logout functionality

### Task Management
- Create, read, update, and delete tasks
- Each task includes:
  - Title (required)
  - Description (optional)
  - Priority: Low / Medium / High
  - Due Date (optional)
  - Status: Pending / Completed
  - Created At, Updated At timestamps
- Users can only access their own tasks

### Filters & Sorting
- Filter tasks by status (Pending / Completed)
- Filter tasks by priority (Low / Medium / High)
- Sort tasks by:
  - Due Date (ascending)
  - Created Date (latest first)

### Due Date Indicator
- Displays "Due in X days" for upcoming tasks
- Shows "Overdue by X days" for past due tasks
- "Due today" for tasks due today

## Project Structure

```
task-managment-project/
├── backend/          # NestJS + TypeORM backend
│   ├── src/
│   │   ├── entities/ # TypeORM entities (User, Task)
│   │   ├── auth/     # Authentication module (controller, service, DTOs, strategy)
│   │   ├── tasks/    # Tasks module (controller, service, DTOs)
│   │   ├── users/    # Users module (service)
│   │   ├── common/   # Common guards and decorators
│   │   ├── app.module.ts # Root module
│   │   └── main.ts   # Entry point
│   └── .env         # Backend environment variables
└── frontend/        # Next.js frontend
    ├── app/         # Next.js app directory
    ├── lib/         # API utilities
    └── .env.local   # Frontend environment variables
```

## Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn

## Database Setup

The application expects MySQL tables to already exist. Based on your schema:

**Users table:**
- id (varchar(36), PRIMARY KEY)
- name (varchar(255))
- email (varchar(255), UNIQUE)
- password (varchar(255))
- createdAt (datetime(6))
- updatedAt (datetime(6))

**Tasks table:**
- id (varchar(36), PRIMARY KEY)
- title (varchar(255))
- description (text, nullable)
- priority (enum: 'Low', 'Medium', 'High')
- dueDate (date, nullable)
- status (enum: 'Pending', 'Completed')
- userId (varchar(255))
- createdAt (datetime(6))
- updatedAt (datetime(6))

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=your_database_name
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Register a new account or login
4. Start creating and managing your tasks!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks (All require authentication)
- `GET /api/tasks` - Get all tasks (with optional filters: status, priority, sortBy)
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Notes

- The `.env` and `.env.local` files are for local development
- Remember to update `.gitignore` before committing to remove `.env` files from version control
- JWT_SECRET should be changed to a secure random string in production
- The database tables should already exist - the application uses `synchronize: false` in TypeORM

## Technologies Used

**Backend:**
- NestJS
- TypeORM
- MySQL2
- JWT (Passport JWT Strategy)
- bcryptjs
- TypeScript
- class-validator (DTOs)

**Frontend:**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios


npm install  .....same for both
npm run dev

npm run start:dev   # backend