import request from 'supertest';
import express from 'express';
import roleRouter from '../../../src/routes/role.routes';

// Mock middleware
jest.mock('../../../src/middleware/auth', () => jest.fn((req, res, next) => next()));
jest.mock('../../../src/middleware/permission', () => ({
  authorize: () => jest.fn((req, res, next) => next()),
}));
jest.mock('../../../src/middleware/validate', () => ({
  validate: () => jest.fn((req, res, next) => next()),
}));

// Mock controller
jest.mock('../../../src/controllers/role.controller', () => ({
  createRole: jest.fn((req, res) => res.status(201).json({})),
  getRoles: jest.fn((req, res) => res.json([])),
  updateRole: jest.fn((req, res) => res.json({})),
  deleteRole: jest.fn((req, res) => res.json({})),
}));

const app = express();
app.use(express.json());
app.use('/roles', roleRouter);

describe('Role routes', () => {
  it('POST /roles calls createRole', async () => {
    const { createRole } = await import('../../../src/controllers/role.controller');
    await request(app)
      .post('/roles')
      .send({ name: 'Admin', permissions: ['READ_USER'] })
      .expect(201);
    expect(createRole).toHaveBeenCalled();
  });

  it('GET /roles calls getRoles', async () => {
    const { getRoles } = await import('../../../src/controllers/role.controller');
    await request(app).get('/roles').expect(200);
    expect(getRoles).toHaveBeenCalled();
  });

  it('PUT /roles/:id calls updateRole', async () => {
    const { updateRole } = await import('../../../src/controllers/role.controller');
    await request(app)
      .put('/roles/123')
      .send({ name: 'SuperAdmin' })
      .expect(200);
    expect(updateRole).toHaveBeenCalled();
  });

  it('DELETE /roles/:id calls deleteRole', async () => {
    const { deleteRole } = await import('../../../src/controllers/role.controller');
    await request(app).delete('/roles/123').expect(200);
    expect(deleteRole).toHaveBeenCalled();
  });
});
