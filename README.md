# 🎬 Movie List App

A simple movie list application with **authentication, pagination, search, and CRUD operations**, built using **NestJS (backend)** and **React (frontend)**.

---

## 📌 Features

✔ User authentication (**signup, login, JWT-based authorization**)  
✔ Add, delete, and list movies (**per user**)  
✔ Prevent duplicate movie entries (**case insensitive**)  
✔ Search movies dynamically (**live search**)  
✔ Pagination for better performance  
✔ **Bootstrap for styling** (responsive design)  
✔ **Docker support for MySQL**

---

## 🚀 Tech Stack

### 🔹 Backend:
- [NestJS](https://nestjs.com/) (TypeScript-based Node.js framework)
- [Prisma ORM](https://www.prisma.io/) (Database queries & migrations)
- [MySQL](https://www.mysql.com/) (Relational database)
- [JWT Authentication](https://jwt.io/) (Secure user authentication)

### 🔹 Frontend:
- [React](https://reactjs.org/) (Component-based UI framework)
- [React Query](https://react-query.tanstack.com/) (Efficient API data fetching & caching)
- [React Bootstrap](https://react-bootstrap.github.io/) (Pre-styled UI components)
- [React Hook Form](https://react-hook-form.com/) (Form validation)
- [Zod](https://zod.dev/) (Schema-based validation)

---

## ⚙️ Setup & Installation

### 📌 1. Clone the Repository
Clone the repository and navigate into the project

---

## 📦 Backend Setup

### 📌 2. Install Dependencies
Navigate to the `backend` directory and install dependencies:

`cd backend`

`npm install`

### 📌 3. Configure Environment Variables
Create a **`.env`** file in `backend/` and add the following:

DATABASE_URL="mysql://user:password123@localhost:3306/movies"  
JWT_SECRET="your_secret_key"

### 📌 4. Run Database Migrations
Apply database migrations:

`npx prisma migrate`

### 📌 5. Seed Database (Optional)
Populate the database with sample data:

`npm run seed`

**User Credentials:**

**Email:** user@example.com  
**Password:** Password123

### 📌 6. Start Backend
Run the NestJS backend:

`npm run start`

Backend should now be running on **`http://localhost:8000`** 🚀

---

## 🌐 Frontend Setup

### 📌 7. Install Dependencies
Navigate to the `frontend` directory and install dependencies:

`cd ../frontend`

`npm install`

### 📌 8. Start Frontend
Run the frontend development server:

npm run dev

Frontend should now be running on **`http://localhost:5173`** 🚀

---

## 🐳 Docker Setup (Optional)

If you prefer using **Docker** to set up the MySQL database, you can use the provided `docker-compose.yml` file.

### 📌 9. Run MySQL with Docker
Instead of manually installing MySQL, you can start a **MySQL database container** with:

`docker-compose up -d`

This will create and run a **MySQL** container with the following credentials:

- **Database Name**: `movies`
- **User**: `user`
- **Password**: `password123`
- **Root Password**: `rootpassword`
- **Port**: `3306`

Make sure to update your **`DATABASE_URL`** in the `.env` file to match the Docker setup:

DATABASE_URL="mysql://user:password123@localhost:3306/movies"

### 📌 10. Stop MySQL Container
To stop the MySQL container, run:

docker-compose down

---

## 🎥 How to Use the App

### 🏠 1. Home Page
When you visit the app, you'll be greeted with a **home page** where you can either **log in** or **sign up**.

---

### 🔐 2. Signup & Login
- **Signup**: Enter your **email** and **password** to create an account.
- **Login**: If you already have an account, enter your credentials to access the movie list.

🔹 **Note:** Passwords must meet the required validation criteria (e.g., at least 8 characters, one uppercase letter, one number). If your signup fails, you will see an error message.

---

### 🎬 3. Movie List Page
Once logged in, you will be redirected to the **Movies** page where you can:
✔ **View your movies** (listed with pagination).  
✔ **Search for movies** dynamically (list updates as you type).  
✔ **Add a new movie** using the form.  
✔ **Delete a movie** (by clicking the delete button).

---

### 🔎 4. Searching for Movies
- **Live search**: As you type in the search bar, the list updates dynamically.
- **Case-insensitive search**: No need to worry about uppercase/lowercase differences.
- **Pagination still applies**: If there are many results, pagination will still be active.

---

### 🗑️ 5. Deleting a Movie
If you want to remove a movie from your list:
1. Click the **delete button** next to the movie.
2. The movie will be **immediately removed** from your list.
3. You will see an **updated list** without refreshing the page.

---

### 🚪 6. Logging Out
To log out:
- Click on the **Logout** button in the **navigation bar**.
- You will be redirected to the **login page**.
- Your session will be **cleared**.

---

## 🛠️ Development

### 📌 Running Tests
Run all backend unit tests:

npm run test

---


