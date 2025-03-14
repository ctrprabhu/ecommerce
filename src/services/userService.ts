import { db, User } from "../data/database";

export interface UserProfile {
  name?: string;
  avatarSeed?: string;
}

// Service to handle user-related operations
export const userService = {
  // Get user by ID
  getUserById: async (id: string): Promise<Omit<User, "password"> | null> => {
    try {
      const user = db.getUserById(id);
      if (!user) return null;

      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  // Update user profile
  updateUserProfile: async (
    userId: string,
    profileData: UserProfile,
  ): Promise<boolean> => {
    try {
      const result = db.updateUserProfile(userId, profileData);
      return result;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    }
  },

  // Change user password
  changePassword: async (
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Get user to verify current password
      const user = db.getUserById(userId);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      // Verify current password
      if (user.password !== currentPassword) {
        return { success: false, message: "Current password is incorrect" };
      }

      // Update password
      const result = db.updateUserPassword(userId, newPassword);
      if (result) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to update password" };
      }
    } catch (error) {
      console.error("Error changing password:", error);
      return { success: false, message: "An error occurred" };
    }
  },

  // Delete user account
  deleteUserAccount: async (
    userId: string,
    password: string,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Get user to verify password
      const user = db.getUserById(userId);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      // Verify password
      if (user.password !== password) {
        return { success: false, message: "Password is incorrect" };
      }

      // Delete user
      const result = db.deleteUser(userId);
      if (result) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to delete account" };
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
      return { success: false, message: "An error occurred" };
    }
  },
};
