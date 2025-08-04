// src/components/Layout.tsx
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ToastContainer } from './ToastContainer';
import { useToast } from '../hooks/useToast';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const Layout = ({ 
  children, 
  showNavbar = true, 
  showFooter = true,
  className = "" 
}: LayoutProps) => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Toast Container Global */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Navbar */}
      {showNavbar && <Navbar />}
      
      {/* Contenido principal */}
      <main className={`flex-1 ${showNavbar ? 'navbar-offset' : ''}`}>
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

// Variantes de Layout para casos específicos
export const AuthLayout = ({ children }: { children: ReactNode }) => (
  <Layout showNavbar={false} showFooter={false} className="bg-gradient-to-br from-purple-50 to-indigo-100">
    {children}
  </Layout>
);

export const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <Layout showFooter={false} className="bg-gray-50">
    {children}
  </Layout>
);

export const LandingLayout = ({ children }: { children: ReactNode }) => (
  <Layout className="bg-white">
    {children}
  </Layout>
);