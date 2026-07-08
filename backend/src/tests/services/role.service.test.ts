import { createRole, getRoles, updateRole, deleteRole } from '../../../src/services/role.service';
import Role from '../../../src/models/Role';
import User from '../../../src/models/User';
import redisClient from '../../../src/config/redis';

jest.mock('../../../src/models/Role');
jest.mock('../../../src/models/User');
jest.mock('../../../src/config/redis');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('role.service', () => {
  const mockRole = { _id: 'rid', name: 'Admin' } as any;

  describe('createRole', () => {
    it('creates role and invalidates caches', async () => {
      (Role.findOne as jest.Mock).mockResolvedValue(null);
      (Role.create as jest.Mock).mockResolvedValue(mockRole);
      (redisClient.del as jest.Mock).mockResolvedValue(1);

      const result = await createRole({ name: 'Admin', permissions: [] });
      expect(Role.findOne).toHaveBeenCalledWith({ name: 'Admin' });
      expect(Role.create).toHaveBeenCalled();
      expect(redisClient.del).toHaveBeenCalledTimes(2);
      expect(result).toBe(mockRole);
    });

    it('throws when role already exists', async () => {
      (Role.findOne as jest.Mock).mockResolvedValue({});
      await expect(createRole({ name: 'Admin', permissions: [] })).rejects.toThrow('Role already exists');
    });
  });

  describe('getRoles', () => {
    it('returns cached roles when available', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify([mockRole]));
      const result = await getRoles();
      expect(redisClient.get).toHaveBeenCalled();
      expect(result).toEqual([mockRole]);
    });

    it('queries DB and caches when cache miss', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (Role.find as jest.Mock).mockResolvedValue([mockRole]);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

      const result = await getRoles();
      expect(Role.find).toHaveBeenCalled();
      expect(redisClient.setEx).toHaveBeenCalled();
      expect(result).toEqual([mockRole]);
    });
  });

  describe('updateRole', () => {
    it('updates role and invalidates caches', async () => {
      (Role.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockRole);
      (redisClient.del as jest.Mock).mockResolvedValue(1);

      const result = await updateRole('rid', { name: 'Super' });
      expect(Role.findByIdAndUpdate).toHaveBeenCalledWith('rid', { name: 'Super' }, { new: true });
      expect(redisClient.del).toHaveBeenCalledTimes(2);
      expect(result).toBe(mockRole);
    });
  });

  describe('deleteRole', () => {
    it('deletes role when no users assigned and invalidates caches', async () => {
      (User.find as jest.Mock).mockResolvedValue([]);
      (Role.findByIdAndDelete as jest.Mock).mockResolvedValue(mockRole);
      (redisClient.del as jest.Mock).mockResolvedValue(1);

      const result = await deleteRole('rid');
      expect(User.find).toHaveBeenCalledWith({ role: 'rid' });
      expect(Role.findByIdAndDelete).toHaveBeenCalledWith('rid');
      expect(redisClient.del).toHaveBeenCalledTimes(2);
      expect(result).toBe(mockRole);
    });

    it('throws when role assigned to users', async () => {
      (User.find as jest.Mock).mockResolvedValue([{}]);
      await expect(deleteRole('rid')).rejects.toThrow('Cannot delete role assigned to users');
    });
  });
});
