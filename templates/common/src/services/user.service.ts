// Business Logic for User management
import UserRepository from '@repositories/user.repository';
import { IUser } from '@models/user.model';
import ApiError from '@utils/apiError';
import httpStatus from 'http-status';

// Define an interface for the methods UserService expects from UserRepository
interface IUserRepository {
  createUser(userData: Partial<IUser>): Promise<IUser>;
  getUserById(userId: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  updateUserById(userId: string, updateBody: Partial<IUser>): Promise<IUser>;
  deleteUserById(userId: string): Promise<void>;
}

class UserService {
  constructor(private userRepository: IUserRepository) {} // Type the parameter with the interface

  /**
   * Creates a new user.
   * @param {Partial<IUser>} userBody - User data.
   * @returns {Promise<IUser>} Created user.
   */
  async createUser(userBody: Partial<IUser>): Promise<IUser> {
    return this.userRepository.createUser(userBody);
  }

  /**
   * Get user by ID.
   * @param {string} userId - User ID.
   * @returns {Promise<IUser | null>} User document.
   */
  async getUserById(userId: string): Promise<IUser | null> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
  }

  /**
   * Get user by email.
   * @param {string} email - User email.
   * @returns {Promise<IUser | null>} User document.
   */
  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
  }

  /**
   * Update user by ID.
   * @param {string} userId - User ID.
   * @param {Partial<IUser>} updateBody - Update fields.
   * @returns {Promise<IUser>} Updated user.
   */
  async updateUserById(userId: string, updateBody: Partial<IUser>): Promise<IUser> {
    return this.userRepository.updateUserById(userId, updateBody);
  }

  /**
   * Delete user by ID.
   * @param {string} userId - User ID.
   * @returns {Promise<void>}
   */
  async deleteUserById(userId: string): Promise<void> {
    await this.userRepository.deleteUserById(userId);
  }

  // Add more business logic methods here (e.g., getAllUsers, userSearch, etc.)
}

export default new UserService(UserRepository); // Export an instance
