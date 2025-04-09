
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Small timeout to ensure all React contexts are properly initialized
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 100);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 text-imperial animate-spin" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
