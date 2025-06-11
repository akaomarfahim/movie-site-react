import { createContext, useContext, useState, useEffect } from "react";

/**
 * Authentication Context for managing user state
 */
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Demo user data for portfolio project
const DEMO_USERS = [
  {
    id: 1,
    email: "movie@movieapp.com",
    password: "password",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Movie enthusiast and film critic. Love exploring different genres and discovering hidden gems.",
    joinDate: "2023-01-15",
    favoriteGenres: ["Action", "Sci-Fi", "Thriller"],
    watchedMovies: 247,
    reviews: 18,
  },
  {
    id: 3,
    email: "demo@movieapp.com",
    password: "demo123",
    name: "Demo User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    bio: "This is a demo account for testing the movie application features.",
    joinDate: "2024-01-01",
    favoriteGenres: ["Horror", "Mystery", "Documentary"],
    watchedMovies: 156,
    reviews: 12,
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem("movieapp_user");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading saved session:", error);
        localStorage.removeItem("movieapp_user");
      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Find user in demo data
      const foundUser = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;

      setUser(userWithoutPassword);
      localStorage.setItem("movieapp_user", JSON.stringify(userWithoutPassword));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("movieapp_user");
  };

  const updateProfile = (updates) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("movieapp_user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    demoUsers: DEMO_USERS.map(({ password, ...user }) => ({
      ...user,
      email: user.email,
    })), // Provide demo emails without passwords
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
