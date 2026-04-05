import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { AdminSidebar } from './components/AdminSidebar';
import { CustomCursor } from './components/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';

// We wrap the layouts in the providers they need
export function PortfolioPublicLayout() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
        <PortfolioProvider>
          <div className="min-h-screen portfolio-scope">
            <CustomCursor />
            <Navbar />
            <main>
              <Outlet />
            </main>
          </div>
        </PortfolioProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export function PortfolioAdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
        <PortfolioProvider>
          <div className="min-h-screen portfolio-bg flex portfolio-scope">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="flex-1 md:ml-64 min-h-screen overflow-y-auto w-full pt-16 md:pt-0">
              <Outlet />
            </main>
          </div>
        </PortfolioProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

