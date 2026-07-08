import { Request, Response } from "express";
import * as siteService from "../../services/site.service";
import { createSite, getSites, updateSite, deleteSite } from "../../controllers/site.controller";
import mongoose from "mongoose";

jest.mock("../../services/site.service");

// Mock mongoose ObjectId validation where needed
jest.spyOn(mongoose.Types.ObjectId, "isValid");

describe("Site Controller Tests", () => {
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

  describe("createSite", () => {
    it("should create site and return 201", async () => {
      const siteData = { id: "1", name: "Main Site" };
      mockRequest.body = { name: "Main Site" };
      (siteService.createSite as jest.Mock).mockResolvedValue(siteData);

      await createSite(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(siteService.createSite).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(siteData);
    });

    it("should return 400 when createSite fails", async () => {
      const error = new Error("Site already exists");
      mockRequest.body = { name: "Duplicate" };
      (siteService.createSite as jest.Mock).mockRejectedValue(error);

      await createSite(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Site already exists" });
    });
  });

  describe("getSites", () => {
    it("should return list of sites", async () => {
      const sites = [{ id: "1", name: "Site A" }];
      (siteService.getSites as jest.Mock).mockResolvedValue(sites);

      await getSites({} as Request, mockResponse as Response);

      expect(siteService.getSites).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(sites);
    });
  });

  describe("updateSite", () => {
    const validId = "507f1f77bcf86cd799439011"; // 24-char hex string
    const invalidId = "invalid-id";

    it("should return 400 for invalid id", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(false);
      const req = { params: { id: invalidId }, body: { name: "New" } } as any as Request;
      await updateSite(req as any, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid ID" });
    });

    it("should return 404 when site not found", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(true);
      (siteService.updateSite as jest.Mock).mockResolvedValue(null);
      mockRequest.params = { id: validId } as any;
      mockRequest.body = { name: "New" };

      await updateSite(
        mockRequest as any,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Site not found" });
    });

    it("should update site and return success payload", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(true);
      const updated = { id: validId, name: "Updated" };
      (siteService.updateSite as jest.Mock).mockResolvedValue(updated);
      mockRequest.params = { id: validId } as any;
      mockRequest.body = { name: "Updated" };

      await updateSite(
        mockRequest as any,
        mockResponse as Response
      );

      expect(siteService.updateSite).toHaveBeenCalledWith(validId, mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Site updated successfully",
        site: updated,
      });
    });

    it("should handle internal server error", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(true);
      const error = new Error("DB error");
      (siteService.updateSite as jest.Mock).mockRejectedValue(error);
      mockRequest.params = { id: validId } as any;
      mockRequest.body = { name: "Fail" };

      // Mock console.error to silence output
      jest.spyOn(console, "error").mockImplementation(() => {});

      await updateSite(
        mockRequest as any,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Internal server error" });
      (console.error as jest.Mock).mockRestore();
    });
  });

  describe("deleteSite", () => {
    const validId = "507f1f77bcf86cd799439011";
    const invalidId = "bad-id";

    it("should return 400 for invalid id", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(false);
      mockRequest.params = { id: invalidId } as any;

      await deleteSite(
        mockRequest as any,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid ID" });
    });

    it("should delete site and return success message", async () => {
      (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValueOnce(true);
      (siteService.deleteSite as jest.Mock).mockResolvedValue(undefined);
      mockRequest.params = { id: validId } as any;

      await deleteSite(
        mockRequest as any,
        mockResponse as Response
      );

      expect(siteService.deleteSite).toHaveBeenCalledWith(validId);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Site deleted" });
    });
  });
});
