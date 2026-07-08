import { Request, Response } from "express";
import * as userService from "../../services/user.service";
import {
  createUser,
  getUsers,
  updateUser,
  deactivateUser,
  getUserById,
} from "../../controllers/user.controller";
import mongoose from "mongoose";

jest.mock("../../services/user.service");

// Mock mongoose ObjectId validation where needed
jest.spyOn(mongoose.Types.ObjectId, "isValid");

describe("User Controller Tests", () => {
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockRequest = {};
  });

  describe("createUser", () => {
    it("should create user and return 201", async () => {
      const userData = { id: "1", email: "test@test.com" };
      mockRequest.body = { email: "test@test.com", password: "pwd" };
      (userService.createUser as jest.Mock).mockResolvedValue(userData);

      await createUser(mockRequest as Request, mockResponse as Response);

      expect(userService.createUser).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(userData);
    });

    it("should return 400 when service fails", async () => {
      const error = new Error("Email exists");
      mockRequest.body = { email: "dup@test.com" };
      (userService.createUser as jest.Mock).mockRejectedValue(error);

      await createUser(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Email exists" });
    });
  });

  describe("getUsers", () => {
    it("should fetch users with query params", async () => {
      const users = [{ id: "1" }, { id: "2" }];
      (userService.getUsers as jest.Mock).mockResolvedValue(users);

      mockRequest.query = { page: "2", limit: "5", search: "john" };

      await getUsers(mockRequest as Request, mockResponse as Response);

      expect(userService.getUsers).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
        search: "john",
      });
      expect(mockResponse.json).toHaveBeenCalledWith(users);
    });
  });

  describe("updateUser", () => {
    const validId = "507f1f77bcf86cd799439011";
    const invalidId = "bad-id";

    it("should return 400 for invalid id", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(false);
      mockRequest.params = { id: invalidId } as any;
      const req = { params: { id: invalidId }, body: { name: "New" } } as any as Request;
      await updateUser(req as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid ID" });
    });

    it("should update user and return updated object", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(true);
      const updated = { id: validId, name: "Updated" };
      (userService.updateUser as jest.Mock).mockResolvedValue(updated);
      mockRequest.params = { id: validId } as any;
      const req = { params: { id: validId }, body: { name: "Updated" } } as any as Request;
      await updateUser(req as any, mockResponse as Response);

      expect(userService.updateUser).toHaveBeenCalledWith(validId, req.body);
      expect(mockResponse.json).toHaveBeenCalledWith(updated);
    });
  });

  describe("deactivateUser", () => {
    const validId = "507f1f77bcf86cd799439011";
    const invalidId = "bad-id";

    it("should return 400 for invalid id", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(false);
      mockRequest.params = { id: invalidId } as any;

      await deactivateUser(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid ID" });
    });

    it("should deactivate user and return success message", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(true);
      (userService.deactivateUser as jest.Mock).mockResolvedValue(undefined);
      mockRequest.params = { id: validId } as any;

      await deactivateUser(mockRequest as any, mockResponse as Response);

      expect(userService.deactivateUser).toHaveBeenCalledWith(validId);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "User deactivated" });
    });
  });

  describe("getUserById", () => {
    const validId = "507f1f77bcf86cd799439011";
    const invalidId = "bad-id";

    it("should return 400 for invalid id", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(false);
      mockRequest.params = { id: invalidId } as any;

      await getUserById(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid ID" });
    });

    it("should return user when found", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(true);
      const user = { id: validId, email: "test@test.com" };
      (userService.getUserById as jest.Mock).mockResolvedValue(user);
      mockRequest.params = { id: validId } as any;

      await getUserById(mockRequest as any, mockResponse as Response);

      expect(userService.getUserById).toHaveBeenCalledWith(validId);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });

    it("should return 404 when service throws", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(true);
      const error = new Error("User not found");
      (userService.getUserById as jest.Mock).mockRejectedValue(error);
      mockRequest.params = { id: validId } as any;

      await getUserById(mockRequest as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });
});
