import { createUser, getUsers, updateUser, deactivateUser, getUserById } from '../../../src/services/user.service';
import User from '../../../src/models/User';
import Role from '../../../src/models/Role';
import Site from '../../../src/models/Site';
import redisClient from '../../../src/config/redis';

jest.mock('../../../src/models/User');
jest.mock('../../../src/models/Role');
jest.mock('../../../src/models/Site');
jest.mock('../../../src/config/redis');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('user.service', () => {
  const mockUser = { _id: 'uid', email: 'test@example.com' } as any;
  const populatedUser = { ...mockUser, role: {}, site: {} } as any;

  describe('createUser', () => {
    it('creates user, caches and returns populated user', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (Role.findById as jest.Mock).mockResolvedValue({});
      (Site.findById as jest.Mock).mockResolvedValue({});
      (User.create as jest.Mock).mockResolvedValue(mockUser);
      (User.findById as jest.Mock).mockResolvedValue(populatedUser);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');
      (redisClient.del as jest.Mock).mockResolvedValue(1);

      const result = await createUser({ name: 'John', email: 'test@example.com', password: 'pwd', role: 'rid', site: 'sid' });
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(Role.findById).toHaveBeenCalledWith('rid');
      expect(Site.findById).toHaveBeenCalledWith('sid');
      expect(User.create).toHaveBeenCalled();
      expect(redisClient.setEx).toHaveBeenCalled();
      expect(redisClient.del).toHaveBeenCalled();
      expect(result).toBe(populatedUser);
    });

    it('throws when email exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({});
      await expect(createUser({ name: 'John', email: 'dup@example.com', password: 'pwd', role: 'rid', site: 'sid' }))
        .rejects
        .toThrow('Email already exists');
    });
  });

  describe('getUsers', () => {
    it('returns paginated users with total and pages', async () => {
      const mockDocs = [{ _id: '1' }, { _id: '2' }];
      (User.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockDocs),
      });
      (User.countDocuments as jest.Mock).mockResolvedValue(2);

      const result = await getUsers({ page: 1, limit: 10, search: '' });
      expect(result).toEqual({ data: mockDocs, total: 2, page: 1, pages: 1 });
    });
  });

  describe('updateUser', () => {
    it('updates user and caches result', async () => {
      (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(populatedUser),
      });
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

      const result = await updateUser('uid', { name: 'New' });
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('uid', { name: 'New' }, { new: true });
      expect(redisClient.setEx).toHaveBeenCalled();
      expect(result).toBe(populatedUser);
    });
  });

  describe('deactivateUser', () => {
    it('deactivates user, caches and clears dashboard stats', async () => {
      (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(populatedUser),
      });
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');
      (redisClient.del as jest.Mock).mockResolvedValue(1);

      const result = await deactivateUser('uid');
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('uid', { status: 'inactive' }, { new: true });
      expect(redisClient.setEx).toHaveBeenCalled();
      expect(redisClient.del).toHaveBeenCalled();
      expect(result).toBe(populatedUser);
    });
  });

  describe('getUserById', () => {
    it('returns cached user when present', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(populatedUser));
      const result = await getUserById('uid');
      expect(redisClient.get).toHaveBeenCalledWith('user:uid');
      expect(result).toEqual(populatedUser);
    });

    it('fetches from DB, caches and returns when not cached', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (User.findById as jest.Mock).mockResolvedValue(populatedUser);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

      const result = await getUserById('uid');
      expect(User.findById).toHaveBeenCalledWith('uid');
      expect(redisClient.setEx).toHaveBeenCalled();
      expect(result).toBe(populatedUser);
    });

    it('throws when user not found', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (User.findById as jest.Mock).mockResolvedValue(null);
      await expect(getUserById('uid')).rejects.toThrow('User not found');
    });
  });
});
