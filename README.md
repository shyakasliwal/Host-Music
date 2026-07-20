# Music Library Host Application

The Host Application acts as the container for the Music Library Micro Frontend. It is responsible for authentication, application layout, and dynamically loading the Music Library using Vite Module Federation.

---

## Tech Stack

- React
- Vite
- @originjs/vite-plugin-federation
- React Query
- React Hook Form
- Tailwind CSS
- MSW (Mock Service Worker)

---

## Features

- Host application for Micro Frontend architecture
- Dynamic loading of Music Library
- Authentication using Mock JWT
- Role-based Authorization (Admin/User)
- Lazy Loading
- React Query Integration

---

## Project Structure

host/
├── src/
├── public/
├── vite.config.js
├── package.json
├── netlify.toml
└── README.md

---

## Running Locally

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/host.git
cd host
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file.

```env
VITE_MFE_REMOTE_URL=http://localhost:5001
```

### Start Development Server

```bash
npm run dev
```

Host runs on:

```
http://localhost:5000
```

> **Important:** The Music Library Micro Frontend must be running before starting the Host Application.

---

## Deployment

Both applications are deployed independently on **Netlify**.

### Host Deployment

- Connected GitHub repository to Netlify
- Build Command

```bash
npm run build
```

- Publish Directory

```
dist
```

- Added Environment Variable

```env
VITE_MFE_REMOTE_URL=https://bespoke-cannoli-e755bd.netlify.app/
```

The Host dynamically loads the deployed Music Library remote application at runtime.

---

## Live Demo

Host Application

https://melodious-cat-d19ddf.netlify.app/login

---

## Demo Credentials

### Admin

Username: admin

Password: admin123

Permissions

- View Songs
- Filter Songs
- Sort Songs
- Group Songs
- Add Songs
- Delete Songs

---

### User

Username: user

Password: user123

Permissions

- View Songs
- Filter Songs
- Sort Songs
- Group Songs

---

## Micro Frontend Architecture

This project follows a Micro Frontend architecture using **Vite Module Federation**.

The application is divided into two independent applications.

### Host Application

- Handles authentication
- Provides application layout
- Loads the Music Library dynamically
- Shares dependencies such as React and React Query

### Music Library

- Exposes the Music Library component
- Handles song fetching and CRUD operations
- Can be deployed independently

The Host imports the Music Library using:

```env
VITE_MFE_REMOTE_URL=http://localhost:5001
```

During development, the Host loads the remote from localhost.

In production, the Host loads the deployed Netlify application through `remoteEntry.js`.

This architecture allows both applications to be developed, deployed, and updated independently without rebuilding the Host.

---

## Authentication

Authentication is implemented using a **Mock JWT** stored in Local Storage.

The Host application manages authentication and stores the logged-in user's role.

Two roles are supported.

### Admin

- View Songs
- Filter Songs
- Sort Songs
- Group Songs
- Add Songs
- Delete Songs

### User

- View Songs
- Filter Songs
- Sort Songs
- Group Songs

The Music Library reads the authenticated user's role from the Host and conditionally renders UI controls. Administrative actions such as Add Song and Delete Song are available only for Admin users.

---

## Trade-offs & Future Improvements

For this assignment, I used Vite Module Federation together with React Query and MSW to keep the application fully frontend-based without requiring a backend server.

If I had more time, I would improve:

- Unit and Integration Testing
- Better Authentication
- Persistent Database
- Better Error Handling
- CI/CD Pipeline
- Responsive UI Improvements
- Performance Optimizations

---

## Related Repository

Music Library Repository

https://github.com/shyakasliwal/Micro--Frontend
