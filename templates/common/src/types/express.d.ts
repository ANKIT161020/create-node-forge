// Custom types for Express Request object
import { IUser } from '@models/user.model'; // Import your user interface

declare global {
  namespace Express {
    // Extend the Request interface to include the 'user' property
    interface Request {
      user?: IUser; // The authenticated user object
      token?: string; // The access token string
    }
  }
}
