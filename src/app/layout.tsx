import type { Metadata } from "next";
import { Playfair_Display, Lato, Poppins, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import StructuredData from "@/components/seo/StructuredData";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const lato = Lato({ weight: ["300", "400", "700", "900"], subsets: ["latin"], variable: "--font-lato" });
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-poppins" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.daamievent.com"),
  title: {
    default: "Daami Event | India's Premier Art Stage & Hall of Fame",
    template: "%s | Daami Event"
  },
  description: "Daami Event is India's leading platform for artistic recognition. We curate national-level competitions, provide verified artist credentials, and celebrate the country's finest creators in our exclusive Hall of Fame.",
  keywords: ["Art Competition India", "Indian Creative Star", "Rang Kala Award", "Online Art Contest", "Artist Recognition India", "Sikkim Creative Star", "Winter Art Royale", "National Art Awards"],
  authors: [{ name: "Daami Event Team" }],
  creator: "Daami Event",
  publisher: "Daami Event",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/company-logo.webp",
    shortcut: "/company-logo.webp",
    apple: "/company-logo.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.daamievent.com",
    siteName: "Daami Event",
    title: "Daami Event | The Benchmark of Artistic Recognition",
    description: "National Art Competitions, Prestigious Awards, and Verified Artist Portfolios across all of India.",
    images: [
      {
        url: "https://res.cloudinary.com/dhvzfbhbe/image/upload/v1775290486/THE_Shakespeare_Poetry_Award_2025_1_-compressed_twejlf.webp",
        width: 1200,
        height: 630,
        alt: "Daami Event - India's Premier Art Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daami Event | India's Professional Art Stage",
    description: "Participate in national art contests and join the Hall of Fame.",
    images: ["https://res.cloudinary.com/dhvzfbhbe/image/upload/v1775290486/THE_Shakespeare_Poetry_Award_2025_1_-compressed_twejlf.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} ${poppins.variable} ${inter.variable}`}
    >
      <body className="min-h-full flex flex-col font-lato text-white bg-[#0F0F0F]">
        <Providers>
            <StructuredData />
            {children}
        </Providers>
      </body>
    </html>
  );
}
