import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        if (username === 'admin' && password === 'admin') {
            setUser({ username: 'admin', role: 'admin' });
            return true;
        } else if (username === 'user' && password === 'user') {
            setUser({ username: 'user', role: 'user' });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
