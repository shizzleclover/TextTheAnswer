
import React from 'react';
import Navbar from '@/components/Navbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 container py-6">
          {children}
        </main>
        <footer className="py-6 border-t bg-white/70 backdrop-blur-sm">
          <div className="container text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Text the Answer. All rights reserved.
          </div>
        </footer>
      </div>
      <Toaster position="top-center" />
    </TooltipProvider>
  );
};

export default MainLayout;
