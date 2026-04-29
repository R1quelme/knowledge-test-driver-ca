import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

const noop = () => {};

const stubValue = {
  user: null,
  isAuthenticated: true,
  isLoadingAuth: false,
  isLoadingPublicSettings: false,
  authError: null,
  appPublicSettings: null,
  authChecked: true,
  logout: noop,
  navigateToLogin: noop,
  checkUserAuth: noop,
  checkAppState: noop,
};

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={stubValue}>{children}</AuthContext.Provider>
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
