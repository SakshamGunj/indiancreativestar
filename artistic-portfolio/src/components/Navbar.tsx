import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { Moon, Sun, Settings, Menu, X } from 'lucide-react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b-2 border-border">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl sm:text-2xl font-display font-bold tracking-tighter z-50">
          {data.profile.name.toUpperCase()}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-6 mr-4 font-medium text-sm uppercase tracking-widest">
            <a href="#work" className="hover:text-accent dark:hover:text-primary transition-colors">Work</a>
            <a href="#about" className="hover:text-accent dark:hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-accent dark:hover:text-primary transition-colors">Contact</a>
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full brutal-border hover:bg-primary hover:text-black transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/admin"
            className="p-2 rounded-full brutal-border bg-black text-white dark:bg-white dark:text-black hover:bg-primary hover:text-black dark:hover:bg-primary transition-colors"
            aria-label="Admin Dashboard"
          >
            <Settings size={20} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2 sm:gap-3 z-50">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full brutal-border hover:bg-primary hover:text-black transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full brutal-border hover:bg-primary hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg border-b-2 border-border p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-4 font-medium text-lg uppercase tracking-widest">
            <a href="#work" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-accent dark:hover:text-primary transition-colors">Work</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-accent dark:hover:text-primary transition-colors">About</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-accent dark:hover:text-primary transition-colors">Contact</a>
          </div>
          <Link
            to="/admin"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl brutal-border bg-black text-white dark:bg-white dark:text-black hover:bg-primary hover:text-black dark:hover:bg-primary transition-colors font-bold uppercase tracking-widest"
          >
            <Settings size={20} /> Admin Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
