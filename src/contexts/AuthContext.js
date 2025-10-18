import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  users: [],
  login: () => {},
  signup: () => {},
  logout: () => {},
  updateUserLocation: () => {},
  isAuthenticated: false,
});

const MAX_USERS = 10; // Store up to 10 users locally

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load users and current session from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('verityguard_users');
    const currentSession = localStorage.getItem('verityguard_session');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    
    if (currentSession) {
      setUser(JSON.parse(currentSession));
    }
  }, []);

  // Save users to localStorage whenever they change
  const saveUsers = (userList) => {
    localStorage.setItem('verityguard_users', JSON.stringify(userList));
    setUsers(userList);
  };

  // Signup - create new user account
  const signup = (userData) => {
    const { name, email, password, role = 'user' } = userData;

    // Validation
    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Check if email already exists
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }

    // Check user limit
    if (users.length >= MAX_USERS) {
      return { success: false, error: 'Maximum user limit reached (10 users)' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password, // In production, this should be hashed
      role,
      location: null,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    // Auto-login after signup
  const userSession = { ...newUser };
    delete userSession.password; // Don't store password in session
    setUser(userSession);
    localStorage.setItem('verityguard_session', JSON.stringify(userSession));

    return { success: true, user: userSession };
  };

  // Login - authenticate existing user
  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Update last login
    const updatedUsers = users.map((u) =>
      u.id === foundUser.id ? { ...u, lastLogin: new Date().toISOString() } : u
    );
    saveUsers(updatedUsers);

    // Set session
  const userSession = { ...foundUser };
    delete userSession.password;
    setUser(userSession);
    localStorage.setItem('verityguard_session', JSON.stringify(userSession));

    return { success: true, user: userSession };
  };

  // Logout - clear session
  const logout = () => {
    setUser(null);
    localStorage.removeItem('verityguard_session');
  };

  // Update user location
  const updateUserLocation = (location) => {
    if (!user) return;

    const updatedUser = { ...user, location };
    setUser(updatedUser);
    localStorage.setItem('verityguard_session', JSON.stringify(updatedUser));

    // Also update in users list
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, location } : u
    );
    saveUsers(updatedUsers);
  };

  const value = {
    user,
    users,
    login,
    signup,
    logout,
    updateUserLocation,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
