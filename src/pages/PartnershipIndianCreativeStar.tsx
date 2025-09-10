
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Trophy, Crown, Heart, Target, Zap, Globe, Gift, Award, CheckCircle, Sparkles, Play, Camera, Palette, TrendingUp, MessageCircle, Instagram, Badge } from "lucide-react";

const PartnershipIndianCreativeStar = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleJoinPartnership = () => {
    // You can add contact form or direct to WhatsApp/Email
    window.open("https://wa.me/919635908358?text=Hi!%20I'm%20interested%20in%20the%20Indian%20Creative%20Star%20Partnership%20Program", "_blank");
  };

  const partnershipData = [
    {
      title: "Exclusive Access",
      icon: Crown,
      color: "purple",
      benefits: [
        "Early access to competition updates",
        "Private partner WhatsApp group",
        "Exclusive content and behind-the-scenes",
        "Direct line to event organizers",
      ],
    },
    {
      title: "Content Support",
      icon: Zap,
      color: "orange",
      benefits: [
        "Ready-to-post content templates",
        "High-quality graphics and videos",
        "Personalized promotional materials",
        "Content strategy consultation",
      ],
    },
    {
      title: "Network Benefits",
      icon: Users,
      color: "indigo",
      benefits: [
        "Connect with 1000+ verified artists",
        "Access to exclusive artist collaborations",
        "Networking events and meetups",
        "Future partnership opportunities",
      ],
    },
    {
      title: "Performance Rewards",
      icon: Award,
      color: "pink",
      benefits: [
        "Top performer recognition awards",
        "Exclusive merchandise and gifts",
        "Performance-based bonus structures",
        "Long-term partnership extensions",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-system-ui antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Apple-style Clean Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-purple-50/20"></div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-32 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-2xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
              <img
                src="/company-logo.jpeg"
                alt="Daami Event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-medium text-gray-900">Daami Event</h1>
              <p className="text-sm text-gray-500">Partnership Program</p>
            </div>
          </div>
          <Button
            onClick={handleBackToHome}
            variant="outline"
            className="bg-white/50 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Hero Section */}
          <section className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 bg-blue-50/70 rounded-full px-6 py-3 border border-blue-100">
              <Crown className="w-5 h-5 text-blue-600" />
              <span className="text-gray-800 font-medium text-base tracking-wide">Partnership Program</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight leading-none tracking-tight">
                <span className="block text-gray-900 mb-4" style={{ fontWeight: '100' }}>Partner with</span>
                <span className="block text-gray-900" style={{ fontWeight: '300' }}>
                  Indian Creative Star
                </span>
              </h1>
              
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-8" style={{ fontWeight: '300' }}>
                Join India's most prestigious art competition and unlock exclusive partnership benefits
              </p>

              {/* Hero Banner */}
              <div className="mt-12 relative">
                <div className="relative max-w-5xl mx-auto">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src="/Daami Presents (1920 x 1080 px).jpg"
                      alt="Daami Event presents Indian Creative Star"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              
            </div>
          </section>

          {/* About / Our Story */}
          <section className="relative z-10">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white/70 backdrop-blur rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                  <Heart className="w-4 h-4 text-pink-600" />
                  <span className="text-sm text-gray-800 font-medium">Our Story</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extralight text-gray-900" style={{ fontWeight: '200' }}>
                  Discover what makes us special
                </h2>
                <p className="text-gray-700 text-base leading-relaxed" style={{ fontWeight: '300' }}>
                  We are Daami Event, an emerging event firm, and proud organizers of <span className="font-medium text-gray-900">Indian Creative Star (Art Competition) – Season 2</span>.
                </p>
                <p className="text-gray-700 text-base leading-relaxed" style={{ fontWeight: '300' }}>
                  Our journey began with <span className="font-medium text-gray-900">Sikkim Creative Star (Art Competition) – Season 1</span>, where <span className="font-medium">300+ artists</span> registered and we discovered <span className="font-medium">6 Creative Stars</span>.
                </p>
                <p className="text-gray-700 text-base leading-relaxed" style={{ fontWeight: '300' }}>
                  We are officially supported by the <span className="font-medium text-gray-900">Culture Department, Government of Sikkim</span>, which adds credibility and trust to our events. Our mission is simple: <span className="font-medium">discover and celebrate Creative Stars across India</span>.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <img src="/WhatsApp Image 2025-09-09 at 11.03.00.jpeg" alt="Daami Event team" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl border border-gray-100 shadow-md px-4 py-3 flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-800">Celebrating creators nationwide</span>
                </div>
              </div>
            </div>
          </section>

          {/* Government Support */}
          <section className="space-y-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 border border-green-100">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-800 font-medium">Officially Supported by</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <img src="/images.jpeg" alt="Government of Sikkim Logo" className="h-16 w-auto flex-shrink-0" />
                <div className="text-left">
                  <div className="text-gray-900 font-medium">Culture Department</div>
                  <div className="text-gray-600 text-sm">Government of Sikkim</div>
                </div>
              </div>
            </div>
          </section>

          {/* Community Appeal Card */}
          <section>
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/70 via-white to-amber-50/60" />
                <div className="relative p-8 sm:p-12">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-pink-600 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">A Message from Daami Event</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-gray-900 font-extralight mb-3" style={{ fontWeight: '200' }}>
                    We need amazing creators to build something beautiful for artists
                  </h2>
                  <p className="text-gray-700 text-lg font-light mb-4">
                    Together, let’s champion talent across India. Your voice can help us reach artists who deserve the spotlight.
                  </p>
                  <p className="text-gray-700 font-light">
                    This is a true win‑win: empower artists, grow your influence, and earn fairly as our partner.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Partner Offer Card */}
          <section>
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/50" />
                <div className="relative p-8 sm:p-12">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Official Partner Offer</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl text-gray-900 font-extralight mb-3" style={{ fontWeight: '200' }}>
                    Earn <span className="font-semibold">25% on every entry fee</span>
                  </h2>
                  <p className="text-gray-700 text-lg font-light mb-8">
                    Become an Indian Creative Star partner and get paid for empowering artists. We give you premium visibility and perks designed for growth.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3 bg-white/70 border border-gray-100 rounded-2xl p-4">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="text-gray-900 font-medium">25% commission per successful entry</div>
                        <div className="text-gray-600 text-sm">Simple tracking with your unique link and on-time payouts</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/70 border border-gray-100 rounded-2xl p-4">
                      <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="text-gray-900 font-medium">Feature in our Magazine</div>
                        <div className="text-gray-600 text-sm">Top partners showcased in Indian Creative Star magazine</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/70 border border-gray-100 rounded-2xl p-4">
                      <Gift className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-gray-900 font-medium">Workshops & Spotlight</div>
                        <div className="text-gray-600 text-sm">Lead workshops and get spotlighted as a Creative Star Influencer</div>
                      </div>
                        </div>
                    <div className="flex items-start gap-3 bg-white/70 border border-gray-100 rounded-2xl p-4">
                      <Badge className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <div className="text-gray-900 font-medium">Official Partner Name Association</div>
                        <div className="text-gray-600 text-sm">Your name/logo associated across campaigns and select collaterals</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Button onClick={handleJoinPartnership} className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-3">
                      Start Earning 25% Today
                    </Button>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex -space-x-2">
                        <img src="/1.jpg" alt="creator" className="w-6 h-6 rounded-full border border-white" />
                        <img src="/logo.jpeg" alt="creator" className="w-6 h-6 rounded-full border border-white" />
                        <img src="/tenversemedia.jpeg" alt="creator" className="w-6 h-6 rounded-full border border-white" />
                      </div>
                      <span>Trusted by growing creator communities</span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Partnership Benefits Grid */}
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-extralight text-gray-900 mb-8" style={{ fontWeight: '200' }}>
                Partnership Benefits
              </h2>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto" style={{ fontWeight: '300' }}>
                Exclusive access to India's largest art community with premium benefits designed for creators
              </p>
            </div>

            {/* Visual after Partnership Benefits heading */}
            <div className="max-w-5xl mx-auto">
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Art community audience"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Monetary Benefits */}
              <div className="group relative">
                <div className="relative bg-white rounded-3xl p-10 border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-500 shadow-sm">
                  {/* Background Image */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-2xl"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl text-gray-900 mb-8 text-center" style={{ fontWeight: '400' }}>Monetary Benefits</h3>
                    
                    {/* Earnings Highlight */}
                    <div className="bg-green-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600" style={{ fontWeight: '300' }}>Earnings Potential</span>
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="text-4xl sm:text-5xl font-light text-green-700 mb-2">₹5,00,000+</div>
                      <div className="text-sm text-gray-700 mb-3" style={{ fontWeight: '400' }}>per year</div>
                      <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1 border border-green-100">
                        <span className="text-xs text-gray-700">Typically</span>
                        <span className="text-sm font-medium text-green-700">₹20,000+ per event</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-base" style={{ fontWeight: '300' }}>
                          <span className="font-medium text-gray-900">25% commission</span> on the entry fee for every registration through your link
                        </span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-base" style={{ fontWeight: '300' }}>Bonus payments for performance milestones</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-base" style={{ fontWeight: '300' }}>Exclusive partnership fee for content creation</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-base" style={{ fontWeight: '300' }}>Revenue sharing from sponsored content</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Brand Recognition */}
              <div className="group relative">
                <div className="relative bg-white rounded-3xl p-10 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 shadow-sm">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl text-gray-900 mb-8 text-center" style={{ fontWeight: '400' }}>Brand Recognition</h3>
                    
                    {/* Partnership Badge Preview */}
                    <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-center">
                      <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-blue-100 mb-3">
                        <Crown className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-800" style={{ fontWeight: '500' }}>Official Partner</span>
                      </div>
                      <div className="text-sm text-gray-600" style={{ fontWeight: '300' }}>Your exclusive partner badge</div>
                    </div>
                    
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-base" style={{ fontWeight: '300' }}>Official Partner badge and certification</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-base" style={{ fontWeight: '300' }}>Featured prominently on our platform</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-base" style={{ fontWeight: '300' }}>Cross-promotion across all our channels</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-base" style={{ fontWeight: '300' }}>Co-branded marketing materials</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {partnershipData.map((data, index) => (
                <Partnership key={index} data={data} />
              ))}
            </div>
          </section>

          {/* Partner With Us - Influencer Focus */}
          <section className="space-y-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2" style={{ fontWeight: '500' }}>Influencer Partnership</h3>
                <p className="text-gray-700 font-light">Earn 25% on every paid entry you refer. Simple, transparent, timely payouts.</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2" style={{ fontWeight: '500' }}>Magazine Feature</h3>
                <p className="text-gray-700 font-light">Top partners are featured in our Indian Creative Star magazine and digital channels.</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2" style={{ fontWeight: '500' }}>Workshops & Spotlight</h3>
                <p className="text-gray-700 font-light">Host workshops with us and get spotlighted as a Creative Star Influencer.</p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl font-extralight text-gray-900 mb-4" style={{ fontWeight: '200' }}>
                How It Works
              </h2>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto" style={{ fontWeight: '300' }}>
                Apply now and contact us on WhatsApp — we’d love to connect and walk you through the process.
              </p>
            </div>
            <div className="max-w-xl mx-auto text-center bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
                    </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Apply Now</h3>
              <p className="text-gray-600 font-light mb-6">
                Contact us on WhatsApp and we’ll discuss the process with you step‑by‑step.
              </p>
              <Button onClick={handleJoinPartnership} className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-6 py-3">
                Chat on WhatsApp
              </Button>
            </div>
          </section>

          {/* Testimonials Section removed as requested */}

          {/* FAQ Section removed as requested */}

          {/* Partnership Stats removed as requested */}

          {/* CTA Section */}
          <section className="text-center space-y-8 py-16">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                Ready to Partner?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
                Join India's most prestigious art competition and unlock exclusive benefits
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleJoinPartnership}
                className="group bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-2xl text-base transition-all duration-200 shadow-lg hover:shadow-xl border-0"
              >
                <span className="flex items-center gap-2">
                  Become a Partner
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
              
              <p className="text-gray-500 text-sm font-light">
                Contact us on WhatsApp to discuss details
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Removed duplicate Unsplash visual (moved near hero) */}

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-xl overflow-hidden shadow-sm">
              <img
                src="/company-logo.jpeg"
                alt="Daami Event"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-900 font-medium text-base">Daami Event Partnership</span>
          </div>
          <p className="text-gray-500 text-sm font-light">© 2025 Daami Event. Empowering creators nationwide.</p>
        </div>
      </footer>
    </div>
  );
};

export default PartnershipIndianCreativeStar;

// New Partnership Component
const Partnership = ({ data }) => {
  const { title, icon: Icon, benefits, color } = data;
  return (
    <div className="group relative">
      <div className={`relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-${color}-200 hover:shadow-lg transition-all duration-300 shadow-sm`}>
        <div className={`w-14 h-14 bg-${color}-500 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">{title}</h3>
        <ul className="space-y-4 text-gray-700">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className={`h-5 w-5 text-${color}-500 mt-0.5 flex-shrink-0`} />
              <span className="text-sm font-light">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
