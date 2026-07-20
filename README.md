# Music Library Host Application

The **Host Application** acts as the container for the Music Library Micro Frontend. It loads the remote application dynamically using **Vite Module Federation** and provides authentication, routing, and application layout.

---

## Tech Stack

* React
* Vite
* Module Federation (`@originjs/vite-plugin-federation`)
* React Query
* React Hook Form
* Tailwind CSS
* MSW (Mock Service Worker)

---

## Features

* Loads Music Library Micro Frontend dynamically
* Lazy loading using Module Federation
* Authentication using mock JWT
* Role-based authorization
* Admin/User access control
* React Query integration

---

## Project Structure

```text
host/
│── src/
│── public/
│── vite.config.js
│── package.json
│── netlify.toml
```

---

## Running Locally

### 1. Clone Repository

```bash
git clone https://github.com/shyakasliwal/host-repository.git
cd host-repository
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the project root.

```env
VITE_MFE_REMOTE_URL=http://localhost:5001
```

### 4. Start Development Server

```bash
npm run dev
```

Host Application will run on:

```
http://localhost:5000
```

> **Important:** Start the Music Library Micro Frontend before running the Host Application.

---

## Deployment

The Host Application is deployed on Netlify.

Live Demo:

```
https://melodious-cat-d19ddf.netlify.app/login
```

---

## Demo Credentials

### Admin

Username: admin

Password: admin123

Permissions

* View Songs
* Filter Songs
* Sort Songs
* Group Songs
* Add Songs
* Delete Songs

---

### User

Username: user

Password: user123

Permissions

* View Songs
* Filter Songs
* Sort Songs
* Group Songs

---

## Micro Frontend Architecture

This project follows a Micro Frontend architecture using Vite Module Federation.

The Host Application dynamically loads the Music Library Micro Frontend at runtime using a remote entry. This allows both applications to be developed, deployed, and maintained independently while still working together as a single application.

---

## Authentication

Authentication is implemented using a mock JWT stored in Local Storage.

Two roles are available:

* Admin
* User

UI functionality is rendered according to the authenticated user's role.

---

## Trade-offs & Future Improvements

For this assignment I used Vite Module Federation together with React Query and MSW to keep the application fully frontend-based without requiring a backend server.

With more time I would:

* Add unit and integration tests
* Improve authentication security
* Add persistent storage
* Improve error handling
* Add CI/CD pipeline
* Improve responsive design

---

## Related Repository

Music Library Micro Frontend

https://github.com/shyakasliwal/Micro--Frontend
