import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CompetitionSelect from "./pages/CompetitionSelect";
import ThankYou from "./pages/ThankYou";
import { useState, useEffect } from "react";
import { RegistrationFlowModal } from "./components/RegistrationFlowModal";

const queryClient = new QueryClient();

const App = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Set page as loaded after a small delay to ensure smooth transitions
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOpenRegistration = () => {
    setShowRegistrationModal(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="app-wrapper min-h-screen bg-gradient-to-b from-black to-[#1a1a2e]">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div 
              className="page-transition-wrapper"
              style={{
                opacity: isPageLoaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out"
              }}
            >
              <Routes>
                <Route path="/" element={<Index onRegistrationClick={handleOpenRegistration} />} />
                <Route path="/competitions" element={<CompetitionSelect />} />
                <Route path="/thank-you" element={<ThankYou />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            
            <RegistrationFlowModal 
              isOpen={showRegistrationModal}
              onClose={() => setShowRegistrationModal(false)}
            />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
