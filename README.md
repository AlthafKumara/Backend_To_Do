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

## API Documentation

Base URL: `http://localhost:3000` (or your Vercel deployment URL)

### Authentication

#### 1. Register User
- **Endpoint**: `POST /auth/register`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "name": "John Doe",       // required, string
    "email": "john@test.com", // required, string, valid email
    "password": "password123" // required, string, min 6 chars
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": "uuid-string",
        "name": "John Doe",
        "email": "john@test.com",
        "created_at": "timestamp"
      },
      "token": "jwt-token-string"
    }
  }
  ```

#### 2. Login User
- **Endpoint**: `POST /auth/login`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "john@test.com", // required
    "password": "password123" // required
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Login successful",
    "data": {
      "user": {
        "id": "uuid-string",
        "name": "John Doe",
        "email": "john@test.com",
        "created_at": "timestamp"
      },
      "token": "jwt-token-string"
    }
  }
  ```

#### 3. Update Profile
- **Endpoint**: `PUT /auth/profile`
- **Auth Required**: Yes (Bearer Token)
- **Request Body**:
  ```json
  {
    "name": "John Updated",   // optional
    "email": "[EMAIL_ADDRESS]", // optional, valid email
    "password": "newpassword" // optional, min 6 chars
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Profile updated successfully",
    "data": {
      "user": {
        "id": "uuid-string",
        "name": "John Updated",
        "email": "john@test.com",
        "created_at": "timestamp"
      }
    }
  }
  ```

#### 4. Logout
- **Endpoint**: `POST /auth/logout`
- **Auth Required**: No (but typically sent with token)
- **Request Body**: None
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Logged out successfully (Client should clear token)",
    "data": null
  }
  ```

### Categories

#### 1. Get All Categories
- **Endpoint**: `GET /categories`
- **Auth Required**: Yes
- **Request Body**: None
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Categories fetched successfully",
    "data": [
      {
        "id": 1,
        "name": "Work"
      },
      {
        "id": 2,
        "name": "Personal"
      }
    ]
  }
  ```

### Todos

#### 1. Create Todo
- **Endpoint**: `POST /todos`
- **Auth Required**: Yes
- **Request Body**:
  ```json
  {
    "title": "Buy Groceries",       // required, string
    "description": "Milk, Eggs",    // optional, string
    "status": "scheduled",          // optional, 'scheduled', 'pending', 'done', default 'scheduled'
    "start_at": "2023-12-30",       // optional, ISO date string
    "deadline": "2023-12-31",       // optional, ISO date string
    "priority": "medium",           // optional, 'low', 'medium', 'high', default 'medium'
    "category_id": 2                // required, integer (must exist in categories)
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "Todo created successfully",
    "data": {
      "id": "uuid-string",
      "user_id": "uuid-string",
      "title": "Buy Groceries",
      "description": "Milk, Eggs",
      "status": "scheduled",
      "start_at": "2023-12-30T00:00:00+00:00",
      "deadline": "2023-12-31T00:00:00+00:00",
      "priority": "medium",
      "category_id": 2,
      "created_at": "timestamp"
    }
  }
  ```

#### 2. Get All Todos
- **Endpoint**: `GET /todos`
- **Auth Required**: Yes
- **Request Body**: None
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Todos fetched successfully",
    "data": [
      {
        "id": "uuid",
        "title": "Buy Groceries",
        "status": "pending",
        "priority": "medium",
        "categories": {
          "name": "Personal"
        }
        // ... other fields
      }
    ]
  }
  ```

#### 3. Get Single Todo
- **Endpoint**: `GET /todos/:id`
- **Auth Required**: Yes
- **Request Body**: None
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Todo fetched successfully",
    "data": {
      // Todo object details
    }
  }
  ```

#### 4. Update Todo
- **Endpoint**: `PUT /todos/:id`
- **Auth Required**: Yes
- **Request Body** (Any combination of fields):
  ```json
  {
    "title": "Buy Healthy Groceries",
    "status": "done",
    "priority": "high"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "Todo updated successfully",
    "data": {
      // Updated Todo object
    }
  }
  ```

#### 5. Delete Todo
- **Endpoint**: `DELETE /todos/:id`
- **Auth Required**: Yes
- **Request Body**: None
- **Success Response (204 No Content)**:
  - No body returned.


