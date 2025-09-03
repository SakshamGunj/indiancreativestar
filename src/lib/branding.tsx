import React, { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

export type BrandingInfo = {
  brandName: string; // e.g., "Sikkim Creative Star" or "Indiancreativestar"
  regionName: string; // e.g., "Sikkim" or "India"
};

const BrandingContext = createContext<BrandingInfo>({ brandName: "Sikkim Creative Star", regionName: "Sikkim" });

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const branding = useMemo<BrandingInfo>(() => {
    const path = location.pathname.toLowerCase();
    if (path.startsWith("/indiancreativestar")) {
      return { brandName: "Indiancreativestar", regionName: "India" };
    }
    return { brandName: "Sikkim Creative Star", regionName: "Sikkim" };
  }, [location.pathname]);

  return (
    <BrandingContext.Provider value={branding}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => useContext(BrandingContext);

