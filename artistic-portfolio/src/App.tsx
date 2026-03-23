/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { AdminSidebar } from './components/AdminSidebar';
import { PublicPortfolio } from './pages/PublicPortfolio';
import { WorkDetails } from './pages/WorkDetails';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminWorks } from './pages/AdminWorks';
import { AdminProfile } from './pages/AdminProfile';
import { CustomCursor } from './components/CustomCursor';

function PublicLayout() {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-bg flex">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 md:ml-64 min-h-screen overflow-y-auto w-full pt-16 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
        <PortfolioProvider>
          <Router>
            <Routes>
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<PublicPortfolio />} />
                <Route path="work/:id" element={<WorkDetails />} />
              </Route>
              
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="works" element={<AdminWorks />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>
            </Routes>
          </Router>
        </PortfolioProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
