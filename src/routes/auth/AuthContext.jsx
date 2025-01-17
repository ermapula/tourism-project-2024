import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user');
    }
  }, [user])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}