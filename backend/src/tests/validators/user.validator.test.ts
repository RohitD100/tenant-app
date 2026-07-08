import { createUserSchema, updateUserSchema } from '../../../src/validators/user.validator';

describe('user.validator', () => {
  const validUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'Passw0rd!',
    role: 'roleId',
    site: 'siteId',
    status: 'active' as const,
  };

  test('createUserSchema passes with valid data', () => {
    expect(() => createUserSchema.parse(validUser)).not.toThrow();
  });

  test('createUserSchema fails on short name', () => {
    const data = { ...validUser, name: 'Jo' };
    expect(() => createUserSchema.parse(data)).toThrow();
  });

  test('createUserSchema fails on invalid email', () => {
    const data = { ...validUser, email: 'not-an-email' };
    expect(() => createUserSchema.parse(data)).toThrow();
  });

  test('createUserSchema fails on weak password', () => {
    const data = { ...validUser, password: 'weak' };
    expect(() => createUserSchema.parse(data)).toThrow();
  });

  test('updateUserSchema allows partial updates', () => {
    const partial = { email: 'new@example.com' };
    expect(() => updateUserSchema.parse(partial)).not.toThrow();
  });

  test('updateUserSchema fails on invalid password criteria', () => {
    const partial = { password: 'short' };
    expect(() => updateUserSchema.parse(partial)).toThrow();
  });
});
