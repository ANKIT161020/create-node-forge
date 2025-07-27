// src/models/user.model.ts
// Mongoose User Schema and Model
import mongoose, { Schema, Document, Model } from 'mongoose'; // Import Model
import validator from 'validator';
import { hashPassword, comparePassword } from '@utils/password';
import { USER_ROLES } from '@config/constants';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *           example: 60d5ec49f1c7d20015b8b4c5
 *         name:
 *           type: string
 *           description: User's full name
 *           example: Jane Doe
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address (unique)
 *           example: jane.doe@example.com
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *           description: User's role in the system
 *           example: user
 *         isEmailVerified:
 *           type: boolean
 *           description: Whether the user's email has been verified
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the user was last updated
 */

// Define the interface for a User document
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly define _id type
  name: string;
  email: string;
  password?: string; // Optional because it's not always returned or directly accessible
  role: string;
  isEmailVerified: boolean;
  isPasswordMatch: (password: string) => Promise<boolean>;
}

// Define an interface for the User Model, including static methods
interface IUserModel extends mongoose.Model<IUser> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // Used to hide the password field by default in queries
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    toJSON: {
      transform(doc, ret: any) {
        // Cast 'ret' to 'any' to allow deletion of properties that
        // might not be explicitly marked as optional in the type definition,
        // but are known to be removable at runtime by Mongoose's toJSON.
        const transformedRet: any = ret;
        delete transformedRet.password; // Remove password field from JSON output
        delete transformedRet.__v;
        return transformedRet;
      },
    },
  },
);

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (user.isModified('password')) {
    user.password = await hashPassword(user.password!); // Hash the password
  }
  next();
});

// Method to check if entered password matches the hashed password
userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  const user = this as IUser;
  return comparePassword(password, user.password!);
};

// Define the static method as a standalone function first
// IMPORTANT: Explicitly type 'this' as mongoose.Model<IUser> for static methods.
const isEmailTakenStatic = async function (
  this: Model<IUser>, // Explicitly type 'this' for static method
  email: string,
  excludeUserId?: mongoose.Types.ObjectId,
): Promise<boolean> {
  // 'this' will correctly refer to the User Model at runtime when assigned to statics
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user; // Returns true if user exists, false otherwise
};

// Assign the standalone function to the statics property
userSchema.statics.isEmailTaken = isEmailTakenStatic;

// Explicitly type the Mongoose model with the custom static methods
const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
