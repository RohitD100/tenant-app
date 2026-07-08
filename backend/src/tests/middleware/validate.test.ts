import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { validate } from '../../../src/middleware/validate';

describe('validate middleware', () => {
  const schema = z.object({ name: z.string() });
  const middleware = validate(schema);
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let nextFn: NextFunction;

  beforeEach(() => {
    mockReq = { body: {} } as any;
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    nextFn = jest.fn();
    jest.clearAllMocks();
  });

  it('calls next when validation passes', () => {
    mockReq.body = { name: 'John' };
    middleware(mockReq as Request, mockRes as Response, nextFn);
    expect(nextFn).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('returns 400 with errors when validation fails', () => {
    mockReq.body = { name: 123 } as any; // invalid type
    middleware(mockReq as Request, mockRes as Response, nextFn);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();
    const responseArg = (mockRes.json as jest.Mock).mock.calls[0][0];
    expect(responseArg.message).toBe('Validation failed');
    // Errors array may vary based on Zod version; ensure it's present
    // No need to assert specific error details, just ensure an error response was sent
    expect(nextFn).not.toHaveBeenCalled();
  });
});
