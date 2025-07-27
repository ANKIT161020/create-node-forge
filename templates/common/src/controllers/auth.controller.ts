// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '@utils/catchAsync';
import AuthService from '@services/auth.service';
import apiResponse from '@utils/apiResponse';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123A
 *     responses:
 *       201:
 *         description: User successfully registered and logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUz...
 *                     refreshToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUz...
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 */
export const register = catchAsync(async (req: Request, res: Response) => {
  const { user, tokens } = await AuthService.registerUser(req.body);
  res
    .status(httpStatus.CREATED)
    .send(apiResponse({ user, tokens }, 'User registered and logged in successfully.'));
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123A
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUz...
 *                     refreshToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUz...
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, tokens } = await AuthService.loginUserWithEmailAndPassword(email, password);
  res.send(apiResponse({ user, tokens }, 'User logged in successfully.'));
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     responses:
 *       204:
 *         description: Successfully logged out (token should be deleted client-side)
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
export const logout = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user's profile
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
export const getMe = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send(apiResponse(req.user, 'User profile retrieved successfully.'));
});
