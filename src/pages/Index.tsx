import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Trophy, Star, Crown, Sparkles, Award, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleJoinCompetition = () => {
    navigate("/indiancreativestar/v2");
  };

  return (
    <div className="min-h-screen overflow-hidden relative font-inter">
      {/* Premium Background with Continuous Animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-black"></div>
      </div>

      {/* Continuous Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs with continuous animation */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/6 to-cyan-500/6 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/4 to-red-500/4 rounded-full blur-3xl animate-spin-very-slow"></div>
        
        {/* Moving gradient waves */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/3 to-transparent animate-wave-horizontal"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/2 to-transparent animate-wave-vertical"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/20 rounded-full animate-float-particle delay-0"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-float-particle delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-blue-400/20 rounded-full animate-float-particle delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-pink-400/30 rounded-full animate-float-particle delay-3000"></div>
        <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-orange-400/25 rounded-full animate-float-particle delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/10 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden ring-1 ring-white/10">
              <img
                src="/company-logo.jpeg"
                alt="Daami Event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-white tracking-tight">Daami Event</h1>
              <p className="text-xs text-white/50">Event Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-medium text-sm tracking-wide">LIVE EVENT</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12">
          
          {/* YouTube-style Banner */}
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src="/Daami Presents (1920 x 1080 px).jpg"
                alt="Daami Presents Banner"
                className="w-full h-48 sm:h-56 lg:h-80 xl:h-96 object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
            </div>
          </div>

          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl rounded-full px-6 py-3 border border-white/10 shadow-2xl animate-glow">
            <Crown className="w-5 h-5 text-orange-300" />
            <span className="text-white font-medium text-sm sm:text-base tracking-wide">ONGOING PREMIUM EVENT</span>
            <Sparkles className="w-5 h-5 text-pink-300" />
          </div>

          {/* CTA Button - PROMINENT PLACEMENT */}
          <div className="space-y-4">
            <Button
              onClick={handleJoinCompetition}
              className="group bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-4 px-8 sm:py-6 sm:px-12 rounded-2xl text-base sm:text-lg lg:text-xl transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-orange-500/30 border border-white/10"
            >
              <span className="flex items-center gap-3">
                <Crown className="h-5 w-5 sm:h-6 sm:w-6" />
                JOIN COMPETITION NOW
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>

          {/* Hero Title */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="block text-white/95 mb-1 sm:mb-2">Indian Creative Star</span>
              <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent font-black animate-gradient">
                ART COMPETITION
              </span>
              <span className="block text-xl sm:text-3xl lg:text-5xl bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent font-semibold mt-2 sm:mt-4">
                Season 2
              </span>
            </h3>
            
            <p className="text-base sm:text-xl lg:text-2xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
              India's Most Prestigious Art Competition is <span className="text-yellow-300 font-semibold animate-pulse">Live!</span>
            </p>
            
            <p className="text-sm sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              Join thousands of artists nationwide in this groundbreaking art movement.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {[
              { icon: Trophy, value: "₹50,000", label: "PRIZE POOL", gradient: "from-orange-500 to-red-500" },
              { icon: Users, value: "1000+", label: "ARTISTS", gradient: "from-blue-500 to-purple-500" },
              { icon: Calendar, value: "LIVE", label: "REGISTRATION", gradient: "from-green-500 to-emerald-500" },
              { icon: Award, value: "GOVT", label: "CERTIFICATE", gradient: "from-yellow-500 to-orange-500" },
              { icon: Clock, value: "500", label: "SLOTS LEFT", gradient: "from-red-500 to-pink-500" },
              { icon: Star, value: "NATIONAL", label: "RECOGNITION", gradient: "from-purple-500 to-indigo-500" }
            ].map((stat, index) => (
              <div key={index} className="group relative animate-float-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-3 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-xl`}>
                    <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="text-sm sm:text-xl lg:text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-xs font-medium tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>


      {/* Features Strip */}
      <div className="relative z-10 py-8 px-4 sm:px-6 bg-black/30 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-white/60">
            {["Open Theme", "All Age Groups", "Digital Certificates", "Expert Jury"].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm font-medium">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{animationDelay: `${index * 500}ms`}}></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-4 sm:px-6 bg-black/40 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg overflow-hidden">
              <img
                src="/company-logo.jpeg"
                alt="Daami Event"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-medium text-sm">Daami Event</span>
          </div>
          <p className="text-white/40 text-xs">© 2025 Daami Event. Empowering Artists Nationwide.</p>
        </div>
      </footer>

      {/* Advanced CSS Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes spin-very-slow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes wave-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes wave-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
          50% { transform: translateY(-40px) translateX(-5px); opacity: 1; }
          75% { transform: translateY(-20px) translateX(-10px); opacity: 0.7; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        
        @keyframes pulse-button {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(249, 115, 22, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 50px rgba(249, 115, 22, 0.6); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-very-slow {
          animation: spin-very-slow 20s linear infinite;
        }
        
        .animate-wave-horizontal {
          animation: wave-horizontal 15s linear infinite;
        }
        
        .animate-wave-vertical {
          animation: wave-vertical 18s linear infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-pulse-button {
          animation: pulse-button 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-float-up {
          animation: float-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Index;