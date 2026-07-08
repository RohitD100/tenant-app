import mongoose from "mongoose";
import connectDB from "../../config/db";


jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));


describe("MongoDB Connection Tests", () => {

  const originalExit = process.exit;

  beforeEach(() => {
    jest.clearAllMocks();

    process.exit = jest.fn() as never;

    jest.spyOn(console, "log")
      .mockImplementation(() => {});

    jest.spyOn(console, "error")
      .mockImplementation(() => {});
  });


  afterEach(() => {
    process.exit = originalExit;

    jest.restoreAllMocks();
  });


  it("should connect to MongoDB successfully", async () => {

    (mongoose.connect as jest.Mock)
      .mockResolvedValueOnce({} as any);


    process.env.MONGODB_URI =
      "mongodb://localhost:27017/test";


    await connectDB();


    expect(mongoose.connect)
      .toHaveBeenCalledWith(
        "mongodb://localhost:27017/test"
      );


    expect(console.log)
      .toHaveBeenCalledWith(
        "MongoDB connected"
      );

  });


  it("should handle MongoDB connection error", async () => {

    const error = new Error(
      "Connection failed"
    );


    (mongoose.connect as jest.Mock)
      .mockRejectedValueOnce(error);


    await connectDB();


    expect(console.error)
      .toHaveBeenCalledWith(error);


    expect(process.exit)
      .toHaveBeenCalledWith(1);

  });


  it("should use MONGODB_URI from environment variables", async () => {

    process.env.MONGODB_URI =
      "mongodb://test-url";


    (mongoose.connect as jest.Mock)
      .mockResolvedValueOnce({} as any);


    await connectDB();


    expect(mongoose.connect)
      .toHaveBeenCalledTimes(1);


    expect(mongoose.connect)
      .toHaveBeenCalledWith(
        "mongodb://test-url"
      );

  });

});