jest.mock("redis", () => {
  const mockClient = {
    on: jest.fn(),
  };

  return {
    createClient: jest.fn(() => mockClient),
  };
});

describe("Redis Client Configuration", () => {
  let redisClient: any;
  let createClientMock: jest.Mock;

  beforeEach(async () => {
    jest.resetModules();

    process.env.REDIS_URL = "redis://localhost:6379";

    jest.spyOn(console, "error")
      .mockImplementation(() => {});

    const redisModule = await import("redis");

    createClientMock = redisModule.createClient as jest.Mock;

    const module = await import("../../config/redis");

    redisClient = module.default;
  });

  afterEach(() => {
    jest.clearAllMocks();

    jest.restoreAllMocks();
  });

  it("should create redis client with REDIS_URL", () => {
    expect(createClientMock).toHaveBeenCalledWith({
      url: "redis://localhost:6379",
    });
  });

  it("should register redis error handler", () => {
    expect(redisClient.on).toHaveBeenCalledWith(
      "error",
      expect.any(Function)
    );
  });

  it("should log redis errors", () => {
    const errorHandler =
      redisClient.on.mock.calls[0][1];

    const error =
      new Error("Redis connection failed");

    errorHandler(error);

    expect(console.error)
      .toHaveBeenCalledWith(
        "Redis Error:",
        error
      );
  });
});