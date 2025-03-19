// src/context/AuthContext.tsx
'use client'; // Adicione esta linha

import React, { createContext, useContext, useState } from 'react';

// Define o tipo do contexto
type AuthContextType = {
    isAuthenticated: boolean;
    setAuthenticated: (auth: boolean) => void;
};

// Cria o contexto
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuthenticated: () => {}
});

// Provedor de autenticação
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useAuth = () => useContext(AuthContext);