
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const LogoutConfirmation = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast.loading('Logging out...');
    
    setTimeout(() => {
      toast.success('Logged out successfully');
      navigate('/login');
    }, 1000);
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-imperial/10 text-imperial mb-4">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold font-montserrat">Log Out</h1>
          <p className="text-gray-500 mt-2">Are you sure you want to log out of your account?</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1" 
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-imperial hover:bg-imperial/90" 
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
