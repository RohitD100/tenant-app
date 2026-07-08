import { Request, Response } from "express";
import { getDashboard } from "../../controllers/dashboard.controller";
import * as dashboardService from "../../services/dashboard.service";

jest.mock("../../services/dashboard.service", () => ({
  getDashboardStats: jest.fn(),
}));

describe("Dashboard Controller - getDashboard", () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockResponse = {
      json: jest.fn(),
    };
  });

  it("should call getDashboardStats service and return dashboard stats", async () => {
    const mockStats = {
      users: 100,
      orders: 50,
      revenue: 5000,
    };

    (
      dashboardService.getDashboardStats as jest.Mock
    ).mockResolvedValue(mockStats);

    await getDashboard(
      {} as Request,
      mockResponse as Response
    );

    expect(
      dashboardService.getDashboardStats
    ).toHaveBeenCalledTimes(1);

    expect(mockResponse.json)
      .toHaveBeenCalledWith(mockStats);
  });


  it("should return empty stats when service returns empty data", async () => {
    const mockStats = {};

    (
      dashboardService.getDashboardStats as jest.Mock
    ).mockResolvedValue(mockStats);

    await getDashboard(
      {} as Request,
      mockResponse as Response
    );

    expect(mockResponse.json)
      .toHaveBeenCalledWith(mockStats);
  });


  it("should propagate error when dashboard service fails", async () => {
    const error = new Error(
      "Failed to fetch dashboard stats"
    );

    (
      dashboardService.getDashboardStats as jest.Mock
    ).mockRejectedValue(error);

    await expect(
      getDashboard(
        {} as Request,
        mockResponse as Response
      )
    ).rejects.toThrow(
      "Failed to fetch dashboard stats"
    );

    expect(mockResponse.json)
      .not
      .toHaveBeenCalled();
  });
});