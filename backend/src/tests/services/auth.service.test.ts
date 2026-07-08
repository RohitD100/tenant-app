import { signup, login } from '../../../src/services/auth.service';
import User from '../../../src/models/User';
import redisClient from '../../../src/config/redis';
import jwt from 'jsonwebtoken';

jest.mock('../../../src/models/User');
jest.mock('../../../src/config/redis');
jest.mock('jsonwebtoken');

// Helper to reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  // Mock env variable
  process.env.JWT_SECRET = 'testsecret';
});

describe('auth.service', () => {
  describe('signup', () => {
    it('creates a new user, caches it and returns token', async () => {
      const mockUser = { _id: 'uid', email: 'test@example.com' } as any;
      // User.findOne returns null (no existing)
      (User.findOne as jest.Mock).mockResolvedValue(null);
      // User.create returns mock user
      (User.create as jest.Mock).mockResolvedValue(mockUser);
      // Mock jwt sign
      (jwt.sign as jest.Mock).mockReturnValue('jwt-token');

      const result = await signup({ name: 'John', email: 'test@example.com', password: 'password123' });

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(User.create).toHaveBeenCalled();
      expect(redisClient.setEx).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toEqual({ token: 'jwt-token', user: { _id: mockUser._id, email: mockUser.email, role: mockUser.role, comparePassword: mockUser.comparePassword } });
    });

    it('throws when email already registered', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({});
      await expect(signup({ name: 'John', email: 'dup@example.com', password: 'password123' }))
        .rejects
        .toThrow('Email already registered');
    });
  });

  describe('login', () => {
    const email = 'user@example.com';
    const password = 'pwd';
    const mockUser = {
      _id: 'uid',
      email,
      comparePassword: jest.fn().mockResolvedValue(true),
      role: { name: 'admin' },
    } as any;

    it('uses cached user from Redis and returns token', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(mockUser));
      // hydrate returns the same mockUser with populate stub
      (User.hydrate as jest.Mock).mockReturnValue({
        ...mockUser,
        populate: jest.fn().mockResolvedValue(mockUser),
      });
      (jwt.sign as jest.Mock).mockReturnValue('jwt-token');

      const result = await login({ email, password });

      expect(redisClient.get).toHaveBeenCalledWith(`user:${email}`);
      expect(User.hydrate).toHaveBeenCalled();
      expect(mockUser.comparePassword).toHaveBeenCalledWith(password);
      expect(result).toEqual({ token: 'jwt-token', user: { _id: mockUser._id, email: mockUser.email, role: mockUser.role, comparePassword: mockUser.comparePassword } });
    });

    it('falls back to DB when cache miss, caches user, and returns token', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (User.findOne as jest.Mock).mockResolvedValue({
        ...mockUser,
        populate: jest.fn().mockResolvedValue(mockUser),
      });
      (jwt.sign as jest.Mock).mockReturnValue('jwt-token');

      const result = await login({ email, password });

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(redisClient.setEx).toHaveBeenCalled();
      expect(result).toEqual({ token: 'jwt-token', user: { _id: mockUser._id, email: mockUser.email, role: mockUser.role, comparePassword: mockUser.comparePassword } });
    });

    it('throws on invalid credentials (wrong password)', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(mockUser));
      (User.hydrate as jest.Mock).mockReturnValue({
        ...mockUser,
        comparePassword: jest.fn().mockResolvedValue(false),
        populate: jest.fn().mockResolvedValue(mockUser),
      });

      await expect(login({ email, password })).rejects.toThrow('Invalid credentials');
    });

    it('throws when user not found in DB', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(login({ email, password })).rejects.toThrow('Invalid credentials');
    });
  });
});
