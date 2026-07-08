import request from 'supertest';
import express from 'express';
import siteRouter from '../../../src/routes/site.routes';

// Mock middleware
jest.mock('../../../src/middleware/auth', () => jest.fn((req, res, next) => next()));
jest.mock('../../../src/middleware/permission', () => ({
  authorize: () => jest.fn((req, res, next) => next()),
}));
jest.mock('../../../src/middleware/validate', () => ({
  validate: () => jest.fn((req, res, next) => next()),
}));

// Mock controller
jest.mock('../../../src/controllers/site.controller', () => ({
  createSite: jest.fn((req, res) => res.status(201).json({})),
  getSites: jest.fn((req, res) => res.json([])),
  updateSite: jest.fn((req, res) => res.json({})),
  deleteSite: jest.fn((req, res) => res.json({})),
}));

const app = express();
app.use(express.json());
app.use('/sites', siteRouter);

describe('Site routes', () => {
  it('POST /sites calls createSite', async () => {
    const { createSite } = await import('../../../src/controllers/site.controller');
    await request(app)
      .post('/sites')
      .send({ name: 'HQ', location: 'NY', timezone: 'America/New_York' })
      .expect(201);
    expect(createSite).toHaveBeenCalled();
  });

  it('GET /sites calls getSites', async () => {
    const { getSites } = await import('../../../src/controllers/site.controller');
    await request(app).get('/sites').expect(200);
    expect(getSites).toHaveBeenCalled();
  });

  it('PUT /sites/:id calls updateSite', async () => {
    const { updateSite } = await import('../../../src/controllers/site.controller');
    await request(app)
      .put('/sites/123')
      .send({ name: 'HQ Updated' })
      .expect(200);
    expect(updateSite).toHaveBeenCalled();
  });

  it('DELETE /sites/:id calls deleteSite', async () => {
    const { deleteSite } = await import('../../../src/controllers/site.controller');
    await request(app).delete('/sites/123').expect(200);
    expect(deleteSite).toHaveBeenCalled();
  });
});
