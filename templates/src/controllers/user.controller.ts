// Handles User management requests, delegates to UserService
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '@utils/catchAsync';
import UserService from '@services/user.service';
import { USER_ROLES } from '@config/constants';
import ApiError from '@utils/apiError';
import { IUser } from '@models/user.model';
import apiResponse from '@utils/apiResponse';

/**
 * Get a user by ID.
 * @route GET /api/users/:userId
 * @access Private (Admin only, or user themselves)
 */
export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getUserById(req.params.userId);
  res.send(apiResponse(user, 'User retrieved successfully.'));
});

/**
 * Update a user by ID.
 * @route PATCH /api/users/:userId
 * @access Private (Admin only, or user themselves)
 */
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  // Assert that req.user is of type IUser.
  // The 'auth' middleware ensures that req.user is set and is an IUser object
  // if the request reaches this point.
  const authenticatedUser = req.user as IUser;

  // Ensure a user can only update their own profile unless they are an admin
  if (
    authenticatedUser.role !== USER_ROLES.ADMIN &&
    authenticatedUser._id.toString() !== req.params.userId
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You can only update your own profile.');
  }

  const user = await UserService.updateUserById(req.params.userId, req.body);
  res.send(user);
  res.send(apiResponse(user, 'User updated successfully'));
});

/**
 * Delete a user by ID.
 * @route DELETE /api/users/:userId
 * @access Private (Admin only)
 */
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await UserService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});
