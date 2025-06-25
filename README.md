# 📊 Audit Logs Dashboard – Role-based Admin Panel (Next.js 15)

An Admin-only dashboard for tracking user activity logs such as logins, role changes, and actions. Built with **Next.js 15 App Router**, **MongoDB**, and **NextAuth**, it offers real-time updates, role-based access control, and clean UI powered by Tailwind CSS.

---

## 🚀 Features
- ✅ **Admin-only** access with secure session handling
- 📡 **Live Polling** for real-time log updates (SWR)
- 🔍 **Role Filtering** (`Admin`, `Editor`, `Viewer`, `All`)
- 📑 **Pagination** support for efficient navigation
- 🧩 **Modular architecture** with service and hook layers
- 🪪 **Session-based user data** using NextAuth
- 🔧 **Log meta** includes IP + browser info (via `getIP` and `getBrowserMeta`)
- 🎨 Clean, responsive UI with Tailwind CSS

---

## 🛠️ Getting Started

### ⚙️ 1. Clone the repository
git clone https://github.com/anshu-sharma0/next-test.git

```bash
This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### 📦 2. Install dependencies
npm install

### ➕ 3. How to Log a New User Action (Add User)
Only admins can create new users. Here’s how:

Log in using an admin account

Navigate to "Add User" from the Navbar

Fill out the form fields:

Name, Email, Password, Role (admin / editor / viewer)

Click "Add User"

The user will be saved in the database and a log will be created automatically

📤 Add User API – POST /api/admin/addUser

✅ Request Body (JSON)

| Field      | Type     | Required | Description                                |
| ---------- | -------- | -------- | ------------------------------------------ |
| `name`     | `string` | ✅        | Full name of the user                      |
| `email`    | `string` | ✅        | Valid email address                        |
| `password` | `string` | ✅        | Raw password (will be hashed internally)   |
| `role`     | `string` | ✅        | Must be one of `admin`, `editor`, `viewer` |

📌 Example Request (from AddUser form):

{
  "name": "Anshu Sharma",
  "email": "anshu@example.com",
  "password": "secret123",
  "role": "admin"
}

✅ Successful Response (200 OK)
{
  "message": "User added successfully",
  "status": 200,
  "data": {
    "_id": "665bca9e131f861b6a93aaef",
    "name": "Anshu Sharma",
    "email": "anshu@example.com",
    "role": "admin",
    "password": "$2a$10$hashed_password_here",
    "createdAt": "2025-06-25T12:34:56.000Z",
    "__v": 0
  }
}

❌ Error Responses
1. Missing fields – 400 Bad Request
{
  "error": "Name, role, and password are required"
}

2. Duplicate Email – 409 Conflict
{
  "error": "User already exists"
}

3. Server error – 500 Internal Server Error
{
  "error": "Server error"
}


### 4. Store the .env in root folder with keys -
MONGODB_URI

JWT_SECRET
