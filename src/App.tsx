import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CompetitionSelect from "./pages/CompetitionSelect";
import ThankYou from "./pages/ThankYou";
import VotingPage from "./VotingPage";
import AdminPage from "./pages/voting/admin";
import { GalleryPage } from "./pages/GalleryPage"; // Import the new GalleryPage component
import SikkimCreativeStar from "./pages/SikkimCreativeStar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { LaunchScreen } from "./components/LaunchScreen";
import { checkLaunchScreenStatus, disableLaunchScreenGlobally } from "./lib/firebase";
import { useEffect, useState } from "react";
import { RegistrationFlowModal } from "./components/RegistrationFlowModal";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showLaunchScreen, setShowLaunchScreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCheckingLaunchStatus, setIsCheckingLaunchStatus] = useState(true);

  useEffect(() => {
    // Check Firebase for global launch screen setting only
    const checkLaunchSetting = async () => {
      try {
        setIsCheckingLaunchStatus(true);
        const shouldShowLaunch = await checkLaunchScreenStatus();
        setShowLaunchScreen(shouldShowLaunch);
      } catch (error) {
        console.error('Error checking launch screen status:', error);
        // On error, default to not showing launch screen
        setShowLaunchScreen(false);
      } finally {
        setIsCheckingLaunchStatus(false);
      }
    };

    checkLaunchSetting();

    // Set page as loaded after a small delay to ensure smooth transitions
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenRegistration = () => {
    setShowRegistrationModal(true);
  };

  const handleLaunch = async () => {
    setIsTransitioning(true);
    
    // Disable launch screen globally for everyone
    await disableLaunchScreenGlobally();
    
    // Start hiding launch screen immediately
    setTimeout(() => {
      setShowLaunchScreen(false);
    }, 200);
    // Complete transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  // Show loading state while checking Firebase
  if (isCheckingLaunchStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-creative-purple border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/70">Loading Sikkim Creative Star...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className={`app-wrapper min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] relative ${showLaunchScreen ? 'overflow-hidden' : 'overflow-auto'}`}>
            <Toaster />
            <Sonner />
            
            {/* Main Website Content - Always rendered but controlled by visibility */}
            <div className={`main-content absolute inset-0 transition-all duration-1200 ease-out transform-gpu ${
              showLaunchScreen 
                ? 'opacity-0 scale-95 blur-lg pointer-events-none' 
                : 'opacity-100 scale-100 blur-0 pointer-events-auto'
            }`}>
              <BrowserRouter>
              <div 
                className="page-transition-wrapper h-full"
                style={{
                  opacity: isPageLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out"
                }}
              >
                <Routes>
                  <Route path="/" element={<Index onRegistrationClick={handleOpenRegistration} />} />
                  <Route path="/competitions" element={<CompetitionSelect />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route path="/voting" element={<VotingPage />} />
                  <Route path="/voting/admin" element={<AdminPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/sikkimcreativestar" element={<SikkimCreativeStar />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
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

          {/* Launch Screen - Overlays everything */}
          {showLaunchScreen && <LaunchScreen onLaunch={handleLaunch} />}
          
          {/* Transition overlay to ensure smooth handoff */}
          {isTransitioning && (
            <div className="fixed inset-0 bg-gradient-to-b from-black to-[#1a1a2e] z-40 opacity-50 transition-opacity duration-800" />
          )}
        </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
