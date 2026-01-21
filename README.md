# To-Do REST API

A production-ready REST API for a To-Do application built with Node.js, Express, and Supabase.

## Features
- **Authentication**: JWT-based auth (Register, Login, Profile).
- **Todo Management**: CRUD operations, filtering by user.
- **Categories**: Predefined categories for better organization.
- **Security**: Password hashing, Input validation, Protected routes.
- **Architecture**: Clean architecture (Controllers, Services, Routes).

## Tech Stack
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: Supabase (PostgreSQL)
-   **Validation**: Joi
-   **Deployment**: Vercel

## Setup

1.  **Clone the repository**.
2.  **Install dependencies**: `npm install`.
3.  **Setup Database**: Run `supabase_schema.sql` in your Supabase SQL Editor.
4.  **Configure Environment**: Create `.env` file with Supabase credentials (see `.env.example`).
5.  **Run**: `npm start`.

## API Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `PUT /auth/profile`

### Todos
- `GET /todos`
- `POST /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `DELETE /todos/:id`

### Categories
- `GET /categories`
