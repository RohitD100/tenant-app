                 User Accesses Application
                           │
                           ▼
                  React Frontend (UI)
                           │
                     REST API Request
                           │
                           ▼
                  Express Backend API
                           │
                           ▼
                  JWT Authentication
                  (Validate Access Token)
                           │
                           ▼
                     RBAC Authorization
                  (Check User Permissions)
                           │
                           ▼
              Business Rule Validation
      (e.g., Prevent Deleting Assigned Roles)
                           │
                           ▼
               Cache-Aside Pattern (Redis)
             Cache Hit ─────────► Return Data
                  │
          Cache Miss
                  ▼
               MongoDB
                  │
          Update Redis Cache
                  │
                  ▼
             API Response
                  │
                  ▼
            React Frontend


### Design Decisions
- Multi-tenant architecture with tenant isolation in every database query.
- JWT authentication with short-lived access tokens and refresh tokens.
- RBAC middleware for role-based authorization.
- Business rule validation beyond RBAC (e.g., prevent deleting roles assigned to users).
- Redis Cache-Aside pattern to improve performance for frequently accessed data.
- Cache invalidation after create, update, or delete operations to maintain consistency.
- CI/CD pipeline using GitHub Actions for linting, testing, and build verification.
- Backend deployed on Render and frontend deployed on Vercel.
- Over 80% test coverage using Jest, Supertest, and React Testing Library.