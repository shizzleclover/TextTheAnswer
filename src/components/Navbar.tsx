
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Award, Home, Calendar, Users, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
    { name: 'Daily Quiz', path: '/daily-quiz', icon: <Calendar className="w-5 h-5 mr-2" /> },
    { name: 'Multiplayer', path: '/multiplayer', icon: <Users className="w-5 h-5 mr-2" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Award className="w-5 h-5 mr-2" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5 mr-2" /> },
  ];
  
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 py-3">
      <div className="container flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center">
          <span className="font-montserrat text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-imperial to-cherry-blossom">
            TextTheAnswer
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              className={`flex items-center ${isActive(item.path) ? 'bg-imperial text-white' : 'hover:bg-imperial/10'}`}
              asChild
            >
              <Link to={item.path}>
                {item.icon}
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-sm z-50 animate-fade-in">
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "outline"}
                className={`justify-start ${isActive(item.path) ? 'bg-imperial text-white' : ''}`}
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link to={item.path}>
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
            <Button variant="ghost" className="justify-start text-imperial mt-4" asChild>
              <Link to="/logout">
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
