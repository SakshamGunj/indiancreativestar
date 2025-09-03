import { useState } from "react";
import { ArrowRight, Instagram, Star, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistrationFlowModal } from "@/components/RegistrationFlowModal";

// Premium white-theme, glassmorphism variant of the Indian Creative Star landing page
// Route: /Indiancreativestar/v2

export default function IndianCreativeStarV2() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleRegisterClick = () => setShowRegistrationModal(true);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Colorful soft gradient overlays for an artsy white theme */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-28 -left-24 h-96 w-96 rounded-full bg-[#ffd1dc]/60 blur-3xl" />
        <div className="absolute -top-10 right-[-6rem] h-80 w-80 rounded-full bg-[#c7e9ff]/70 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/4 h-96 w-96 rounded-full bg-[#e7d4ff]/60 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full bg-[#ffe9b0]/70 blur-2xl" />
      </div>

      {/* Header - light, compact, mobile-first */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/75 border-b border-black/5">
        <div className="container flex items-center justify-between py-3">
          <a href="#" className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=200&auto=format&fit=crop" alt="Logo" className="h-9 w-9 rounded-full object-cover" />
            <div className="font-semibold tracking-tight">Indiancreativestar</div>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <Button className="bg-gray-900 text-white hover:bg-gray-800" onClick={handleRegisterClick}>
              Register <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 sm:pt-16">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-xl border border-black/5 px-3 py-1 text-xs text-gray-600 shadow-sm">
              2025 National Art Showcase
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Premium white art landing built for conversions
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-600">
              Submit your best artwork, gain national recognition, and win exciting prizes. Designed with a clean, modern white aesthetic and gentle colors.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800" onClick={handleRegisterClick}>
                Enter competition
              </Button>
              <Button size="lg" variant="outline" className="backdrop-blur-xl bg-white/80 border-black/10">
                View rules
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500" /> Trusted by 10k+ artists</div>
              <div className="flex items-center gap-1"><Sparkles className="h-4 w-4 text-purple-500" /> Curated gallery features</div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl border border-black/5 bg-white/60 backdrop-blur-2xl p-4 shadow-xl">
              <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop" alt="Artwork" className="rounded-2xl object-cover w-full h-[320px] sm:h-[380px]" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl border border-black/5 bg-white/60 backdrop-blur-xl p-3 shadow-lg">
              <img src="https://images.unsplash.com/photo-1526312426976-593c2b5a4533?q=80&w=300&auto=format&fit=crop" alt="Artwork 2" className="rounded-xl w-36 h-24 object-cover" />
            </div>
            <div className="absolute -top-6 -right-6 hidden sm:block rounded-2xl border border-black/5 bg-white/60 backdrop-blur-xl p-3 shadow-lg">
              <img src="https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=300&auto=format&fit=crop" alt="Artwork 3" className="rounded-xl w-36 h-24 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Light value props */}
      <section className="py-10 sm:py-14">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{t:"For Artists",d:"Showcase creativity and grow your audience."},{t:"For Parents",d:"Nurture your child’s talent with recognition."},{t:"For Schools",d:"Highlight student excellence nationally."}].map((it, idx) => (
            <div key={idx} className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">{it.t}</h3>
              <p className="mt-2 text-gray-600">{it.d}</p>
              <Button className="mt-4 bg-gray-900 text-white hover:bg-gray-800" onClick={handleRegisterClick}>Get started</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-10 sm:py-16">
        <div className="container">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-xl border border-black/5 px-3 py-1 text-xs text-gray-600 shadow-sm">Prizes</div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Win trophies, features and cash rewards</h2>
            <p className="mt-2 text-gray-600">A premium recognition program for India’s creative community.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Gold", "Silver", "Bronze"].map((tier, i) => (
              <div key={tier} className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl p-6 text-center shadow-lg">
                <Award className={`mx-auto h-8 w-8 ${i===0?"text-yellow-500":i===1?"text-gray-500":"text-amber-700"}`} />
                <h3 className="mt-2 font-semibold">{tier} Winner</h3>
                <p className="mt-1 text-gray-600">Certificate + Trophy + Cash prize</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-10 sm:py-16">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">How it works</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Register","Upload Art","Get Votes","Win"].map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-xl p-5 shadow-lg">
                <div className="text-sm text-gray-500">Step {idx+1}</div>
                <div className="mt-1 font-semibold">{step}</div>
                <p className="mt-1 text-gray-600">Simple and fast process designed for mobile users.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Unsplash */}
      <section id="gallery" className="py-10 sm:py-16">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Featured Gallery</h2>
          <p className="text-center text-gray-600 mt-1">A glimpse of the creative energy from across India.</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {["art","painting","abstract","colors","creative","illustration","digital","modern"].map((q, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-black/5 bg-white/60 shadow">
                <img
                  src={`https://images.unsplash.com/photo-1500${1000+i}555697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop&ixid=Mnwx&${q}`}
                  alt={q}
                  className="h-36 md:h-44 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button className="bg-gray-900 text-white hover:bg-gray-800" onClick={handleRegisterClick}>Your art could be next</Button>
          </div>
        </div>
      </section>

      {/* FAQ - simple light accordions (static) */}
      <section id="faq" className="py-10 sm:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Frequently asked</h2>
          <div className="mt-6 space-y-3">
            {[{q:"Who can participate?",a:"Any artist or student across India."},{q:"How do I submit?",a:"Register and upload your artwork from your phone."},{q:"Are there fees?",a:"We offer early-bird discounts. See rules after registering."}].map((f, i) => (
              <div key={i} className="rounded-xl border border-black/5 bg-white/70 backdrop-blur-xl p-4 shadow">
                <div className="font-medium">{f.q}</div>
                <div className="text-gray-600 text-sm mt-1">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer section - light */}
      <section className="py-12">
        <div className="container text-center">
          <div className="rounded-3xl border border-black/5 bg-white/80 backdrop-blur-xl p-8 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold">Ready to get discovered?</h3>
            <p className="text-gray-600 mt-2">Join Indiancreativestar today and showcase your talent.</p>
            <Button size="lg" className="mt-5 bg-gray-900 text-white hover:bg-gray-800" onClick={handleRegisterClick}>Register now</Button>
          </div>
          <p className="text-xs text-gray-500 mt-6">© {new Date().getFullYear()} Indiancreativestar. All rights reserved.</p>
        </div>
      </section>

      <RegistrationFlowModal isOpen={showRegistrationModal} onClose={() => setShowRegistrationModal(false)} />
    </div>
  );
}

