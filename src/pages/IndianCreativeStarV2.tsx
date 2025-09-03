import { useState } from "react";
import { ArrowRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/AboutSection";
import { PrizeSection } from "@/components/PrizeSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialCarouselSection } from "@/components/TestimonialCarouselSection";
import { CertificateSection } from "@/components/CertificateSection";
import { GallerySection } from "@/components/GallerySection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { RegistrationFlowModal } from "@/components/RegistrationFlowModal";

// Premium white-theme, glassmorphism variant of the Indian Creative Star landing page
// Route: /Indiancreativestar/v2

export default function IndianCreativeStarV2() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleRegisterClick = () => setShowRegistrationModal(true);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Artful background with subtle colorful gradients and glass cards */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-creative-pink/20 blur-3xl" />
        <div className="absolute -top-10 right-[-6rem] h-80 w-80 rounded-full bg-creative-blue/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-creative-purple/20 blur-3xl" />
      </div>

      {/* Simple clean header for white theme */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-b border-black/5">
        <div className="container flex items-center justify-between py-3">
          <a href="#" className="flex items-center gap-3">
            <img src="/company-logo.jpeg" alt="Indian Creative Star" className="h-10 w-10 rounded-full object-cover" />
            <div className="font-semibold tracking-tight">Indiancreativestar</div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#about" className="hover:text-gray-900">About</a>
            <a href="#prizes" className="hover:text-gray-900">Prizes</a>
            <a href="#how" className="hover:text-gray-900">How it works</a>
            <a href="#gallery" className="hover:text-gray-900">Gallery</a>
            <a href="#faq" className="hover:text-gray-900">FAQ</a>
          </nav>
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
              Register now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero - glass card on white */}
      <section className="relative pt-16 sm:pt-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-xl border border-black/5 px-3 py-1 text-xs text-gray-600 shadow-sm">
                National Art Talent Showcase 2025
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                Celebrate your art with a premium, modern platform
              </h1>
              <p className="mt-4 text-base sm:text-lg text-gray-600">
                Join India’s most vibrant art competition. Submit your best work, inspire millions, and win exciting prizes.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800" onClick={handleRegisterClick}>
                  Enter the competition
                </Button>
                <Button size="lg" variant="outline" className="backdrop-blur-xl bg-white/70 border-black/10">
                  View guidelines
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl border border-black/5 bg-white/60 backdrop-blur-2xl p-4 shadow-xl">
                <img src="/images/f0d90b249cd4582aaaeb47b9ecee3c14.jpg" alt="Artwork" className="rounded-2xl object-cover w-full h-[340px]" />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl border border-black/5 bg-white/40 backdrop-blur-xl p-3 shadow-lg">
                <img src="/images/c9c807abb1b5486218c4f0eeb641414c.jpg" alt="Artwork 2" className="rounded-xl w-36 h-24 object-cover" />
              </div>
              <div className="absolute -top-6 -right-6 hidden sm:block rounded-2xl border border-black/5 bg-white/40 backdrop-blur-xl p-3 shadow-lg">
                <img src="/images/54614b3791b5fd2d60530d9661b3cf80.jpg" alt="Artwork 3" className="rounded-xl w-36 h-24 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium value props in glass cards */}
      <section className="py-12 sm:py-16">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
          {["For Artists","For Parents","For Schools"].map((title, idx) => (
            <div key={idx} className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600">
                Showcase creativity, build recognition, and elevate portfolios with national visibility.
              </p>
              <Button className="mt-4 bg-gray-900 text-white hover:bg-gray-800" onClick={handleRegisterClick}>
                Get started
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Carry forward original content sections for parity */}
      <section id="about"><AboutSection /></section>
      <section id="prizes"><PrizeSection /></section>
      <section id="how"><HowItWorksSection onRegistrationClick={handleRegisterClick} /></section>
      <TestimonialCarouselSection />
      <CertificateSection onRegistrationClick={handleRegisterClick} />
      <GallerySection />
      <section id="faq"><FAQSection /></section>
      <Footer onRegisterClick={handleRegisterClick} />

      <RegistrationFlowModal isOpen={showRegistrationModal} onClose={() => setShowRegistrationModal(false)} />
    </div>
  );
}

