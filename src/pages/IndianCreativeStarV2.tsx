
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Palette, Users, Star, Award, ThumbsUp, FileText, Image, BookOpen, HelpCircle } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Confetti } from '@/components/Confetti';

const IndianCreativeStarV2 = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {showConfetti && <Confetti />}
      
      {/* New Header Section */}
      <header className="absolute top-0 left-0 w-full z-30 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/company-logo.jpeg" alt="SCS Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-bold text-xl text-gray-800">Indian Creative Star</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-purple-500 transition-colors font-semibold">Home</a>
            <a href="#about" className="text-gray-600 hover:text-purple-500 transition-colors font-semibold">About</a>
            <a href="#prizes" className="text-gray-600 hover:text-purple-500 transition-colors font-semibold">Prizes</a>
            <a href="#gallery" className="text-gray-600 hover:text-purple-500 transition-colors font-semibold">Gallery</a>
          </div>
          <a href="/thank-you?from=/indiancreativestar/v2">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full text-lg transform hover:scale-105 transition-transform shadow-lg">
              Register Now
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 text-left bg-gradient-to-b from-purple-50 via-pink-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h1 className="text-6xl md:text-8xl font-extrabold mb-4 leading-tight tracking-tighter animate-fade-in-down">
                Unleash Your Inner
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Creative Star</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8 animate-fade-in-up">
                "They told your dreams don't pay, but your brush had more to say. What you create alone — the nation will now celebrate. Sikkim has millions of stories. Let yours rise today."
              </p>
              <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=64&amp;h=64&amp;q=80" alt="" loading="lazy"/>
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=64&amp;h=64&amp;q=80" alt="" loading="lazy"/>
                  <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=64&amp;h=64&amp;q=80" alt="" loading="lazy"/>
                </div>
                <div>
                  <p className="font-bold">1,000+ Artists Nationwide</p>
                  <p className="text-sm text-gray-500">4.9 rating</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-transform shadow-xl animate-fade-in-up">
                Registration Closing Soon <ArrowRight className="ml-2" />
              </Button>
            </div>
            <div className="relative h-full">
                <div className="absolute animate-blob top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute animate-blob top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animation-delay-2000"></div>
                <div className="absolute animate-blob -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animation-delay-4000"></div>
                <div className="relative z-10 grid grid-cols-2 gap-4">
                    <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
                        <BookOpen className="h-8 w-8 text-purple-500 mb-2" />
                        <h4 className="font-bold">eMagazine Feature</h4>
                        <p className="text-sm text-gray-600">Featured in "Sikkim's Creative Star 2025"</p>
                    </div>
                    <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
                        <Star className="h-8 w-8 text-purple-500 mb-2" />
                        <h4 className="font-bold">National Exposure</h4>
                        <p className="text-sm text-gray-600">to art galleries and collectors</p>
                    </div>
                    <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
                        <ThumbsUp className="h-8 w-8 text-purple-500 mb-2" />
                        <h4 className="font-bold">Professional Feedback</h4>
                        <p className="text-sm text-gray-600">from renowned artists</p>
                    </div>
                    <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
                        <FileText className="h-8 w-8 text-purple-500 mb-2" />
                        <h4 className="font-bold">Digital Certificate & ID</h4>
                        <p className="text-sm text-gray-600">Official recognition for all</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe every artist deserves recognition. Indian Creative Star was born from the vision to create a nationwide platform where creativity meets opportunity, and talent finds its true audience.
              </p>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full text-lg transform hover:scale-105 transition-transform shadow-lg">
                Discover What Makes Us Special
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 flex items-center gap-4">
                <Users className="h-10 w-10 text-purple-500" />
                <div>
                  <h3 className="text-2xl font-bold">1000+</h3>
                  <p className="text-gray-600">Artists Joined</p>
                </div>
              </div>
              <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 flex items-center gap-4">
                <Award className="h-10 w-10 text-purple-500" />
                <div>
                  <h3 className="text-2xl font-bold">₹50K</h3>
                  <p className="text-gray-600">Prize Pool</p>
                </div>
              </div>
              <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 flex items-center gap-4">
                <Star className="h-10 w-10 text-purple-500" />
                <div>
                  <h3 className="text-2xl font-bold">Nationwide Platform</h3>
                  <p className="text-gray-600">Connect with creatives from across India and showcase your talent on a national stage.</p>
                </div>
              </div>
              <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 flex items-center gap-4">
                <FileText className="h-10 w-10 text-purple-500" />
                <div>
                  <h3 className="text-2xl font-bold">Official Certification</h3>
                  <p className="text-gray-600">Every participant receives a digital certificate to boost their portfolio and resume.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Artists and Parents */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1581092919534-89c3f19d3a4d?q=80&w=800&auto=format&fit=crop" alt="Artists" className="rounded-3xl shadow-2xl w-full" loading="lazy" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-200 rounded-2xl -z-10 transform rotate-45"></div>
            </div>
            <div className="glassmorphism-card p-8 rounded-3xl shadow-2xl border border-gray-200/50">
              <div className="flex items-center mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                  <Palette className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold ml-6">For Artists</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                Showcase your talent, gain recognition, and win from a prize pool of ₹30,000.
              </p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                  <span>Connect with a vibrant artist community</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                  <span>Receive professional feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                  <span>Add national recognition to your portfolio</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-24">
            <div className="glassmorphism-card p-8 rounded-3xl shadow-2xl border border-gray-200/50 md:order-2">
              <div className="flex items-center mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold ml-6">For Parents</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                Nurture your child's creativity and provide them with a platform to shine.
              </p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-pink-500" />
                  <span>Boost your child's confidence</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-pink-500" />
                  <span>Earn recognition beyond school</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-pink-500" />
                  <span>Create a special portfolio for their future</span>
                </li>
              </ul>
            </div>
            <div className="relative md:order-1">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop" alt="Parents" className="rounded-3xl shadow-2xl w-full" loading="lazy" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-pink-100 to-red-200 rounded-2xl -z-10 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-16">How It Works</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="text-center transform hover:scale-105 transition-transform">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 text-5xl font-bold shadow-lg border-4 border-white">1</div>
                <h3 className="text-3xl font-bold mb-2">Register</h3>
                <p className="text-gray-600 text-lg">Create your account and join the competition.</p>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 text-5xl font-bold shadow-lg border-4 border-white">2</div>
                <h3 className="text-3xl font-bold mb-2">Submit Artwork</h3>
                <p className="text-gray-600 text-lg">Upload your masterpiece for the world to see.</p>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center text-pink-600 text-5xl font-bold shadow-lg border-4 border-white">3</div>
                <h3 className="text-3xl font-bold mb-2">Win Prizes</h3>
                <p className="text-gray-600 text-lg">Get a chance to win amazing cash prizes and more.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Win Amazing Prizes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">The top artists will be rewarded with cash prizes, certificates, and a chance to be featured in our magazine.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glassmorphism-card p-8 rounded-3xl shadow-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center text-yellow-600 text-5xl font-bold shadow-lg border-4 border-white">
                <Award className="h-16 w-16" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1st Prize</h3>
              <p className="text-gray-600 text-xl">₹15,000 Cash Prize</p>
            </div>
            <div className="glassmorphism-card p-8 rounded-3xl shadow-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 text-5xl font-bold shadow-lg border-4 border-white">
                <Award className="h-16 w-16" />
              </div>
              <h3 className="text-3xl font-bold mb-2">2nd Prize</h3>
              <p className="text-gray-600 text-xl">₹10,000 Cash Prize</p>
            </div>
            <div className="glassmorphism-card p-8 rounded-3xl shadow-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-600 text-5xl font-bold shadow-lg border-4 border-white">
                <Award className="h-16 w-16" />
              </div>
              <h3 className="text-3xl font-bold mb-2">3rd Prize</h3>
              <p className="text-gray-600 text-xl">₹5,000 Cash Prize</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-5xl font-bold mb-6">Get Your Certificate</h2>
              <p className="text-lg text-gray-600 mb-8">All participants will receive a personalized certificate of participation to commemorate their creative journey.</p>
              <Button variant="outline" className="border-2 border-pink-500 text-pink-500 font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-transform hover:bg-pink-50">
                View Sample <FileText className="ml-2" />
              </Button>
            </div>
            <div className="flex justify-center">
              <img src="/certificate-template-new.png" alt="Certificate" className="rounded-2xl shadow-2xl w-full max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-16">Explore the Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=400&auto=format&fit=crop" alt="Artwork" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=400&auto=format&fit=crop" alt="Artwork" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&auto=format&fit=crop" alt="Artwork" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1536924940846-222b320bb0b6?q=80&w=400&auto=format&fit=crop" alt="Artwork" className="w-full h-full object-cover" loading="lazy" />
            </div>
             <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&auto=format&fit=crop" alt="Artwork" className="w-full h-full object-cover" loading="lazy" />
            </div>
             <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop" alt="Artwork" className="w-full h-full object-cover" loading="lazy" />
            </div>
             <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=400&auto=format&fit=crop" alt="Artwork" className="w-full h-full object-cover" loading="lazy" />
            </div>
             <div className="h-64 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop" alt="Artwork" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <Button className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-transform shadow-xl">
            View All Artwork <Image className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Magazine Section */}
      <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img src="/magazine-cover.png" alt="Magazine" className="rounded-2xl shadow-2xl w-full transform hover:scale-105 transition-transform" />
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl -z-10 transform rotate-45"></div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-5xl font-bold mb-6">Featured in Our Magazine</h2>
              <p className="text-lg text-gray-600 mb-8">The best artworks will be featured in our exclusive digital magazine, reaching a wide audience of art lovers and collectors.</p>
              <Button variant="outline" className="border-2 border-purple-500 text-purple-500 font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-transform hover:bg-purple-50">
                Read Now <BookOpen className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold flex items-center justify-between"><span>What is the theme of the competition?</span> <HelpCircle className="text-purple-500" /></h3>
              <p className="text-gray-600 mt-2">The theme for this season is "Colors of India". Let your imagination run wild and interpret the theme in your own unique style.</p>
            </div>
            <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold flex items-center justify-between"><span>Who can participate?</span> <HelpCircle className="text-purple-500" /></h3>
              <p className="text-gray-600 mt-2">The competition is open to all artists across India, of all ages and skill levels. We encourage everyone to participate.</p>
            </div>
            <div className="glassmorphism-card p-6 rounded-2xl border border-gray-200/50 transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold flex items-center justify-between"><span>What are the submission guidelines?</span> <HelpCircle className="text-purple-500" /></h3>
              <p className="text-gray-600 mt-2">You can submit up to three artworks in any medium (painting, drawing, digital art, etc.). Please ensure your submissions are in high resolution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16">What Our Participants Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Participant" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-xl" loading="lazy" />
              <h4 className="font-bold text-xl">Aarav Sharma</h4>
              <p className="text-sm text-gray-500 mb-4">Last Year's Winner</p>
              <p className="text-gray-600 italic">"This competition was a turning point in my artistic journey. The exposure and recognition I received were incredible."</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="Participant" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-xl" loading="lazy" />
              <h4 className="font-bold text-xl">Priya Singh</h4>
              <p className="text-sm text-gray-500 mb-4">Participant</p>
              <p className="text-gray-600 italic">"A fantastic platform to connect with other artists and learn from their experiences. Highly recommended!"</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center transform hover:scale-105 transition-transform">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" alt="Participant" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-xl" loading="lazy" />
              <h4 className="font-bold text-xl">Rohan Verma</h4>
              <p className="text-sm text-gray-500 mb-4">Participant</p>
              <p className="text-gray-600 italic">"The entire experience was so well-organized. I'm already looking forward to the next season!"</p>
            </div>
          </div>
        </div>
      </section>

      <Footer onRegisterClick={() => {}} />
    </div>
  );
};

export default IndianCreativeStarV2;

