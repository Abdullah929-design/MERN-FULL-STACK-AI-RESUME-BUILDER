# MERN AI Resume Builder

An AI-powered resume builder built with the MERN stack (MongoDB, Express, React, Node) and TypeScript. Generate, edit, and export professional resumes using AI prompts and customizable templates.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![License](https://img.shields.io/badge/license-MIT-blue)](#)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Environment variables](#environment-variables)
  - [Run (development)](#run-development)
  - [Build (production)](#build-production)
- [API](#api)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

This project provides a full-stack application that uses AI to help users create professional resumes quickly. The front-end is built with React + Vite + TypeScript, the back-end uses Node + Express, and MongoDB stores user data and generated resumes.

Use cases:
- Auto-generate resume content from a short prompt
- Edit sections using a rich text editor
- Pick from multiple templates and preview before export
- Export to PDF

---

## Features

- AI-assisted resume generation
- Multiple resume templates
- Live preview and edit
- Export to PDF
- User authentication and profile management
- Save and manage multiple resumes

---

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- AI: (Replace with your AI provider e.g. OpenAI)
- Styling: Tailwind CSS / CSS modules (adjust as needed)

---

## Screenshots

> NOTE: Replace the placeholders below with real screenshots. Images are intentionally left as placeholders so you can add them later.

### Landing / Dashboard

![Dashboard placeholder](assets/screenshots/dashboard-placeholder.png)

_Replace the image above with a real screenshot of the dashboard._

### Editor view

![Editor placeholder](assets/screenshots/editor-placeholder.png)

_Replace the image above with a screenshot of the resume editor._

### Template preview

![Template placeholder 1](assets/screenshots/template-placeholder-1.png)

_Replace with a template preview screenshot._

### Template preview (alternate)

![Template placeholder 2](assets/screenshots/template-placeholder-2.png)

---

## Getting Started

### Prerequisites

- Node.js >= 16
- npm or yarn
- MongoDB instance (local or remote)

### Install

Clone the repo:

```bash
git clone https://github.com/Abdullah929-design/MERN-FULL-STACK-AI-RESUME-BUILDER.git
cd MERN-FULL-STACK-AI-RESUME-BUILDER
```

Install dependencies for both client and server (adjust paths if monorepo layout differs):

```bash
# from project root
npm install
# or, if client and server have separate package.json files
cd client && npm install
cd ../server && npm install
```

### Environment variables

Create a `.env` file in the server (backend) directory and add the required variables. Example `.env.example`:

```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```

Replace values with your credentials. Do not commit real secrets.

### Run (development)

If the repo is a single app with client and server scripts, run from root. If split, run client and server separately.

```bash
# from root (if scripts are set up)
npm run dev

# or, run client and server separately
cd server && npm run dev
cd client && npm run dev
```

Open http://localhost:5173 (or the port Vite reports) for the frontend and http://localhost:4000 for the backend API.

### Build (production)

```bash
# build client
cd client && npm run build
# start server with production config
cd ../server && npm start
```

---

## API

A short example of endpoints (adjust to match your server implementation):

- POST /api/auth/register - Register a user
- POST /api/auth/login - Login and receive a token
- GET /api/resumes - List resumes for the current user
- POST /api/resumes - Create/generate a new resume (AI-powered)
- GET /api/resumes/:id - Get a resume by id
- PUT /api/resumes/:id - Update a resume
- DELETE /api/resumes/:id - Delete a resume

Include full API docs or a Postman collection in docs/ if available.

---

## Usage

1. Register or log in
2. Click "Create Resume" and choose a template
3. Provide a short prompt (or fill sections manually)
4. Edit content in the editor and preview
5. Export to PDF when ready

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/awesome-feature)
3. Commit your changes (git commit -m "feat: add ...")
4. Push to your branch (git push origin feature/awesome-feature)
5. Open a Pull Request describing your changes

Please add tests and keep code style consistent. Run linters and formatters before submitting.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

Project maintainer: Abdullah929-design

For questions or feedback, open an issue or contact via GitHub profile.

---

## Acknowledgements

- Vite
- React
- Open-source libraries used in this project

