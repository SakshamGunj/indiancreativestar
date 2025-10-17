import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Heart, ShoppingCart, Star, Grid, List, 
  ChevronDown, X, Check, Package, Truck, Shield, 
  CreditCard, ZoomIn, Share2, MessageCircle, User,
  ArrowLeft, ArrowRight, Plus, Minus, TrendingUp,
  Award, Eye, Download, Instagram, Facebook, Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import LazyImage from '@/components/LazyImage';
import { useNavigate } from 'react-router-dom';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistAvatar: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  sold: number;
  inStock: boolean;
  size: string;
  medium: string;
  year: string;
  featured?: boolean;
  trending?: boolean;
  tags: string[];
  description: string;
  likes: number;
}

// Sample artwork data
const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Sunset Dreams',
    artist: 'Priya Sharma',
    artistAvatar: '/WhatsApp Image 2025-09-08 at 17.20.43.jpeg',
    price: 15999,
    originalPrice: 24999,
    image: 'https://i.ibb.co/KjhKdP27/4fe133328b5c-1.jpg',
    category: 'Abstract',
    rating: 4.9,
    reviews: 156,
    sold: 45,
    inStock: true,
    size: '24" x 36"',
    medium: 'Acrylic on Canvas',
    year: '2024',
    featured: true,
    trending: true,
    tags: ['Abstract', 'Colorful', 'Modern'],
    description: 'A vibrant abstract piece capturing the essence of sunset.',
    likes: 234
  },
  {
    id: '2',
    title: 'Mountain Majesty',
    artist: 'Rajesh Kumar',
    artistAvatar: '/WhatsApp Image 2025-09-08 at 17.41.27.jpeg',
    price: 12999,
    image: 'https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg',
    category: 'Landscape',
    rating: 4.8,
    reviews: 89,
    sold: 32,
    inStock: true,
    size: '18" x 24"',
    medium: 'Oil on Canvas',
    year: '2024',
    trending: true,
    tags: ['Landscape', 'Nature', 'Mountains'],
    description: 'Majestic mountain landscape with stunning detail.',
    likes: 187
  },
  {
    id: '3',
    title: 'Urban Symphony',
    artist: 'Ananya Desai',
    artistAvatar: '/WhatsApp Image 2025-09-08 at 20.31.58.jpeg',
    price: 18999,
    originalPrice: 29999,
    image: 'https://i.ibb.co/KjhKdP27/4fe133328b5c-1.jpg',
    category: 'Modern',
    rating: 4.7,
    reviews: 124,
    sold: 28,
    inStock: true,
    size: '30" x 40"',
    medium: 'Mixed Media',
    year: '2024',
    featured: true,
    tags: ['Modern', 'Urban', 'Contemporary'],
    description: 'A modern take on city life through mixed media.',
    likes: 312
  },
  {
    id: '4',
    title: 'Floral Harmony',
    artist: 'Meera Patel',
    artistAvatar: '/WhatsApp Image 2025-09-08 at 21.35.50.jpeg',
    price: 8999,
    image: 'https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg',
    category: 'Traditional',
    rating: 4.9,
    reviews: 203,
    sold: 67,
    inStock: true,
    size: '16" x 20"',
    medium: 'Watercolor',
    year: '2024',
    trending: true,
    tags: ['Traditional', 'Floral', 'Nature'],
    description: 'Delicate watercolor flowers in traditional style.',
    likes: 421
  },
  {
    id: '5',
    title: 'Digital Dreams',
    artist: 'Arjun Singh',
    artistAvatar: '/image.dslr2.jpg',
    price: 6999,
    originalPrice: 9999,
    image: 'https://i.ibb.co/KjhKdP27/4fe133328b5c-1.jpg',
    category: 'Digital',
    rating: 4.6,
    reviews: 98,
    sold: 52,
    inStock: true,
    size: 'Digital Print 20" x 30"',
    medium: 'Digital Art',
    year: '2024',
    featured: true,
    tags: ['Digital', 'Modern', 'Print'],
    description: 'Contemporary digital artwork, museum quality print.',
    likes: 289
  },
  {
    id: '6',
    title: 'Portrait of Grace',
    artist: 'Kavya Reddy',
    artistAvatar: '/WhatsApp Image 2025-09-08 at 17.20.43.jpeg',
    price: 22999,
    image: 'https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg',
    category: 'Portrait',
    rating: 5.0,
    reviews: 45,
    sold: 12,
    inStock: true,
    size: '24" x 36"',
    medium: 'Oil on Canvas',
    year: '2024',
    featured: true,
    tags: ['Portrait', 'Realistic', 'Classic'],
    description: 'Stunning realistic portrait with fine details.',
    likes: 567
  },
  {
    id: '7',
    title: 'Cosmic Dance',
    artist: 'Vikram Mehta',
    artistAvatar: '/WhatsApp Image 2025-09-08 at 17.41.27.jpeg',
    price: 14999,
    originalPrice: 19999,
    image: 'https://i.ibb.co/KjhKdP27/4fe133328b5c-1.jpg',
    category: 'Abstract',
    rating: 4.8,
    reviews: 167,
    sold: 38,
    inStock: true,
    size: '36" x 48"',
    medium: 'Acrylic on Canvas',
    year: '2024',
    trending: true,
    tags: ['Abstract', 'Space', 'Cosmic'],
    description: 'Abstract representation of cosmic energy and movement.',
    likes: 445
  },
  {
    id: '8',
    title: 'Serene Lake',
    artist: 'Priya Sharma',
    artistAvatar: '/WhatsApp Image 2025-09-08 at 20.31.58.jpeg',
    price: 11999,
    image: 'https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg',
    category: 'Landscape',
    rating: 4.7,
    reviews: 134,
    sold: 41,
    inStock: true,
    size: '20" x 30"',
    medium: 'Oil on Canvas',
    year: '2024',
    tags: ['Landscape', 'Water', 'Peaceful'],
    description: 'Peaceful lake scene with mountains in background.',
    likes: 356
  },
];

