# MERN Tenant App

## Description
This is a MERN (MongoDB, Express, React, Node.js) based application for managing tenants. It provides a dashboard for viewing user data, roles, and sites, along with authentication and CRUD operations for users, roles, and sites.

### Features
- **Users**:
  - List users with pagination and search functionality
  - Create, update, deactivate users
  - User fields: `name`, `email`, `role`, `site`, `status`
  
- **Roles**:
  - CRUD operations for roles
  - Each role has a set of permissions
  - Prevent role deletion if it is assigned to users
  
- **Sites**:
  - CRUD operations for sites with fields: `name`, `location`, `status`

- **Common Features**:
  - Time zones API (used in user forms)
  - Dashboard showing:
    - Total users
    - Active users
    - Total roles
    - Total sites

### Tech Stack
- **Backend**: Node.js + Express
- **Frontend**: React (functional components, hooks)
- **Database**: MongoDB (Atlas preferred)
- **Authentication**: JWT (JSON Web Token)
- **Configuration**: Environment variables only

### API & Quality
- Auth-protected CRUD endpoints
- Clean folder structure and proper error handling
- Proper CORS and environment variable setup

### Deployment
- **Backend**: Deployed on Render or Railway
- **Frontend**: Deployed on Vercel or Netlify
- **Database**: MongoDB Atlas

### Setup Instructions

#### Prerequisites:
- Node.js (v14 or later)
- MongoDB Atlas account (or local MongoDB setup)
- JWT secret and other environment variables

#### Backend Setup:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure the environment variables:
    ```bash
    MONGO_URI=<your-mongo-atlas-connection-string>
    JWT_SECRET=<your-jwt-secret-key>
    PORT=5000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

#### Frontend Setup:

1. Navigate to the frontend directory:
    ```bash
    cd client
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and add the backend API URL:
    ```bash
    REACT_APP_API_URL=http://localhost:5000
    ```

4. Start the frontend server:
    ```bash
    npm start
    ```

### Deployment

- **Backend**:
  - Deploy the backend to Render or Railway and ensure the environment variables are configured in the platform settings.
  
- **Frontend**:
  - Deploy the frontend to Vercel or Netlify. You will need to configure the environment variable for the backend API URL.

### Deliverables

- Live deployed app URL: [<App URL>](<App-URL>)
- Public GitHub repository: [<Repo URL>](<Repo-URL>)

### Email Instructions

Send an email with the following details:

**To**:  
project.coordinator@adalovelacetechnologies.com  
hr@adalovelacetechnologies.com  

**Subject**: MERN Tenant App – Deployed

**Body**:  
- App URL: [<App URL>](<App-URL>)  
- Repo URL: [<Repo URL>](<Repo-URL>)  
- Brief feature summary:
  - User management with pagination, search, and CRUD functionalities
  - Role and site management with permissions
  - Time zone API integration
  - Dashboard displaying key statistics: Total users, active users, total roles, and total sites
  
---

Feel free to modify the setup and configurations based on your specific environment.
