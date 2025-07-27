// Data Access Layer for User model
import User, { IUser } from '@models/user.model';
import ApiError from '@utils/apiError';
import httpStatus from 'http-status';
import logger from '@utils/logger';

class UserRepository {
  /**
   * Creates a new user.
   * @param {Partial<IUser>} userData - User data to create.
   * @returns {Promise<IUser>} The created user document.
   */
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    if (await User.isEmailTaken(userData.email!)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await User.create(userData);
    return user;
  }

  /**
   * Finds a user by ID.
   * @param {string} userId - The user ID.
   * @returns {Promise<IUser | null>} The user document or null if not found.
   */
  async getUserById(userId: string): Promise<IUser | null> {
    try {
      return await User.findById(userId);
    } catch (error) {
      logger.error(`Error finding user by ID ${userId}:`, error);
      // It's good practice to re-throw or handle specific Mongoose errors
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not retrieve user.');
    }
  }

  /**
   * Finds a user by email.
   * @param {string} email - The user's email.
   * @returns {Promise<IUser | null>} The user document or null if not found.
   */
  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  /**
   * Updates a user by ID.
   * @param {string} userId - The user ID.
   * @param {Partial<IUser>} updateBody - Fields to update.
   * @returns {Promise<IUser>} The updated user document.
   */
  async updateUserById(userId: string, updateBody: Partial<IUser>): Promise<IUser> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, user._id))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  }

  /**
   * Deletes a user by ID.
   * @param {string} userId - The user ID.
   */
  async deleteUserById(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.deleteOne(); // Use deleteOne for Mongoose 6+
  }

  // Add methods for pagination, filtering, etc.
}

export default new UserRepository(); // Export an instance
