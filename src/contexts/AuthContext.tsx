import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "../services/authService";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  signOut: () => void;
  updateUserProfile: (profileData: {
    name?: string;
    avatarSeed?: string;
  }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.signIn(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      setIsLoading(false);
      return { success: result.success, message: result.message };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: "An error occurred during sign in" };
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.signUp(name, email, password);
      setIsLoading(false);
      return { success: result.success, message: result.message };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: "An error occurred during sign up" };
    }
  };

  const signOut = () => {
    authService.signOut();
    setUser(null);
  };

  const updateUserProfile = async (profileData: {
    name?: string;
    avatarSeed?: string;
  }) => {
    if (!user) return false;

    try {
      const success = await authService.updateUserProfile(
        user.id,
        profileData.name || "",
        profileData.avatarSeed,
      );

      if (success) {
        // Update local user state
        setUser((prev) =>
          prev
            ? {
                ...prev,
                name: profileData.name || prev.name,
                avatarSeed: profileData.avatarSeed || prev.avatarSeed,
              }
            : null,
        );

        // Update user in localStorage
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            name: profileData.name || currentUser.name,
            avatarSeed: profileData.avatarSeed || currentUser.avatarSeed,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
