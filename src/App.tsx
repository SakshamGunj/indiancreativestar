
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
import VotingPage from "./VotingPage";
import AdminPage from "./pages/voting/admin";
import { GalleryPage } from "./pages/GalleryPage"; // Import the new GalleryPage component
import SikkimCreativeStar from "./pages/SikkimCreativeStar";
import IndexV2 from "./pages/v2/IndexV2";
import IndexV3 from "./pages/v3/IndexV3";
// V2 Pages are now Lazy Loaded locally
import WinterArtRoyale from "./pages/WinterArtRoyale";
import WinterAdmin from "./pages/WinterAdmin";
import WarThankYou from "./pages/WarThankYou";
import AdminExport from "./pages/AdminExport";
import AdminCertificates from "./pages/AdminCertificates";
import PartnershipIndianCreativeStar from "./pages/PartnershipIndianCreativeStar";
import AdminVerify from "./pages/AdminVerify";
import ArtworkSubmission from "./pages/ArtworkSubmission";
import Dashboard from "./pages/Dashboard";
import AdminConfirmation from "./pages/AdminConfirmation";
import CashfreeTest from "./pages/CashfreeTest";
import PaymentSuccess from "./pages/PaymentSuccess";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundAndCancellation from "./pages/RefundAndCancellation";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ArtworkMarketplace from "./pages/ArtworkMarketplace";
import SimpleSubmission from "./pages/SimpleSubmission";
import CertificateValidation from "./pages/CertificateValidation";
import GuruArtProgram from "./pages/GuruArtProgram";
import StudentSubmissionPortal from "./pages/StudentSubmissionPortal";
import WeatherDemo from "./pages/WeatherDemo";
import JudgingPortal from "./pages/JudgingPortal";
import WarRegistrationPage from "./pages/WarRegistrationPage";

import GuruStudentForm from "./pages/guru/GuruStudentForm";
import GuruLogin from "./pages/guru/GuruLogin";
import GuruDashboard from "./pages/guru/GuruDashboard";

import { BrandingProvider } from "./lib/branding";
import { LaunchScreen } from "./components/LaunchScreen";
import { checkLaunchScreenStatus, disableLaunchScreenGlobally } from "./lib/firebase";
import { useEffect, useState, lazy, Suspense } from "react";
import { RegistrationFlowModal } from "./components/RegistrationFlowModal";

const WinterArtRoyaleV2 = lazy(() => import("./pages/WinterArtRoyaleV2")); // V2 Page Lazy
const WarRegistrationPageV2 = lazy(() => import("./pages/WarRegistrationPageV2")); // V2 Registration Lazy
const WarThankYouV2 = lazy(() => import("./pages/WarThankYouV2")); // V2 Thank You Lazy
const WarSubmission = lazy(() => import("./pages/WarSubmission")); // New Premium Submission Flow

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
    const excludedPaths = ['/winter-art-royale/register', '/winterartroyale/v2/register', '/winterartroyale/v2/thank-you'];
    if (excludedPaths.includes(location.pathname)) {
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
  const excludedPaths = ['/winter-art-royale/register', '/winterartroyale/v2/register', '/winterartroyale/v2/thank-you', '/winterartroyale/submission'];
  if ((isCheckingLaunchStatus || appLoading) && !excludedPaths.includes(location.pathname)) {
    const isV2 = location.pathname.startsWith('/winterartroyale/v2');

    if (isV2) {
      // White Theme Loader for V2
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
          <div className="text-center z-10 space-y-6 max-w-md w-full px-6">
            <div className="mb-8 relative flex justify-center">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
              <h1 className="relative font-heading text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                DAAMI EVENT
              </h1>
            </div>

            {/* Simple Progress Bar (Blue) */}
            <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden relative">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 font-bold tracking-widest uppercase">
              <span>Loading...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      );
    }

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
        <div className={`app - wrapper min - h - screen bg - gradient - to - b from - black to - [#1a1a2e] relative ${showLaunchScreen ? '' : 'overflow-auto'} `}>
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
                  <Route path="/Indiancreativestar" element={<Index />} />
                  <Route path="/competitions" element={<CompetitionSelect />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route path="/voting" element={<VotingPage />} />
                  <Route path="/voting/admin" element={<AdminPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/sikkimcreativestar" element={<SikkimCreativeStar />} />
                  <Route path="/indiancreativestar/v2" element={<IndexV2 />} />
                  <Route path="/indiancreativestar/v3" element={<IndexV3 />} />
                  <Route path="/winter-art-royale" element={<WinterArtRoyale />} />
                  <Route path="/winter-art-royale/thank-you" element={<WarThankYou />} />
                  <Route path="/winterartroyale/v2" element={
                    <Suspense fallback={<div className="min-h-screen bg-white" />}>
                      <WinterArtRoyaleV2 />
                    </Suspense>
                  } />
                  <Route path="/winterartroyale/v2/register" element={
                    <Suspense fallback={<div className="min-h-screen bg-white" />}>
                      <WarRegistrationPageV2 />
                    </Suspense>
                  } />
                  <Route path="/winterartroyale/v2/thank-you" element={
                    <Suspense fallback={<div className="min-h-screen bg-white" />}>
                      <WarThankYouV2 />
                    </Suspense>
                  } />

                  {/* NEW Premium Submission Page */}
                  <Route path="/winterartroyale/submission" element={
                    <Suspense fallback={<div className="min-h-screen bg-white" />}>
                      <WarSubmission />
                    </Suspense>
                  } />

                  <Route path="/winterartroyale/event/elte/admin" element={<WinterAdmin />} />

                  <Route path="/winter-art-royale/register" element={<WarRegistrationPage />} />
                  <Route path="/partnership-indiancreativestar" element={<PartnershipIndianCreativeStar />} />
                  <Route path="/admin/export" element={<AdminExport />} />
                  <Route path="/admin/certificates" element={<AdminCertificates />} />
                  <Route path="/admin/verify" element={<AdminVerify />} />
                  <Route path="/indiancreativestar/submission" element={<Dashboard />} />
                  <Route path="/indiancreativestar/dashboard" element={<Dashboard />} />
                  <Route path="/indiancreativestar/submitartwork" element={<SimpleSubmission />} />
                  <Route path="/cashfree-test" element={<CashfreeTest />} />
                  <Route path="/indiancreativestar/admin/confirmation" element={<AdminConfirmation />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="/refund-and-cancellation" element={<RefundAndCancellation />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/marketplace" element={<ArtworkMarketplace />} />
                  <Route path="/art-shop" element={<ArtworkMarketplace />} />
                  <Route path="/certificate/validation" element={<CertificateValidation />} />
                  <Route path="/weather-demo" element={<WeatherDemo />} />
                  <Route path="/guru/portal" element={<GuruArtProgram />} />
                  <Route path="/judging-portal" element={<JudgingPortal />} />
                  <Route path="/student/:academySlug/:studentSlug" element={<StudentSubmissionPortal />} />

                  <Route path="/student/:academySlug/:studentSlug" element={<StudentSubmissionPortal />} />

                  {/* Guru / Writer Platform */}
                  <Route path="/guru/login" element={<GuruLogin />} />
                  <Route path="/guru/dashboard" element={<GuruDashboard />} />
                  <Route path="/guru/onboard" element={<GuruStudentForm />} />

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
          {showLaunchScreen && !['/winter-art-royale/register', '/winterartroyale/v2/register', '/winterartroyale/v2/thank-you', '/winterartroyale/submission'].includes(location.pathname) && <LaunchScreen onLaunch={handleLaunch} />}

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
