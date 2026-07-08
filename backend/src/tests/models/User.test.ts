// Tests for User model - password hashing and comparison

import mongoose from "mongoose";
import User from "../../../src/models/User";
import bcrypt from "bcryptjs";
import { MongoMemoryServer } from "mongodb-memory-server";

// Extend default timeout for async DB operations
jest.setTimeout(30000);

jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashedPassword"),
  compare: jest.fn().mockResolvedValue(true),
}));

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  jest.clearAllMocks();
  // Clean up collections to keep tests isolated
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe("User model", () => {
  it("hashes password before saving", async () => {
    const plainPassword = "mySecret123";
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: plainPassword,
    });

    const savedUser = await user.save();

    // bcrypt.hash should have been called with the plain password
    expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, 10);
    // The stored password should be the hashed version, not the plain text
    expect(savedUser.password).toBe("hashedPassword");
  });

  it("comparePassword returns true when passwords match", async () => {
    // Create a user where the password is already hashed (as done by middleware)
    const user = await User.create({
      name: "Jane",
      email: "jane@example.com",
      password: "anyPassword", // will be hashed by middleware
    });

    // The mocked bcrypt.compare resolves true regardless of arguments
    const isMatch = await user.comparePassword("anyPassword");
    expect(bcrypt.compare).toHaveBeenCalledWith("anyPassword", "hashedPassword");
    expect(isMatch).toBe(true);
  });

  it("fails validation for short password", async () => {
    const shortPwdUser = new User({
      name: "Short",
      email: "short@example.com",
      password: "123", // less than minlength of 6
    });

    await expect(shortPwdUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });
});
