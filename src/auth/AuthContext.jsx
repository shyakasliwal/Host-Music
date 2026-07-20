import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AUTH_STORAGE_KEY, DEMO_USERS } from './constants';
import { createMockJwt, parseMockJwt } from './jwt';

const AuthContext = createContext(undefined);

function readStoredUser() {
  const token = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!token) {
    return { user: null, token: null };
  }

  const user = parseMockJwt(token);
  if (!user) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { user: null, token: null };
  }

  return { user, token };
}

export function AuthProvider({ children }) {
  const initial = readStoredUser();
  const [user, setUser] = useState(initial.user);
  const [token, setToken] = useState(initial.token);

  const login = useCallback(async (username, password) => {
    const normalized = username.trim().toLowerCase();
    const account = DEMO_USERS[normalized];

    if (!account || account.password !== password) {
      throw new Error('Invalid username or password.');
    }

    const nextToken = createMockJwt(normalized, account.role);
    localStorage.setItem(AUTH_STORAGE_KEY, nextToken);
    setToken(nextToken);
    setUser({ username: normalized, role: account.role });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
