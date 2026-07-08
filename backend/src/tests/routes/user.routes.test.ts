import request from 'supertest';
import express from 'express';
import userRouter from '../../../src/routes/user.routes';

// Mock middleware to bypass auth/authorize/validate
jest.mock('../../../src/middleware/auth', () => jest.fn((req, res, next) => next()));
jest.mock('../../../src/middleware/permission', () => ({
  authorize: () => jest.fn((req, res, next) => next()),
}));
jest.mock('../../../src/middleware/validate', () => ({
  validate: () => jest.fn((req, res, next) => next()),
}));

// Mock controller functions
jest.mock('../../../src/controllers/user.controller', () => ({
  createUser: jest.fn((req, res) => res.status(201).json({})),
  getUsers: jest.fn((req, res) => res.json([])),
  getUserById: jest.fn((req, res) => res.json({})),
  updateUser: jest.fn((req, res) => res.json({})),
  deactivateUser: jest.fn((req, res) => res.json({})),
}));

const app = express();
app.use(express.json());
app.use('/users', userRouter);

describe('User routes', () => {
  it('POST /users calls createUser', async () => {
    const { createUser } = await import('../../../src/controllers/user.controller');
    await request(app)
      .post('/users')
      .send({ name: 'John', email: 'john@example.com', password: 'pwd', roleId: 1 })
      .expect(201);
    expect(createUser).toHaveBeenCalled();
  });

  it('GET /users calls getUsers', async () => {
    const { getUsers } = await import('../../../src/controllers/user.controller');
    await request(app).get('/users').expect(200);
    expect(getUsers).toHaveBeenCalled();
  });

  it('GET /users/:id calls getUserById', async () => {
    const { getUserById } = await import('../../../src/controllers/user.controller');
    await request(app).get('/users/123').expect(200);
    expect(getUserById).toHaveBeenCalled();
  });

  it('PUT /users/:id calls updateUser', async () => {
    const { updateUser } = await import('../../../src/controllers/user.controller');
    await request(app)
      .put('/users/123')
      .send({ name: 'John Updated' })
      .expect(200);
    expect(updateUser).toHaveBeenCalled();
  });

  it('PATCH /users/:id/deactivate calls deactivateUser', async () => {
    const { deactivateUser } = await import('../../../src/controllers/user.controller');
    await request(app).patch('/users/123/deactivate').expect(200);
    expect(deactivateUser).toHaveBeenCalled();
  });
});
