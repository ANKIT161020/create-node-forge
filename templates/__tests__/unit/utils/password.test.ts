// Example unit test for password utility
import { hashPassword, comparePassword } from '@utils/password';

describe('Password Utility', () => {
  const plainPassword = 'mySecurePassword123';
  let hashedPassword: string;

  beforeAll(async () => {
    hashedPassword = await hashPassword(plainPassword);
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword.length).toBeGreaterThan(0);
      expect(hashedPassword).not.toBe(plainPassword); // Should not be plain text
    });
  });

  describe('comparePassword', () => {
    it('should return true for a matching password', async () => {
      const isMatch = await comparePassword(plainPassword, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should return false for a non-matching password', async () => {
      const isMatch = await comparePassword('wrongpassword', hashedPassword);
      expect(isMatch).toBe(false);
    });
  });
});
