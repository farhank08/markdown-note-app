# Markdown Note App

A full-stack **Markdown note-taking application** built with **React** and **Node.js** that allows users to write notes in Markdown, preview rendered output in real time and reuse content outside the application. The project is structured as a **monorepo** with a clear development and production workflow.

Project from https://roadmap.sh/projects/markdown-note-taking-app

---

## Prerequisites

- Node.js v25

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd markdown-note-app
```

### Install dependencies

```bash
npm install
```

---

## Running the Application

### Development mode

Runs the client and server concurrently with hot reload:

```bash
npm run dev
```

This starts:

- Client on `http://localhost:5173`
- Server on `http://localhost:3000`

API requests are accessed via `/api` and proxied during development.

---

### Production build

Compile both client and server for production:

```bash
npm run build
```

This will:

1. Build the client into static assets (client/dist)
2. Compile the server (server/dist)

---

### Start the application (production)

Run the compiled server:

```bash
npm start
```

The server will:

- Serve the built client application
- Handle API requests under `/api`

Access the app at:

```
http://localhost:3000
```

---

## How It Works

1. The client provides a Markdown editor with live preview
2. User input is rendered in real time for feedback
3. API routes are exposed under a consistent `/api` namespace
4. In development, API requests are proxied to avoid CORS issues
5. In production, a single Node.js server serves both the API and client assets

---

## Deployment

The application is designed to be deployed as a **single service**.

Typical deployment flow:

1. Install dependencies
2. Run `npm run build`
3. Start the server with `npm start`

This setup works on:

- VPS / VM environments
- Platform-as-a-Service providers (e.g. Render, Railway)
- Containers or managed Node.js hosting

No client-side configuration changes are required between environments.

---

## License

This project is licensed under the ISC License.
