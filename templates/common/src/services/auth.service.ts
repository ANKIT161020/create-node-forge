// Business Logic for Authentication
import httpStatus from 'http-status';
import ApiError from '@utils/apiError';
import { generateAuthTokens } from '@utils/jwt';
import UserService from '@services/user.service'; // This imports the *instance* of UserService
import { AUTH_MESSAGES } from '@config/constants';

// To correctly type the constructor parameter, we need to import the class itself.
// Since UserService is exported as a default *instance*, we need to adjust how we import it
// or how we define the constructor.
// A common pattern is to export the class as default, and then instantiate it where needed.
// For now, let's assume UserService is a class that we can type-reference.

// If UserService is always an instance, you might not need to type it in the constructor
// if you're just accessing its methods. However, for clarity and type safety,
// it's better to ensure the injected dependency matches a known type.

// Let's assume UserService is a class that is instantiated elsewhere.
// If UserService is truly always an instance, you might not need a constructor for it
// in AuthService, or you'd type it as 'any' or define an interface for its methods.

// Given the current setup where UserService is exported as a default *instance*,
// the most direct fix for this specific error is to use 'typeof UserService'
// if you were trying to refer to the *class constructor type*.
// However, since you're injecting an *instance*, the constructor should expect an instance.

// Let's modify UserService to export the class directly, and then instantiate it.
// For now, I'll adjust AuthService to correctly type the injected instance.

// Assuming UserService is a class, we need to import the class type, not the instance.
// Since user.service.ts exports `export default new UserService(UserRepository);`,
// we are importing an instance.
// The best practice here is to export the class itself from user.service.ts,
// and then instantiate it in server.ts or app.ts, and pass that instance around.

// For now, to fix the immediate TypeScript error while maintaining the current
// instantiation pattern (which is less ideal for dependency injection),
// we will use `typeof UserService` to refer to the class's type,
// and then infer the instance type from that.

// A cleaner approach would be:
// 1. In src/services/user.service.ts: `export class UserService { ... }`
// 2. In src/services/auth.service.ts: `import { UserService } from '@services/user.service';`
// 3. In AuthService constructor: `constructor(private userService: UserService) {}`
// 4. In server.ts/app.ts: `const userService = new UserService(UserRepository);`
//                        `const authService = new AuthService(userService);`

// For the current structure, let's adjust the type.
// The error `UserService' refers to a value, but is being used as a type here` implies
// you're trying to use the *instance* as a *type*.

// Let's define an interface for the methods AuthService expects from UserService.
// This is the most robust way to handle dependency injection with instances.
interface IUserService {
  getUserByEmail(email: string): Promise<any | null>; // Use any for now, or define IUser
  createUser(userBody: any): Promise<any>; // Use any for now, or define IUser
}

// Now, AuthService will expect an object that conforms to IUserService.
// The actual `UserService` instance (from `import UserService from '@services/user.service';`)
// will satisfy this interface.
class AuthService {
  constructor(private userService: IUserService) {} // Type the parameter with the interface

  /**
   * Logs in a user.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise<Object>} User and tokens object.
   */
  async loginUserWithEmailAndPassword(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, AUTH_MESSAGES.INVALID_CREDENTIALS);
    }
    const tokens = generateAuthTokens(user._id.toString());
    return { user, tokens };
  }

  /**
   * Registers a new user.
   * @param {object} userBody - User registration data (name, email, password).
   * @returns {Promise<Object>} Created user and tokens object.
   */
  async registerUser(userBody: { name: string; email: string; password: string }) {
    // UserService will handle email taken check
    const user = await this.userService.createUser(userBody);
    const tokens = generateAuthTokens(user._id.toString());
    return { user, tokens };
  }

  // Add refresh token logic, password reset, email verification, etc.
}

// When exporting the instance, ensure it's compatible with IUserService.
// This line remains as is, as it's exporting the instance.
export default new AuthService(UserService);
