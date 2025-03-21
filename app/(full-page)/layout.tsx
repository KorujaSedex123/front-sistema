import { Metadata } from 'next';
import AppConfig from '../../layout/AppConfig';
import React from 'react';
import { AuthProvider } from './auth/context/AuthContext';

interface SimpleLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Korion Project',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.'
};

export default function SimpleLayout({ children }: SimpleLayoutProps) {
    return (
        <React.Fragment>
            <AuthProvider> 
                {children}
            </AuthProvider>
        </React.Fragment>
    );
}