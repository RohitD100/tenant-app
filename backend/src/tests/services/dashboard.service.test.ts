import { getDashboardStats } from '../../../src/services/dashboard.service';
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

describe('dashboard.service', () => {
  const stats = { totalUsers: 10, activeUsers: 8, totalRoles: 3, totalSites: 2 };

  it('returns cached stats when present', async () => {
    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(stats));
    const result = await getDashboardStats();
    expect(redisClient.get).toHaveBeenCalledWith('dashboard:stats');
    expect(result).toEqual(stats);
  });

  it('calculates stats, caches and returns them on cache miss', async () => {
    (redisClient.get as jest.Mock).mockResolvedValue(null);
    (User.countDocuments as jest.Mock).mockResolvedValueOnce(10).mockResolvedValueOnce(8);
    (Role.countDocuments as jest.Mock).mockResolvedValue(3);
    (Site.countDocuments as jest.Mock).mockResolvedValue(2);
    (redisClient.setEx as jest.Mock).mockResolvedValue('OK');

    const result = await getDashboardStats();
    expect(User.countDocuments).toHaveBeenCalledTimes(2);
    expect(Role.countDocuments).toHaveBeenCalled();
    expect(Site.countDocuments).toHaveBeenCalled();
    expect(redisClient.setEx).toHaveBeenCalledWith('dashboard:stats', 300, JSON.stringify(stats));
    expect(result).toEqual(stats);
  });
});
