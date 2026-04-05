import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import CompetitionSelect from "./pages/CompetitionSelect";
import ThankYou from "./pages/ThankYou";

import CashfreeTest from "./pages/CashfreeTest";
import PaymentSuccess from "./pages/PaymentSuccess";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundAndCancellation from "./pages/RefundAndCancellation";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CertificateValidation from "./pages/CertificateValidation";
import WeatherDemo from "./pages/WeatherDemo";

// Artist Portfolio
import { PortfolioPublicLayout, PortfolioAdminLayout } from "./portfolio/PortfolioLayout";
import { PublicPortfolio } from "./portfolio/pages/PublicPortfolio";
import { WorkDetails } from "./portfolio/pages/WorkDetails";
import { AdminDashboard } from "./portfolio/pages/AdminDashboard";
import { AdminWorks } from "./portfolio/pages/AdminWorks";
import { AdminProfile } from "./portfolio/pages/AdminProfile";

import { BrandingProvider } from "./lib/branding";
import { LaunchScreen } from "./components/LaunchScreen";
import { checkLaunchScreenStatus, disableLaunchScreenGlobally } from "./lib/firebase";
import { useEffect, useState, lazy, Suspense } from "react";
import { RegistrationFlowModal } from "./components/RegistrationFlowModal";

// Blog Pages
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const WinterArtRoyaleWrapped = lazy(() => import("./pages/WinterArtRoyaleWrapped"));
const WarHallOfFame = lazy(() => import("./pages/WarHallOfFame"));
const HallOfFame = lazy(() => import("./pages/HallOfFame"));
const EventHallOfFame = lazy(() => import("./pages/EventHallOfFame"));
const RangKalaAward = lazy(() => import("./pages/RangKalaAward"));
const RangKalaAwardRegister = lazy(() => import("./pages/RangKalaAwardRegister"));

const queryClient = new QueryClient();

const App = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showLaunchScreen, setShowLaunchScreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCheckingLaunchStatus, setIsCheckingLaunchStatus] = useState(true);

  // Navigation Loading State
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [appLoading, setAppLoading] = useState(true);

  // Trigger loader on route change
  useEffect(() => {
    // Skip loader for registration pages
    const excludedPaths = ['/hall-of-fame', '/winterartroyale/halloffame', '/winterartroyale/wrapped'];
    if (excludedPaths.includes(location.pathname) || location.pathname.startsWith('/hall-of-fame')) {
      setAppLoading(false);
      return;
    }

    setAppLoading(true);
    setProgress(0);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setAppLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15; // Slightly faster for page transitions
      });
    }, 50); // Faster Interval

    return () => clearInterval(timer);
  }, [location.pathname]);

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

  // Show loading state
  const excludedPaths = ['/hall-of-fame', '/winterartroyale/halloffame', '/winterartroyale/wrapped'];
  if ((isCheckingLaunchStatus || appLoading) && (!excludedPaths.includes(location.pathname) && !location.pathname.startsWith('/hall-of-fame'))) {
    // Default Dark Loader
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-50"></div>

        <div className="text-center z-10 space-y-6 max-w-md w-full px-6">
          {/* Logo or Brand Name */}
          <div className="mb-8">
            <h1 className="font-bilderberg text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#FFD700] animate-pulse tracking-widest drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              DAAMI EVENT
            </h1>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-white transition-all duration-300 ease-out shadow-[0_0_20px_rgba(34,211,238,0.8)]"
              style={{ width: `${progress}% ` }}
            ></div>
          </div>

          {/* Loading Text */}
          <div className="flex justify-between items-center text-xs text-[#FFD700]/80 font-bilderberg tracking-wider uppercase">
            <span>Loading Daami Event Site...</span>
            <span className="font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={`app - wrapper min - h - screen bg - gradient - to - b from - black to - [#1a1a2e] relative `}>
          <Toaster />
          <Sonner />

          {/* Main Website Content - Always rendered but controlled by visibility */}
          <div className={`main - content transition - all duration - 1200 ease - out transform - gpu ${showLaunchScreen
            ? 'opacity-0 scale-95 blur-lg pointer-events-none'
            : 'opacity-100 scale-100 blur-0 pointer-events-auto'
            } `}>
            <BrandingProvider>
              <div
                className="page-transition-wrapper h-full"
                style={{
                  opacity: isPageLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out"
                }}
              >
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/competitions" element={<CompetitionSelect />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  
                  <Route path="/winterartroyale/wrapped" element={
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                      <WinterArtRoyaleWrapped />
                    </Suspense>
                  } />
                  
                  <Route path="/winterartroyale/halloffame" element={
                    <Suspense fallback={<div className="min-h-screen bg-white" />}>
                      <WarHallOfFame />
                    </Suspense>
                  } />

                  <Route path="/hall-of-fame" element={
                    <Suspense fallback={<div className="min-h-screen bg-[#050510]" />}>
                      <HallOfFame />
                    </Suspense>
                  } />

                  <Route path="/hall-of-fame/:eventId" element={
                    <Suspense fallback={<div className="min-h-screen bg-[#050510]" />}>
                      <EventHallOfFame />
                    </Suspense>
                  } />

                  <Route path="/rangkala-award" element={
                    <Suspense fallback={<div className="min-h-screen bg-black" />}>
                      <RangKalaAward />
                    </Suspense>
                  } />
                  <Route path="/rangkala-award/register" element={
                    <Suspense fallback={<div className="min-h-screen bg-white" />}>
                      <RangKalaAwardRegister />
                    </Suspense>
                  } />

                  <Route path="/cashfree-test" element={<CashfreeTest />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="/refund-and-cancellation" element={<RefundAndCancellation />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/certificate/validation" element={<CertificateValidation />} />
                  <Route path="/weather-demo" element={<WeatherDemo />} />

                  {/* Artist Portfolio Sub-App */}
                  <Route path="/artist-portfolio" element={<PortfolioPublicLayout />}>
                    <Route index element={<PublicPortfolio />} />
                    <Route path="work/:id" element={<WorkDetails />} />
                  </Route>
                  <Route path="/admin" element={<PortfolioAdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="works" element={<AdminWorks />} />
                    <Route path="profile" element={<AdminProfile />} />
                  </Route>

                  {/* Blog Section */}
                  <Route path="/blog" element={
                    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
                      <Blog />
                    </Suspense>
                  } />
                  <Route path="/blog/:slug" element={
                    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
                      <BlogPost />
                    </Suspense>
                  } />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>

              <RegistrationFlowModal
                isOpen={showRegistrationModal}
                onClose={() => setShowRegistrationModal(false)}
              />
            </BrandingProvider>
          </div>

          {/* Launch Screen - Overlays everything */}
          {showLaunchScreen && !(['/hall-of-fame', '/winterartroyale/halloffame', '/winterartroyale/wrapped'].includes(location.pathname) || location.pathname.startsWith('/hall-of-fame')) && <LaunchScreen onLaunch={handleLaunch} />}

          {/* Transition overlay to ensure smooth handoff */}
          {isTransitioning && (
            <div className="fixed inset-0 bg-gradient-to-b from-black to-[#1a1a2e] z-40 opacity-50 transition-opacity duration-800" />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
