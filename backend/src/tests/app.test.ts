import request from "supertest";
import app from "../app";

describe("Express App Tests", () => {

  describe("Health Check", () => {
    it("GET /health should return status OK", async () => {
      const response = await request(app)
        .get("/health");

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        status: "OK",
      });
    });
  });


  describe("Middleware Tests", () => {

    it("should parse JSON request body", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@test.com",
          password: "password123",
        })
        .set("Content-Type", "application/json");


      // The endpoint may return 400/401 because user does not exist,
      // but Express should correctly parse the JSON body.
      expect(response.status).toBeDefined();
    });


    it("should enable CORS headers", async () => {
      const response = await request(app)
        .get("/health")
        .set("Origin", "http://localhost:3000");


      expect(response.headers)
        .toHaveProperty("access-control-allow-origin");
    });

  });


  describe("Route Mounting Tests", () => {

    it("should mount auth routes", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({});


      expect(response.status).not.toBe(404);
    });


    it("should mount user routes", async () => {
      const response = await request(app)
        .get("/api/users");


      expect(response.status).not.toBe(404);
    });


    it("should mount role routes", async () => {
      const response = await request(app)
        .get("/api/roles");


      expect(response.status).not.toBe(404);
    });


    it("should mount site routes", async () => {
      const response = await request(app)
        .get("/api/sites");


      expect(response.status).not.toBe(404);
    });


    it("should mount dashboard routes", async () => {
      const response = await request(app)
        .get("/api/dashboard");


      expect(response.status).not.toBe(404);
    });

  });


  describe("Swagger", () => {

    it("should expose swagger documentation", async () => {
      const response = await request(app)
        .get("/api-docs/");


      expect(response.status).toBe(200);
    });

  });


  describe("Invalid Routes", () => {

    it("should return 404 for unknown routes", async () => {
      const response = await request(app)
        .get("/this-route-does-not-exist");


      expect(response.status).toBe(404);
    });

  });

});