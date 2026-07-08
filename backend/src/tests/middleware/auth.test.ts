import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import auth from '../../../src/middleware/auth';
import { AuthRequest } from '../../../src/types/express';

jest.mock('jsonwebtoken');

describe('auth middleware', () => {
  let mockReq: any;
  let mockRes: Partial<Response>;
  let nextFn: NextFunction;

  beforeEach(() => {
    mockReq = { headers: {} } as any;
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    nextFn = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 when no token is provided', () => {
    auth(mockReq as AuthRequest, mockRes as Response, nextFn);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    expect(nextFn).not.toHaveBeenCalled();
  });

  it('should return 401 when token is invalid', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('invalid');
    });
    mockReq.headers.authorization = 'Bearer invalidtoken';
    auth(mockReq as AuthRequest, mockRes as Response, nextFn);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(nextFn).not.toHaveBeenCalled();
  });

  it('should attach decoded user to request and call next when token is valid', () => {
    const decoded = { id: 'user123', role: 'admin' };
    (jwt.verify as jest.Mock).mockReturnValue(decoded);
    mockReq.headers.authorization = 'Bearer validtoken';
    auth(mockReq as AuthRequest, mockRes as Response, nextFn);
    expect((mockReq as any).user).toEqual(decoded);
    expect(nextFn).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });
});
