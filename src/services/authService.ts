import { db } from "../data/database";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
  createdAt: Date;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: Omit<User, "password">;
}

// Service to handle authentication operations
export const authService = {
  // Sign up a new user
  signUp: async (
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    try {
      // Check if user already exists
      const existingUser = db.getUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          message: "Email already in use",
        };
      }

      // Create new user
      const newUser = db.createUser(name, email, password);
      if (!newUser) {
        return {
          success: false,
          message: "Failed to create user",
        };
      }

      // In a real app, you would hash the password before storing it
      const { password: _, ...userWithoutPassword } = newUser;

      return {
        success: true,
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        success: false,
        message: "An error occurred during sign up",
      };
    }
  },

  // Sign in an existing user
  signIn: async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Get user by email
      const user = db.getUserByEmail(email);
      if (!user) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Check password
      // In a real app, you would compare hashed passwords
      if (user.password !== password) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Set user in local storage
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      return {
        success: true,
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        success: false,
        message: "An error occurred during sign in",
      };
    }
  },

  // Sign out the current user
  signOut: (): void => {
    localStorage.removeItem("user");
  },

  // Get the current user from local storage
  getCurrentUser: (): Omit<User, "password"> | null => {
    const userJson = localStorage.getItem("user");
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!authService.getCurrentUser();
  },

  // Update user profile
  updateUserProfile: async (
    userId: string,
    name: string,
    avatarSeed?: string,
  ): Promise<boolean> => {
    try {
      const profileData: { name?: string; avatarSeed?: string } = {};
      if (name) profileData.name = name;
      if (avatarSeed) profileData.avatarSeed = avatarSeed;

      return db.updateUserProfile(userId, profileData);
    } catch (error) {
      console.error("Update profile error:", error);
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
      console.error("Change password error:", error);
      return { success: false, message: "An error occurred" };
    }
  },
};
