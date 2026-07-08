import { Request, Response } from "express";
import * as authService from "../../services/auth.service";
import { signup, login } from "../../controllers/auth.controller";


jest.mock("../../services/auth.service");


describe("Auth Controller Tests", () => {


  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;


  beforeEach(() => {

    mockRequest = {
      body: {},
    };


    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };


    jest.clearAllMocks();

  });



  describe("signup controller", () => {


    it("should create user and return 201", async () => {

      const userData = {
        id: "123",
        email: "test@test.com",
      };


      mockRequest.body = {
        name: "John",
        email: "test@test.com",
        password: "password123",
      };


      (authService.signup as jest.Mock)
        .mockResolvedValue(userData);



      await signup(
        mockRequest as Request,
        mockResponse as Response
      );



      expect(authService.signup)
        .toHaveBeenCalledWith(
          mockRequest.body
        );


      expect(mockResponse.status)
        .toHaveBeenCalledWith(201);


      expect(mockResponse.json)
        .toHaveBeenCalledWith(userData);

    });



    it("should return 400 when signup fails", async () => {


      const error = new Error(
        "Email already exists"
      );


      (authService.signup as jest.Mock)
        .mockRejectedValue(error);



      await signup(
        mockRequest as Request,
        mockResponse as Response
      );



      expect(mockResponse.status)
        .toHaveBeenCalledWith(400);



      expect(mockResponse.json)
        .toHaveBeenCalledWith({
          message: "Email already exists",
        });


    });


  });





  describe("login controller", () => {



    it("should login user successfully", async () => {


      const loginResponse = {
        token: "jwt-token",
        user: {
          id: "123",
          email: "test@test.com",
        },
      };


      mockRequest.body = {
        email: "test@test.com",
        password: "password123",
      };



      (authService.login as jest.Mock)
        .mockResolvedValue(loginResponse);



      await login(
        mockRequest as Request,
        mockResponse as Response
      );



      expect(authService.login)
        .toHaveBeenCalledWith(
          mockRequest.body
        );



      expect(mockResponse.json)
        .toHaveBeenCalledWith(
          loginResponse
        );


    });





    it("should return 400 when login fails", async () => {


      const error = new Error(
        "Invalid credentials"
      );



      (authService.login as jest.Mock)
        .mockRejectedValue(error);



      await login(
        mockRequest as Request,
        mockResponse as Response
      );



      expect(mockResponse.status)
        .toHaveBeenCalledWith(400);



      expect(mockResponse.json)
        .toHaveBeenCalledWith({
          message: "Invalid credentials",
        });


    });


  });


});