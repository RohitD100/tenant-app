# Backend - Tenant App

Node.js + Express + TypeScript backend for the Tenant App.

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Zod Validation

## Prerequisites

- Node.js 18+
- npm
- MongoDB database

## Environment Variables

Create a `.env` file inside the `backend` folder (or copy from `.env.sample`):

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

## Install Dependencies

```bash
npm install
```

## Run in Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Run Production Build

```bash
npm start
```

## Health Check

`GET /health`

## API Base and Routes

Base path: `/api`

- `/auth`
- `/roles`
- `/sites`
- `/users`
- `/dashboard`
