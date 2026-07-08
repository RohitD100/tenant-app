import { createSite, getSites, updateSite, deleteSite } from '../../../src/services/site.service';
import Site from '../../../src/models/Site';
import redisClient from '../../../src/config/redis';

jest.mock('../../../src/models/Site');
jest.mock('../../../src/config/redis');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('site.service', () => {
  const mockSite = { _id: 'sid', name: 'HQ' } as any;

  describe('createSite', () => {
    it('creates site and invalidates caches', async () => {
      (Site.create as jest.Mock).mockResolvedValue(mockSite);
      (redisClient.del as jest.Mock).mockResolvedValue(1);

      const result = await createSite({ name: 'HQ', location: 'NY', status: 'ACTIVE', timezone: 'UTC' });
      expect(Site.create).toHaveBeenCalled();
      expect(redisClient.del).toHaveBeenCalledTimes(2);
      expect(result).toBe(mockSite);
    });
  });

  describe('getSites', () => {
    it('returns cached sites when present', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify([mockSite]));
      const result = await getSites();
      expect(redisClient.get).toHaveBeenCalled();
      expect(result).toEqual([mockSite]);
    });

    it('fetches from DB and caches on miss', async () => {
      (redisClient.get as jest.Mock).mockResolvedValue(null);
      (Site.find as jest.Mock).mockResolvedValue([mockSite]);
      (redisClient.setEx as jest.Mock).mockResolvedValue('OK');
      const result = await getSites();
      expect(Site.find).toHaveBeenCalled();
      expect(redisClient.setEx).toHaveBeenCalled();
      expect(result).toEqual([mockSite]);
    });
  });

  describe('updateSite', () => {
    it('updates site and invalidates caches', async () => {
      (Site.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockSite);
      (redisClient.del as jest.Mock).mockResolvedValue(1);
      const result = await updateSite('sid', { name: 'HQ Updated' });
      expect(Site.findByIdAndUpdate).toHaveBeenCalledWith('sid', { name: 'HQ Updated' }, { new: true });
      expect(redisClient.del).toHaveBeenCalledTimes(2);
      expect(result).toBe(mockSite);
    });
  });

  describe('deleteSite', () => {
    it('deletes site and invalidates caches', async () => {
      (Site.findByIdAndDelete as jest.Mock).mockResolvedValue(mockSite);
      (redisClient.del as jest.Mock).mockResolvedValue(1);
      const result = await deleteSite('sid');
      expect(Site.findByIdAndDelete).toHaveBeenCalledWith('sid');
      expect(redisClient.del).toHaveBeenCalledTimes(2);
      expect(result).toBe(mockSite);
    });
  });
});
