import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tenant Management API",
      version: "1.0.0",
      description:
        "Role-Based Access Control (RBAC) Multi-Tenant Management System API",
      contact: {
        name: "Rohit Dorage",
        email: "your-email@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication and authorization endpoints",
      },
      {
        name: "Dashboard",
        description: "Dashboard statistics and analytics",
      },
      {
        name: "Roles",
        description: "Role management operations",
      },
      {
        name: "Sites",
        description: "Site management operations",
      },
      {
        name: "Users",
        description: "User management operations",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  // Scan all route files
  apis: [
    "./src/routes/auth.routes.ts",
    "./src/routes/dashboard.routes.ts",
    "./src/routes/role.routes.ts",
    "./src/routes/site.routes.ts",
    "./src/routes/user.routes.ts",
  ],
});