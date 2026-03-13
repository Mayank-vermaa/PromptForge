import { useState, useCallback } from 'react';
import { users, User } from '@/utils/mockData';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('pf_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((username: string, _password: string) => {
    const found = users.find(u => u.username === username);
    if (found) {
      setUser(found);
      localStorage.setItem('pf_user', JSON.stringify(found));
      return true;
    }
    // Demo: auto-login as alice
    setUser(users[0]);
    localStorage.setItem('pf_user', JSON.stringify(users[0]));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('pf_user');
  }, []);

  return { user, login, logout, isAuthenticated: !!user };
}
