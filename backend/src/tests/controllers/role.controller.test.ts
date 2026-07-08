import { Request, Response } from "express";
import {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
} from "../../controllers/role.controller";

import * as roleService from "../../services/role.service";


jest.mock("../../services/role.service", () => ({
  createRole: jest.fn(),
  getRoles: jest.fn(),
  updateRole: jest.fn(),
  deleteRole: jest.fn(),
}));


describe("Role Controller", () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });


  describe("createRole", () => {

    it("should create role and return 201 response", async () => {

      const roleData = {
        name: "ADMIN",
      };

      const createdRole = {
        id: "1",
        name: "ADMIN",
      };


      (
        roleService.createRole as jest.Mock
      ).mockResolvedValue(createdRole);


      const req = {
        body: roleData,
      } as Request;


      await createRole(
        req,
        mockResponse as Response
      );


      expect(roleService.createRole)
        .toHaveBeenCalledWith(roleData);


      expect(mockResponse.status)
        .toHaveBeenCalledWith(201);


      expect(mockResponse.json)
        .toHaveBeenCalledWith(createdRole);

    });


    it("should return 400 when createRole service fails", async () => {

      const error = new Error(
        "Role already exists"
      );


      (
        roleService.createRole as jest.Mock
      ).mockRejectedValue(error);


      const req = {
        body: {
          name: "ADMIN",
        },
      } as Request;


      await createRole(
        req,
        mockResponse as Response
      );


      expect(mockResponse.status)
        .toHaveBeenCalledWith(400);


      expect(mockResponse.json)
        .toHaveBeenCalledWith({
          message: "Role already exists",
        });

    });

  });



  describe("getRoles", () => {

    it("should return all roles", async () => {

      const roles = [
        {
          id: "1",
          name: "ADMIN",
        },
        {
          id: "2",
          name: "USER",
        },
      ];


      (
        roleService.getRoles as jest.Mock
      ).mockResolvedValue(roles);


      await getRoles(
        {} as Request,
        mockResponse as Response
      );


      expect(roleService.getRoles)
        .toHaveBeenCalledTimes(1);


      expect(mockResponse.json)
        .toHaveBeenCalledWith(roles);

    });


    it("should propagate error when getRoles fails", async () => {

      const error = new Error(
        "Database error"
      );


      (
        roleService.getRoles as jest.Mock
      ).mockRejectedValue(error);


      await expect(
        getRoles(
          {} as Request,
          mockResponse as Response
        )
      ).rejects.toThrow(
        "Database error"
      );


      expect(mockResponse.json)
        .not
        .toHaveBeenCalled();

    });

  });



  describe("updateRole", () => {

    it("should update role and return updated role", async () => {

      const updatedRole = {
        id: "1",
        name: "MANAGER",
      };


      (
        roleService.updateRole as jest.Mock
      ).mockResolvedValue(updatedRole);


      const req = {
        params: {
          id: "1",
        },
        body: {
          name: "MANAGER",
        },
      } as any;


      await updateRole(
        req,
        mockResponse as Response
      );


      expect(roleService.updateRole)
        .toHaveBeenCalledWith(
          "1",
          {
            name: "MANAGER",
          }
        );


      expect(mockResponse.json)
        .toHaveBeenCalledWith(updatedRole);

    });

  });



  describe("deleteRole", () => {

    it("should delete role and return success message", async () => {

      (
        roleService.deleteRole as jest.Mock
      ).mockResolvedValue(undefined);


      const req = {
        params: {
          id: "1",
        },
      } as any;


      await deleteRole(
        req,
        mockResponse as Response
      );


      expect(roleService.deleteRole)
        .toHaveBeenCalledWith("1");


      expect(mockResponse.json)
        .toHaveBeenCalledWith({
          message: "Role deleted",
        });

    });



    it("should return 400 when deleteRole service fails", async () => {

      const error = new Error(
        "Role not found"
      );


      (
        roleService.deleteRole as jest.Mock
      ).mockRejectedValue(error);


      const req = {
        params: {
          id: "1",
        },
      } as any;


      await deleteRole(
        req,
        mockResponse as Response
      );


      expect(mockResponse.status)
        .toHaveBeenCalledWith(400);


      expect(mockResponse.json)
        .toHaveBeenCalledWith({
          message: "Role not found",
        });

    });

  });

});