# Frontend Mentor - Todo App Solution (Full Stack Edition)

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

**🚀 I took this challenge a step further by converting it into a secure Full-Stack Application with a real Database.**

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Project Structure](#project-structure)
  - [Database Setup](#database-setup)
  - [API Endpoints](#api-endpoints)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

**🔥 Full-Stack Features I Added:**
- **User Authentication**: Secure Register & Login system using `bcrypt` and `JWT`.
- **Persistent Data**: Data is stored in a **PostgreSQL** database (CRUD operations).
- **Protected Routes**: Restricting access to the dashboard for unauthenticated users.
- **Multi-User Support**: Each user sees only their own todos.
- **Axios Interceptors**: Automatically attaching JWT tokens to every request.

### Screenshot

![](./screenshot.jpg)
*(Note: Please add a screenshot of your project here)*

### Links

- Solution URL: [Add your solution URL here](https://your-solution-url.com)
- Live Site URL: [Add your live site URL here](https://your-live-site-url.com)

## My process

### Built with

**Frontend:**
- [React](https://reactjs.org/) - JS Library (v19)
- [Vite](https://vitejs.dev/) - Build tool
- [Axios](https://axios-http.com/) - HTTP Client
- [React Router](https://reactrouter.com/) - Navigation (v7)
- CSS Custom Properties (Variables)
- Flexbox & Grid

**Backend:**
- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework (v5)
- [PostgreSQL](https://www.postgresql.org/) - Relational Database
- [node-postgres (pg)](https://node-postgres.com/) - PostgreSQL client
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [JSON Web Token (JWT)](https://jwt.io/) - Authentication

### Project Structure

```text
todo-app-fullstack/
├── client/                # 🎨 FRONTEND (React)
│   ├── src/
│   │   ├── api/           # Axios interceptors configuration
│   │   ├── components/    # Header, Input, TodoList, Footer
│   │   ├── context/       # AuthContext for global state
│   │   ├── pages/         # Login, Register, TodoPage
│   │   └── App.jsx        # Routing and Protected Routes
│   └── ...
│
└── server/                # ⚙️ BACKEND (Node.js/Express)
    ├── config/            # Database connection (db.js)
    ├── controllers/       # Business logic (auth & todo logic)
    ├── middleware/        # JWT Authentication middleware
    ├── routes/            # API Routes definitions
    └── index.js           # Server entry point
```

#### Database Setup
To run this project locally, you need to set up a PostgreSQL database. Run these SQL commands in your query tool (pgAdmin or terminal):

```sql
CREATE DATABASE todo_app;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_todos_user_id ON todos(user_id);
```

### API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/todos` | Get all todos for logged user | ✅ |
| `POST` | `/todos` | Create a new todo | ✅ |
| `PUT` | `/todos/:id` | Update todo status (toggle) | ✅ |
| `DELETE` | `/todos/:id` | Delete a todo | ✅ |

### What I learned

This project was a major milestone in my journey from Frontend to Full-Stack development. Here are the key concepts I mastered:

1.  **Separation of Concerns:** I learned how to separate the "View" (React) from the "Logic/Data" (Node.js API).
2.  **Stateless Architecture:** Understanding that the server doesn't remember the user, so we must send a "Token" with every request.
3.  **Security:** I learned never to store plain-text passwords. I used `bcrypt` to hash them and `JWT` to manage sessions securely.
4.  **Protected Routes:** Implementing a logic in React that redirects unauthenticated users to the login page.

**Code Snippet - Axios Interceptor for Automatic Token Injection:**

```javascript
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
```
## Author

- Frontend Mentor - [@ylmzhnf](https://www.frontendmentor.io/profile/ylmzhnf)
