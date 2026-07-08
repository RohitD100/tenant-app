import { validateSignup, validateLogin } from '../../../src/validators/auth.validator';

describe('auth.validator', () => {
  describe('validateSignup', () => {
    it('passes with valid data', () => {
      expect(() => validateSignup({ name: 'John', email: 'john@example.com', password: 'Passw0rd!' })).not.toThrow();
    });
    it('throws when fields missing', () => {
      expect(() => validateSignup({ name: '', email: 'john@example.com', password: 'Passw0rd!' })).toThrow('All fields are required');
      expect(() => validateSignup({ name: 'John', email: '', password: 'Passw0rd!' })).toThrow('All fields are required');
    });
    it('throws when password too short', () => {
      expect(() => validateSignup({ name: 'John', email: 'john@example.com', password: '123' })).toThrow('Password must be at least 6 characters');
    });
  });

  describe('validateLogin', () => {
    it('passes with valid data', () => {
      expect(() => validateLogin({ email: 'john@example.com', password: 'Passw0rd!' })).not.toThrow();
    });
    it('throws when missing fields', () => {
      expect(() => validateLogin({ email: '', password: 'Passw0rd!' })).toThrow('Email and password are required');
    });
  });
});