const categories = ['All', 'Abstract', 'Landscape', 'Portrait', 'Modern', 'Traditional', 'Digital'];
const priceRanges = [
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
  { label: 'Above ₹20,000', min: 20000, max: 999999 },
];

export default function ArtworkMarketplace() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<any>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    'https://i.ibb.co/KjhKdP27/4fe133328b5c-1.jpg',
    'https://i.ibb.co/kgs0nvH0/b663bb4fcdd5.jpg',
    'https://i.ibb.co/KjhKdP27/4fe133328b5c-1.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (id: string) => {
    setCart(prev => 
      prev.includes(id) ? prev : [...prev, id]
    );
    // Show a brief success message
    const artwork = artworks.find(a => a.id === id);
    if (artwork) {
      // You can add a toast notification here
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item !== id));
  };

  const cartItems = artworks.filter(artwork => cart.includes(artwork.id));
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = selectedCategory === 'All' || artwork.category === selectedCategory;
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = !priceRange || (artwork.price >= priceRange.min && artwork.price <= priceRange.max);
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 font-sans">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                <img src="/company-logo.webp" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight leading-none">
                  Art Marketplace
                </h1>
                <p className="text-[10px] text-gray-500 font-medium">Discover Unique Creations</p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search artworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-all text-sm font-medium h-9 sm:h-10"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 sm:h-9 sm:w-9"
                onClick={() => {}}
              >
                <Heart className="h-4 w-4" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-red-500 text-white text-[10px] p-0 font-bold">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 sm:h-9 sm:w-9"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-purple-500 text-white text-[10px] p-0 font-bold">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                className="hidden lg:flex items-center gap-2 rounded-lg text-sm font-semibold h-9 px-4"
              >
                <User className="h-3.5 w-3.5" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Animated Background Slideshow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative w-full h-full">
            <motion.div
              key={currentSlide}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={heroImages[currentSlide]}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-pink-900/75 to-orange-900/85"></div>
            </motion.div>
          </div>
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Badge className="mb-3 sm:mb-4 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 font-bold shadow-2xl">
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                New Arrivals • Limited Edition
              </Badge>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 tracking-tight leading-[1.1] drop-shadow-2xl"
            >
              Discover Original<br />
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Artworks
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-semibold px-4 drop-shadow-lg"
            >
              Shop from India's most talented artists. Unique pieces, authentic quality, delivered to your doorstep.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-50 rounded-xl font-black text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Package className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Shop Now
              </Button>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-500 hover:to-orange-500 border-0 rounded-xl font-black text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Featured Artists
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-12 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 drop-shadow-lg">500+</div>
                <div className="text-xs sm:text-sm text-white/90 font-semibold drop-shadow">Artworks</div>
              </div>
              <div className="text-center border-x-2 border-white/30">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 drop-shadow-lg">100+</div>
                <div className="text-xs sm:text-sm text-white/90 font-semibold drop-shadow">Artists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 drop-shadow-lg">10K+</div>
                <div className="text-xs sm:text-sm text-white/90 font-semibold drop-shadow">Happy Customers</div>
              </div>
            </motion.div>

            {/* Slide Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-2 mt-6"
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-6 bg-white' 
                      : 'w-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Carousel */}
      <section className="py-6 sm:py-10 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🔥 Special Offers
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Limited time deals you can't miss!</p>
            </div>
            <Button variant="outline" className="hidden sm:flex rounded-lg font-bold text-sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Horizontal Scrollable Container */}
          <div className="relative -mx-4 px-4">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
              {/* Offer Card 1 */}
              <motion.div
                className="min-w-[260px] sm:min-w-[300px] snap-center bg-gradient-to-br from-red-500 via-red-600 to-pink-600 rounded-3xl p-4 sm:p-6 text-white shadow-2xl cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-white text-red-600 font-black text-xs px-3 py-1">FLASH SALE</Badge>
                    <TrendingUp className="h-5 w-5 text-white/80" />
                  </div>
                  <h4 className="text-3xl sm:text-4xl font-black mb-1 drop-shadow-lg">50% OFF</h4>
                  <p className="text-white/95 font-bold text-base sm:text-lg mb-4">On Abstract Art Collection</p>
                  <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold">
                    <Package className="h-4 w-4" />
                    <span>Limited Stock Available</span>
                  </div>
                  <Button size="sm" className="w-full bg-white text-red-600 hover:bg-gray-100 font-black rounded-xl py-4 sm:py-5 shadow-lg">
                    Shop Now →
                  </Button>
                </div>
              </motion.div>

              {/* Offer Card 2 */}
              <motion.div
                className="min-w-[260px] sm:min-w-[300px] snap-center bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl p-4 sm:p-6 text-white shadow-2xl cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-white text-blue-600 font-black text-xs px-3 py-1">NEW DEAL</Badge>
                    <Award className="h-5 w-5 text-white/80" />
                  </div>
                  <h4 className="text-3xl sm:text-4xl font-black mb-1 drop-shadow-lg">Buy 2</h4>
                  <p className="text-white/95 font-bold text-base sm:text-lg mb-4">Get 1 Absolutely Free</p>
                  <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold">
                    <Star className="h-4 w-4 fill-white" />
                    <span>Premium Artworks Only</span>
                  </div>
                  <Button size="sm" className="w-full bg-white text-blue-600 hover:bg-gray-100 font-black rounded-xl py-4 sm:py-5 shadow-lg">
                    Explore Deals →
                  </Button>
                </div>
              </motion.div>

              {/* Offer Card 3 */}
              <motion.div
                className="min-w-[260px] sm:min-w-[300px] snap-center bg-gradient-to-br from-green-500 via-green-600 to-teal-600 rounded-3xl p-4 sm:p-6 text-white shadow-2xl cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-white text-green-600 font-black text-xs px-3 py-1">FREE SHIPPING</Badge>
                    <Truck className="h-5 w-5 text-white/80" />
                  </div>
                  <h4 className="text-3xl sm:text-4xl font-black mb-1 drop-shadow-lg">₹0</h4>
                  <p className="text-white/95 font-bold text-base sm:text-lg mb-4">On Orders Above ₹5000</p>
                  <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold">
                    <Shield className="h-4 w-4" />
                    <span>Safe & Secure Delivery</span>
                  </div>
                  <Button size="sm" className="w-full bg-white text-green-600 hover:bg-gray-100 font-black rounded-xl py-4 sm:py-5 shadow-lg">
                    Shop Now →
                  </Button>
                </div>
              </motion.div>

              {/* Offer Card 4 */}
              <motion.div
                className="min-w-[260px] sm:min-w-[300px] snap-center bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-3xl p-4 sm:p-6 text-white shadow-2xl cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-white text-orange-600 font-black text-xs px-3 py-1">LIMITED TIME</Badge>
                    <Eye className="h-5 w-5 text-white/80" />
                  </div>
                  <h4 className="text-3xl sm:text-4xl font-black mb-1 drop-shadow-lg">Artist</h4>
                  <p className="text-white/95 font-bold text-base sm:text-lg mb-4">Exclusive Collection</p>
                  <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold">
                    <Award className="h-4 w-4 fill-white" />
                    <span>Verified Artists Only</span>
                  </div>
                  <Button size="sm" className="w-full bg-white text-orange-600 hover:bg-gray-100 font-black rounded-xl py-4 sm:py-5 shadow-lg">
                    Discover Now →
                  </Button>
                </div>
              </motion.div>

              {/* Offer Card 5 - Extra */}
              <motion.div
                className="min-w-[260px] sm:min-w-[300px] snap-center bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-3xl p-4 sm:p-6 text-white shadow-2xl cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-white text-purple-600 font-black text-xs px-3 py-1">WEEKEND SALE</Badge>
                    <Star className="h-5 w-5 text-white/80 fill-white" />
                  </div>
                  <h4 className="text-3xl sm:text-4xl font-black mb-1 drop-shadow-lg">30% OFF</h4>
                  <p className="text-white/95 font-bold text-base sm:text-lg mb-4">On Digital Art Prints</p>
                  <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold">
                    <Download className="h-4 w-4" />
                    <span>Instant Download Available</span>
                  </div>
                  <Button size="sm" className="w-full bg-white text-purple-600 hover:bg-gray-100 font-black rounded-xl py-4 sm:py-5 shadow-lg">
                    Get Prints →
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6 sm:hidden">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
              <div className="h-1.5 w-8 rounded-full bg-purple-600"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-3 sm:py-4 bg-white border-b border-gray-200">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2 flex-nowrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full whitespace-nowrap text-xs font-semibold px-3 py-1.5 h-8 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-md' 
                      : ''
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-lg h-8 w-8"
              >
                <Filter className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="rounded-lg h-8 w-8"
              >
                {viewMode === 'grid' ? <List className="h-3.5 w-3.5" /> : <Grid className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Sidebar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-sm">Price Range</h4>
                  {priceRanges.map((range) => (
                    <Button
                      key={range.label}
                      variant="ghost"
                      className={`w-full justify-start mb-2 font-medium text-sm ${
                        priceRange?.label === range.label ? 'bg-purple-100' : ''
                      }`}
                      onClick={() => setPriceRange(range)}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-sm">Sort By</h4>
                  {['Featured', 'Price: Low to High', 'Price: High to Low', 'Most Popular'].map((option) => (
                    <Button
                      key={option}
                      variant="ghost"
                      className="w-full justify-start mb-2 font-medium text-sm"
                      onClick={() => setSortBy(option.toLowerCase())}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                <Button 
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <section className="py-5 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <p className="text-gray-600 text-sm font-medium">
              Showing <span className="font-bold">{filteredArtworks.length}</span> results
            </p>
          </div>

          {/* Artwork Grid */}
          <div className={`grid gap-3 sm:gap-4 md:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
              >
                {/* Badges */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 sm:gap-2">
                  {artwork.featured && (
                    <Badge className="bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5">Featured</Badge>
                  )}
                  {artwork.trending && (
                    <Badge className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5">
                      <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                      Trending
                    </Badge>
                  )}
                  {artwork.originalPrice && (
                    <Badge className="bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5">
                      {Math.round((1 - artwork.price / artwork.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Image */}
                <div 
                  className="relative aspect-square overflow-hidden cursor-pointer"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <LazyImage
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  
                  {/* Quick Actions - Always Visible on Mobile */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex flex-col gap-2">
                    <Button
                      size="icon"
                      className="rounded-full bg-white/90 text-gray-900 hover:bg-white shadow-lg h-8 w-8 sm:h-9 sm:w-9"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArtwork(artwork);
                      }}
                    >
                      <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className={`rounded-full shadow-lg h-8 w-8 sm:h-9 sm:w-9 ${
                        wishlist.includes(artwork.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 text-gray-900 hover:bg-white'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(artwork.id);
                      }}
                    >
                      <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${wishlist.includes(artwork.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  {/* Artist */}
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={artwork.artistAvatar} 
                      alt={artwork.artist}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                    />
                    <span className="text-xs sm:text-sm text-gray-600 font-medium truncate">{artwork.artist}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 line-clamp-2 leading-tight">{artwork.title}</h3>

                  {/* Details */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-600 font-medium">
                    <span className="truncate">{artwork.size}</span>
                    <span>•</span>
                    <span className="truncate">{artwork.medium}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-xs sm:text-sm">{artwork.rating}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium">({artwork.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl md:text-2xl font-black text-gray-900">
                      ₹{artwork.price.toLocaleString('en-IN')}
                    </span>
                    {artwork.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through font-semibold">
                        ₹{artwork.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 sm:gap-2">
                    <Button 
                      className="flex-1 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs sm:text-sm font-bold py-2 sm:py-2.5 h-auto"
                      onClick={() => addToCart(artwork.id)}
                    >
                      <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-lg sm:rounded-xl h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                      onClick={() => {}}
                    >
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 text-[10px] sm:text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {artwork.sold * 10}
                    </span>
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {artwork.likes}
                    </span>
                    <span>{artwork.sold} sold</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artwork Detail Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
                {/* Image */}
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                    onClick={() => setSelectedArtwork(null)}
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </Button>

                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <img 
                      src={selectedArtwork.artistAvatar}
                      alt={selectedArtwork.artist}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-sm sm:text-base">{selectedArtwork.artist}</p>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Professional Artist</p>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">{selectedArtwork.title}</h2>

                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ${
                            i < Math.floor(selectedArtwork.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-sm sm:text-base">{selectedArtwork.rating}</span>
                    <span className="text-gray-500 text-xs sm:text-sm font-medium">({selectedArtwork.reviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black">
                      ₹{selectedArtwork.price.toLocaleString('en-IN')}
                    </span>
                    {selectedArtwork.originalPrice && (
                      <>
                        <span className="text-base sm:text-lg md:text-xl text-gray-400 line-through font-semibold">
                          ₹{selectedArtwork.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <Badge className="bg-green-500 text-[10px] sm:text-xs font-bold">
                          {Math.round((1 - selectedArtwork.price / selectedArtwork.originalPrice) * 100)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 font-medium leading-relaxed">{selectedArtwork.description}</p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1 font-medium">Size</p>
                      <p className="font-bold text-sm sm:text-base">{selectedArtwork.size}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1 font-medium">Medium</p>
                      <p className="font-bold text-sm sm:text-base">{selectedArtwork.medium}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1 font-medium">Year</p>
                      <p className="font-bold text-sm sm:text-base">{selectedArtwork.year}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1 font-medium">Category</p>
                      <p className="font-bold text-sm sm:text-base">{selectedArtwork.category}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {selectedArtwork.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full text-[10px] sm:text-xs font-semibold">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Button 
                      className="flex-1 py-4 sm:py-5 md:py-6 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600"
                      onClick={() => addToCart(selectedArtwork.id)}
                    >
                      <ShoppingCart className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-lg sm:rounded-xl h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0"
                      onClick={() => toggleWishlist(selectedArtwork.id)}
                    >
                      <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        wishlist.includes(selectedArtwork.id) ? 'fill-red-500 text-red-500' : ''
                      }`} />
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg sm:rounded-xl">
                      <Truck className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600 mx-auto mb-1 sm:mb-2" />
                      <p className="text-[10px] sm:text-xs font-bold">Free Shipping</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg sm:rounded-xl">
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600 mx-auto mb-1 sm:mb-2" />
                      <p className="text-[10px] sm:text-xs font-bold">Secure Payment</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg sm:rounded-xl">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600 mx-auto mb-1 sm:mb-2" />
                      <p className="text-[10px] sm:text-xs font-bold">Authentic Art</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40"
        >
          <Button
            size="lg"
            onClick={() => setCartOpen(true)}
            className="rounded-full shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold h-auto transform hover:scale-110 transition-all"
          >
            <ShoppingCart className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            View Cart ({cart.length})
          </Button>
        </motion.div>
      )}

      {/* Shopping Cart Modal */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Shopping Cart
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 font-semibold mt-1">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCartOpen(false)}
                  className="rounded-full h-10 w-10 hover:bg-gray-200"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-lg font-semibold text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-2">Add some amazing artworks to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4 bg-gray-50 rounded-2xl p-3 sm:p-4 hover:bg-gray-100 transition-colors"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm sm:text-base mb-1 truncate">{item.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">{item.artist}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg font-black text-purple-600">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs sm:text-sm text-gray-400 line-through font-semibold">
                                ₹{item.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full h-8 w-8 sm:h-10 sm:w-10 text-red-500 hover:bg-red-50 hover:text-red-600 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base sm:text-lg font-semibold text-gray-600">Subtotal:</span>
                    <span className="text-2xl sm:text-3xl font-black text-gray-900">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Savings */}
                  {cartItems.some(item => item.originalPrice) && (
                    <div className="flex items-center justify-between mb-4 text-green-600">
                      <span className="text-sm font-semibold">You Save:</span>
                      <span className="text-lg font-black">
                        ₹{cartItems.reduce((sum, item) => 
                          sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0
                        ).toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCartOpen(false)}
                      className="flex-1 rounded-xl font-bold text-sm sm:text-base py-5 sm:py-6"
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold text-sm sm:text-base py-5 sm:py-6 shadow-lg"
                      onClick={() => {
                        // Navigate to checkout
                        setCartOpen(false);
                      }}
                    >
                      <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Proceed to Checkout
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mx-auto mb-1" />
                      <p className="text-[10px] sm:text-xs font-bold text-gray-600">Secure</p>
                    </div>
                    <div className="text-center">
                      <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mx-auto mb-1" />
                      <p className="text-[10px] sm:text-xs font-bold text-gray-600">Free Ship</p>
                    </div>
                    <div className="text-center">
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mx-auto mb-1" />
                      <p className="text-[10px] sm:text-xs font-bold text-gray-600">Authentic</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
