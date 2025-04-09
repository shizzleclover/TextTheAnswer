
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showSignUpLink?: boolean;
  showLoginLink?: boolean;
}

const AuthLayout = ({ 
  children, 
  title,
  subtitle,
  showSignUpLink = false,
  showLoginLink = false
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dutch-white/30 via-white to-carolina-blue/20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-imperial to-cherry-blossom">
              TextTheAnswer
            </h1>
          </Link>
          <div className="h-1 w-16 mx-auto mt-2 rounded bg-gradient-to-r from-imperial to-cherry-blossom"></div>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
          <div className="p-8">
            <h2 className="text-2xl font-semibold font-montserrat mb-1 text-gray-800">{title}</h2>
            {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
            
            {children}
            
            <div className="mt-6 text-center text-sm">
              {showSignUpLink && (
                <div>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-imperial hover:underline font-medium">
                    Create account
                  </Link>
                </div>
              )}
              
              {showLoginLink && (
                <div>
                  Already have an account?{" "}
                  <Link to="/login" className="text-imperial hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
