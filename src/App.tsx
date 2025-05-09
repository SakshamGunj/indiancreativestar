
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CompetitionSelect from "./pages/CompetitionSelect";
import ThankYou from "./pages/ThankYou";
import { useState } from "react";
import { RegistrationFlowModal } from "./components/RegistrationFlowModal";

const queryClient = new QueryClient();

const App = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleOpenRegistration = () => {
    setShowRegistrationModal(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/competitions" element={<CompetitionSelect />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <RegistrationFlowModal 
            isOpen={showRegistrationModal}
            onClose={() => setShowRegistrationModal(false)}
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
