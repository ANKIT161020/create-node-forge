// Example integration test for authentication endpoints
import request from 'supertest';
import httpStatus from 'http-status';
import { AUTH_MESSAGES, USER_ROLES } from '@config/constants';
import app from '../../src/app'; // Import your Express app

describe('Auth Routes', () => {
  let newUser: { name: string; email: string; password: string };

  beforeEach(() => {
    newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123A',
    };
  });

  describe('POST /api/auth/register', () => {
    it('should return 201 and user info if registration is successful', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toHaveProperty('user');
      expect(res.body.user.email).toBe(newUser.email);
      expect(res.body.user).not.toHaveProperty('password'); // Password should not be returned
      expect(res.body.user.role).toBe(USER_ROLES.USER);
      expect(res.body).toHaveProperty('tokens');
      expect(res.body.tokens).toHaveProperty('accessToken');
      expect(res.body.tokens).toHaveProperty('refreshToken');
    });

    it('should return 400 if email is already taken', async () => {
      await request(app).post('/api/auth/register').send(newUser).expect(httpStatus.CREATED);

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.message).toContain('Email already taken');
    });

    it('should return 400 if password is too short', async () => {
      newUser.password = 'short';
      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
      expect(res.body.message).toContain('password" length must be at least 8 characters long');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 and tokens if login is successful', async () => {
      await request(app).post('/api/auth/register').send(newUser).expect(httpStatus.CREATED); // Register user first

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: newUser.email,
          password: newUser.password,
        })
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty('user');
      expect(res.body.user.email).toBe(newUser.email);
      expect(res.body).toHaveProperty('tokens');
    });

    it('should return 401 if email is not registered', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'anypassword',
        })
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.message).toBe(AUTH_MESSAGES.INVALID_CREDENTIALS);
    });

    it('should return 401 if password is incorrect', async () => {
      await request(app).post('/api/auth/register').send(newUser).expect(httpStatus.CREATED);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: newUser.email,
          password: 'wrongpassword',
        })
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.message).toBe(AUTH_MESSAGES.INVALID_CREDENTIALS);
    });
  });

  describe('GET /api/auth/me', () => {
    let accessToken: string;
    beforeEach(async () => {
      await request(app).post('/api/auth/register').send(newUser).expect(httpStatus.CREATED);
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: newUser.email, password: newUser.password });
      accessToken = loginRes.body.tokens.accessToken;
    });

    it('should return 200 and authenticated user if token is valid', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(httpStatus.OK);

      expect(res.body.email).toBe(newUser.email);
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return 401 if no token is provided', async () => {
      const res = await request(app).get('/api/auth/me').expect(httpStatus.UNAUTHORIZED);
      expect(res.body.message).toBe(AUTH_MESSAGES.UNAUTHORIZED);
    });

    it('should return 401 if token is invalid', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(httpStatus.UNAUTHORIZED);
      expect(res.body.message).toBe(AUTH_MESSAGES.UNAUTHORIZED);
    });
  });
});
