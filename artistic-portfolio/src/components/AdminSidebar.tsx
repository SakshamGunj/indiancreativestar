import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Image as ImageIcon, User, Moon, Sun, Home, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const links = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/works', icon: ImageIcon, label: 'Manage Works' },
    { to: '/admin/profile', icon: User, label: 'Edit Profile' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b-2 border-border bg-card z-40 flex items-center justify-between px-4">
        <h2 className="text-xl font-display font-bold tracking-tighter">ADMIN</h2>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full brutal-border hover:bg-primary hover:text-black transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-64 h-screen fixed left-0 top-0 border-r-2 border-border bg-card flex flex-col z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 border-b-2 border-border flex justify-between items-center">
          <h2 className="text-2xl font-display font-bold tracking-tighter">ADMIN</h2>
          <button className="md:hidden p-1 hover:text-accent dark:hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all brutal-border",
                  isActive 
                    ? "bg-primary text-black brutal-shadow translate-x-[-2px] translate-y-[-2px]" 
                    : "hover:bg-secondary/20"
                )}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-2 border-border space-y-2 bg-card">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-secondary/20 transition-all brutal-border"
          >
            <Home size={20} />
            View Site
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-secondary/20 transition-all brutal-border"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            Toggle Theme
          </button>
        </div>
      </aside>
    </>
  );
}
