import request from 'supertest';
import express from 'express';
import authRouter from '../../../src/routes/auth.routes';

// Mock controller functions
jest.mock('../../../src/controllers/auth.controller', () => ({
  signup: jest.fn((req, res) => res.status(201).json({ message: 'User created' })),
  login: jest.fn((req, res) => res.status(200).json({ token: 'jwt', user: { id: '1' } })),
}));

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('Auth routes', () => {
  it('POST /auth/signup calls signup controller', async () => {
    const { signup } = await import('../../../src/controllers/auth.controller');
    await request(app)
      .post('/auth/signup')
      .send({ name: 'John', email: 'john@example.com', password: 'pwd' })
      .expect(201);
    expect(signup).toHaveBeenCalled();
  });

  it('POST /auth/login calls login controller', async () => {
    const { login } = await import('../../../src/controllers/auth.controller');
    await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com', password: 'pwd' })
      .expect(200);
    expect(login).toHaveBeenCalled();
  });
});
