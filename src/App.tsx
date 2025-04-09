
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import DailyQuiz from "@/pages/DailyQuiz";
import LeaderBoard from "@/pages/LeaderBoard";
import Multiplayer from "@/pages/Multiplayer";
import Profile from "@/pages/Profile";
import Subscription from "@/pages/Subscription";
import LogoutConfirmation from "@/pages/LogoutConfirmation";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes (in a real app, these would be protected with authentication) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/daily-quiz" element={<DailyQuiz />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/logout" element={<LogoutConfirmation />} />
          
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
