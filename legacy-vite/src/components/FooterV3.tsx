import React from "react";
import LazyImage from "./LazyImage";

export const FooterV3 = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 pb-20 md:pb-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              <LazyImage
                src="/company-logo.webp"
                alt="Daami Event Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">
                Daami Event
              </h3>
              <p className="text-gray-400 text-sm">Event Management Company</p>
            </div>
          </div>
          
          {/* Tagline */}
          <div className="mb-6">
            <p className="text-lg text-gray-300 font-medium mb-2">
              Empowering Artists Nationwide
            </p>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Through creative competitions, recognition, and building a community of talented artists across India.
            </p>
          </div>
          
          {/* Divider */}
          <div className="w-24 h-px bg-gray-700 mx-auto mb-6"></div>
          
          {/* Copyright */}
          <div className="space-y-2">
            <p className="text-gray-300 font-medium">
              © 2025 Daami Event. All Rights Reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Proudly organizing India's premier art competitions since 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};