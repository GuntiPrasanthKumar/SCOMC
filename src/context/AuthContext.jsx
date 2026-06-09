import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const mockUsers = {
  'citizen@scomc.gov.in': { name: 'Rajesh Kumar', role: 'citizen', department: null },
  'staff@scomc.gov.in': { name: 'Narasimha Rao', role: 'staff', department: 'Roads & Infrastructure' },
  'admin@scomc.gov.in': { name: 'Commissioner Arvind Kumar', role: 'admin', department: 'Municipal Corporation' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('scomc_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email, password, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = mockUsers[email];
        if (mockUser || password === 'demo') {
          const userData = mockUser || { name: email.split('@')[0], role, department: role === 'citizen' ? null : 'General' };
          const fullUser = { ...userData, email };
          setUser(fullUser);
          localStorage.setItem('scomc_user', JSON.stringify(fullUser));
          resolve(fullUser);
        } else {
          // Allow any login for demo
          const userData = { name: email.split('@')[0], role: role || 'citizen', email, department: null };
          setUser(userData);
          localStorage.setItem('scomc_user', JSON.stringify(userData));
          resolve(userData);
        }
      }, 800);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('scomc_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
