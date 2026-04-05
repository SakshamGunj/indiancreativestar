import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowLeft, 
  Users,
  MessageSquare, 
  Sparkles,
  Trophy
} from "lucide-react";
import { Confetti } from "@/components/Confetti";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";
import { HeaderV2 } from "@/components/HeaderV2";
import LazyImage from "@/components/LazyImage";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp, setDoc, doc as firestoreDoc, getDoc } from "firebase/firestore";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const contestType = searchParams.get("type") || "art";
  const name = searchParams.get("name") || "Participant";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const txId = searchParams.get("txId") || searchParams.get("transactionId") || "";
  const orderId = searchParams.get("orderId") || searchParams.get("order_id") || "";
  const utmSource = searchParams.get("utm_source") || "";
  const utmCampaign = searchParams.get("utm_campaign") || "";
  const age = searchParams.get("age") || "";
  const whatsapp = searchParams.get("whatsapp") || "";
  const instagram = searchParams.get("instagram") || "";
  const category = searchParams.get("category") || "";
  const paymentStatus = searchParams.get("payment") || "";

  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Helper function to normalize phone number to Indian format (91XXXXXXXXXX)
  const normalizePhoneNumber = (phone: string): string => {
    if (!phone) return '';
    
    // Remove all spaces, dashes, parentheses, and trim
    let cleaned = phone.replace(/[\s\-\(\)]/g, '').trim();
    
    // Remove + prefix if exists
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    }
    
    // If 10 digits, add 91 prefix
    if (cleaned.length === 10 && /^\d{10}$/.test(cleaned)) {
      return `91${cleaned}`;
    }
    
    // If 12 digits starting with 91, return as is
    if (cleaned.length === 12 && cleaned.startsWith('91') && /^\d{12}$/.test(cleaned)) {
      return cleaned;
    }
    
    // Fallback: try to extract digits and add 91 if needed
    const digitsOnly = cleaned.replace(/\D/g, '');
    if (digitsOnly.length === 10) {
      return `91${digitsOnly}`;
    }
    
    return cleaned;
  };
  
  // 🎯 FACEBOOK PIXEL PURCHASE EVENT - Push to GTM dataLayer
  useEffect(() => {
    console.log('🎯 [GTM] Thank You page loaded - Preparing Purchase Event');
    
    // Get Facebook cookies for attribution
    const getFacebookCookie = (name: string) => {
      const match = document.cookie.match(new RegExp(`${name}=([^;]*)`));
      return match ? match[1] : '';
    };

    const fbp = getFacebookCookie('_fbp');
    const fbc = getFacebookCookie('_fbc');
    
    // Hydrate data from sessionStorage if available
    let fullData = {
      name,
      email,
      phone: phone || whatsapp,
      age,
      whatsapp,
      orderId: orderId || txId,
      amount: 249 // Registration fee
    };

    try {
      const cached = sessionStorage.getItem("ics_last_registration");
      if (cached) {
        const parsed = JSON.parse(cached);
        fullData.email = fullData.email || parsed.email || "";
        fullData.phone = fullData.phone || parsed.whatsapp || parsed.phone || "";
        fullData.whatsapp = fullData.whatsapp || parsed.whatsapp || "";
        fullData.name = fullData.name || parsed.fullName || parsed.name || "";
        fullData.age = fullData.age || parsed.age || "";
        fullData.orderId = fullData.orderId || parsed.orderId || "";
      }
    } catch (e) {
      console.warn('[GTM] Could not parse sessionStorage data:', e);
    }

    // Split name into first and last name & normalize to lowercase (Meta requirement)
    const nameParts = fullData.name.trim().split(' ');
    const firstName = (nameParts[0] || '').toLowerCase();
    const lastName = (nameParts.slice(1).join(' ') || '').toLowerCase();
    
    // Normalize phone number with country code +91 (India) - handles all formats
    const normalizedPhone = normalizePhoneNumber(fullData.phone);  // Use helper function
    
    // Normalize email to lowercase (Meta requirement)
    const normalizedEmail = fullData.email.trim().toLowerCase();

    // Generate unique event_id for deduplication
    const eventId = fullData.orderId || `EVENT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 📊 Prepare GTM Data Layer Object
    const purchaseData = {
      event: 'purchase_complete',                    // GTM trigger event
      event_id: eventId,                             // Unique order ID for deduplication
      transaction_id: fullData.orderId,              // Order/Transaction ID
      value: fullData.amount,                        // Payment amount
      currency: 'INR',                               // Indian Rupees
      content_ids: ['INDIAN_CREATIVE_STAR_ART_COMP_2025_ENTRY'],  // Fixed product ID
      content_type: 'competition_entry',             // Content type
      content_name: 'Indian Creative Star Art Competition Entry', // Product name
      content_category: contestType,                 // Category (art/kids)
      num_items: 1,                                  // Number of items purchased
      
      // Customer Information (Meta format - lowercase, normalized, will be auto-hashed by Pixel)
      email: normalizedEmail,                        // Meta: 'em' parameter
      phone_number: normalizedPhone,                 // Meta: 'ph' parameter (with country code)
      first_name: firstName,                         // Meta: 'fn' parameter (lowercase)
      last_name: lastName,                           // Meta: 'ln' parameter (lowercase)
      country: 'in',                                 // Meta: 'country' parameter (ISO code)
      
      // Legacy fields (for backwards compatibility)
      customer_email: normalizedEmail,
      customer_phone: normalizedPhone,
      customer_first_name: firstName,
      customer_last_name: lastName,
      
      // Facebook Attribution Cookies
      fbp: fbp || '',                                // Facebook browser ID
      fbc: fbc || '',                                // Facebook click ID
      
      // Additional tracking data
      client_user_agent: navigator.userAgent,
      page_title: document.title,
      page_location: window.location.href,
      
      // Campaign data
      utm_source: utmSource || '',
      utm_campaign: utmCampaign || '',
      
      // Custom event data
      payment_status: paymentStatus || 'success',
      registration_type: contestType,
      customer_age: fullData.age,
      
      // Timestamp
      event_timestamp: new Date().toISOString(),
      event_time: Math.floor(Date.now() / 1000),     // Unix timestamp for Meta
    };

    console.log('📤 [GTM] Pushing Purchase Event to dataLayer:', purchaseData);
    console.log('💰 [GTM] Purchase Details (Meta Pixel Format):', {
      'Event ID': eventId,
      'Transaction ID': fullData.orderId,
      'Amount': `₹${fullData.amount}`,
      'Customer': fullData.name,
      'First Name (lowercase)': firstName,
      'Last Name (lowercase)': lastName,
      'Email (lowercase)': normalizedEmail,
      'Phone (with +91)': normalizedPhone,
      'Country': 'in (India)',
      'Facebook FBP Cookie': fbp || 'Not found',
      'Facebook FBC Cookie': fbc || 'Not found',
      'Note': '✅ All PII will be AUTO-HASHED by Facebook Pixel'
    });

    // Push to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(purchaseData);
    
    console.log('✅ [GTM] Purchase event pushed successfully!');
    console.log('🔍 [GTM] Current dataLayer:', window.dataLayer);
    
  }, []); // Run once on mount
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Persist a lightweight registration record for analytics/ops
  useEffect(() => {
    const registrationId = searchParams.get("id") || "";
    // Fallback: hydrate from last registration in sessionStorage if params missing
    let hydrated = { age, whatsapp, email, instagram, category } as any;
    try {
      const cached = sessionStorage.getItem("ics_last_registration");
      if (cached) {
        const parsed = JSON.parse(cached);
        hydrated.age = hydrated.age || parsed.age || "";
        hydrated.whatsapp = hydrated.whatsapp || parsed.whatsapp || "";
        hydrated.email = hydrated.email || parsed.email || "";
        hydrated.instagram = hydrated.instagram || parsed.instagram || "";
        hydrated.category = hydrated.category || parsed.category || "";
      }
    } catch (_) {}
    const key = `ics_thankyou_saved_${registrationId || txId || name}`;
    const alreadySaved = sessionStorage.getItem(key);
    // Allow merge updates when we have a strong identifier (id)
    if (alreadySaved && !registrationId) return;

    const save = async () => {
      try {
        // If we have a participant id, hydrate from participants collection as authoritative
        try {
          if (registrationId) {
            const pSnap = await getDoc(firestoreDoc(db, "participants", registrationId));
            if (pSnap.exists()) {
              const p = pSnap.data() as any;
              hydrated.age = hydrated.age || String(p.age ?? "");
              hydrated.whatsapp = hydrated.whatsapp || p.whatsapp || "";
              hydrated.email = hydrated.email || p.email || "";
              hydrated.instagram = hydrated.instagram || p.instagram || "";
              hydrated.category = hydrated.category || p.category || "";
            }
          }
        } catch (e) {
          console.warn("[ThankYou] participants hydration failed", e);
        }

        const ageNum = hydrated.age ? Number(hydrated.age) : NaN;
        let derivedCategory: string | null = category || null;
        if (!derivedCategory && !isNaN(ageNum)) {
          if (ageNum >= 5 && ageNum <= 8) derivedCategory = "Group A (5-8 years)";
          else if (ageNum >= 9 && ageNum <= 12) derivedCategory = "Group B (9-12 years)";
          else if (ageNum >= 13 && ageNum <= 17) derivedCategory = "Group C (13-17 years)";
          else derivedCategory = "Adult";
        }

        const payload: any = {
          name,
          email: hydrated.email || email || "",
          phone: phone || hydrated.whatsapp || whatsapp || "",
          age: !isNaN(ageNum) ? ageNum : null,
          whatsapp: hydrated.whatsapp || whatsapp || "",
          instagram: hydrated.instagram || instagram || "",
          category: derivedCategory,
          contestType,
          txId: txId || null,
          utm: {
            source: utmSource || null,
            campaign: utmCampaign || null,
          },
          page: "thank_you",
          createdAt: serverTimestamp(),
        };

        if (registrationId) {
          await setDoc(firestoreDoc(db, "indiancreativestar", registrationId), payload, { merge: true });
        } else {
          await addDoc(collection(db, "indiancreativestar"), payload);
        }
        sessionStorage.setItem(key, "1");
      } catch (e) {
        // Non-blocking: only log to console
        console.error("[ThankYou] Failed to save registration record:", e);
      }
    };

    save();
    // run once per arrival with this key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleBackHome = () => {
    const from = searchParams.get("from") || "/indiancreativestar/v2";
    navigate(from);
  };
  
  
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0b0b14] to-black">
      <HeaderV2 variant="gradient" showJoinButton={false} basePath="/indiancreativestar/v2" />
      {showConfetti && <Confetti />}
      
      {/* Spacer to avoid header overlap */}
      <div className="h-16" />

      {/* Hero Ribbon (celebratory, dark) */}
      <div className="px-3 sm:px-6 mt-2">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
            <div className="flex items-start sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-white/80 mb-1 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-creative-yellow" /> Registration Confirmed
                </p>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white via-creative-yellow to-white bg-clip-text text-transparent truncate drop-shadow">
                  Welcome, {name}! You’re officially in the {contestType === "art" ? "Art" : "Poetry"} competition
                </h1>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-white/80">
                <Trophy className="h-5 w-5 text-creative-purple" />
                <span className="text-sm">Indian Creative Star</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-start sm:items-center justify-center p-3 sm:p-6">
        <div className="max-w-4xl w-full mx-auto">
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <Button 
              variant="ghost" 
              className="hover:bg-white/10 text-sm sm:text-base text-white"
              onClick={handleBackHome}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
            <div className="sm:hidden" />
          </div>
          
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-8 md:p-12 text-center shadow-[0_0_40px_rgba(255,255,255,0.08)]">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-green-500/15 border border-green-400/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow">
              You're In, {name}!
            </h2>
            
            <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg text-green-400 font-bold mb-2">
                ✅ Payment Completed & Entry Confirmed!
              </p>
              <p className="text-sm sm:text-base text-white/80">
                Your payment has been successfully processed and your entry in the {contestType === "art" ? "Art" : "Poetry"} competition is now confirmed.
              </p>
            </div>
            
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">
              You will receive the submission portal link or form on the official WhatsApp group to submit your artwork. Join the group below!
            </p>
            
            {/* WhatsApp CTA */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-extrabold mb-3 sm:mb-4 flex items-center justify-center gap-2 text-white">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-creative-yellow" />
                Join Our Official WhatsApp Group
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mb-4">
                <span className="block font-bold text-white text-base mb-2">📝 Important: Get Your Submission Form Here!</span>
                You will receive the artwork submission portal link/form in this official WhatsApp group. Join now to get all important updates, submission instructions, and connect with fellow participants.
              </p>
              <Button 
                className="w-full bg-[#25D366] hover:bg-[#20bd59] text-black font-bold py-3 sm:py-4 text-base"
                onClick={() => window.open("https://chat.whatsapp.com/HeaoLbpKBI9DxAMcCjUorI", "_blank")}
              >
                <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Join WhatsApp Group Now
              </Button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-8 sm:py-12 pb-20 sm:pb-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="text-center">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-2 sm:ring-4 ring-white/20">
                <LazyImage
                  src="/company-logo.webp"
                  alt="Daami Event Logo"
                  className="w-full h-full"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Daami Event
                </h3>
                <p className="text-purple-300 text-xs sm:text-sm font-medium">Event Management Company</p>
              </div>
            </div>
            
            {/* Tagline */}
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-lg text-white/90 font-medium mb-2">
                Empowering Artists Nationwide
              </p>
              <p className="text-white/70 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-4">
                Through creative competitions, recognition, and building a community of talented artists across India.
              </p>
            </div>
            
            {/* Divider */}
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-4 sm:mb-6"></div>
            
            {/* Copyright */}
            <div className="space-y-1 sm:space-y-2">
              <p className="text-white/80 font-medium text-sm sm:text-base">
                © 2025 Daami Event. All Rights Reserved.
              </p>
              <p className="text-white/50 text-xs">
                Proudly organizing India's premier art competitions since 2024
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
