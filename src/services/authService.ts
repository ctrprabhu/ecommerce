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
};
