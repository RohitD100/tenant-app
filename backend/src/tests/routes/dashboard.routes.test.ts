import request from 'supertest';
import express from 'express';
import dashboardRouter from '../../../src/routes/dashboard.routes';

// Mock auth middleware to bypass authentication
jest.mock('../../../src/middleware/auth', () => jest.fn((req, res, next) => next()));

// Mock controller
jest.mock('../../../src/controllers/dashboard.controller', () => ({
  getDashboard: jest.fn((req, res) => res.json({})),
}));

const app = express();
app.use('/dashboard', dashboardRouter);

describe('Dashboard routes', () => {
  it('GET /dashboard calls getDashboard controller', async () => {
    const { getDashboard } = await import('../../../src/controllers/dashboard.controller');
    await request(app).get('/dashboard').expect(200);
    expect(getDashboard).toHaveBeenCalled();
  });
});
