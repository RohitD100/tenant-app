import { Request, Response, NextFunction } from 'express';
import { authorize } from '../../../src/middleware/permission';
import User from '../../../src/models/User';

jest.mock('../../../src/models/User');

describe('authorize middleware', () => {
  const requiredPermission = 'read:data';
  const middleware = authorize(requiredPermission);
  let mockReq: any;
  let mockRes: Partial<Response>;
  let nextFn: NextFunction;

  beforeEach(() => {
    mockReq = { user: { id: 'user123' } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    nextFn = jest.fn();
    jest.clearAllMocks();
  });

  it('calls next when user has required permission', async () => {
    // Mock User.findById to resolve a user with role.permissions including requiredPermission
    (User.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        role: { permissions: [requiredPermission, 'other'] },
      }),
    });

    await middleware(mockReq as Request, mockRes as Response, nextFn);
    expect(nextFn).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('returns 403 when user lacks required permission', async () => {
    (User.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        role: { permissions: ['different'] },
      }),
    });

    await middleware(mockReq as Request, mockRes as Response, nextFn);
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    expect(nextFn).not.toHaveBeenCalled();
  });
});
