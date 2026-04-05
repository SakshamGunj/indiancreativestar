import { Metadata } from 'next';
import WinterArtRoyaleWrappedClient from "./WrappedClient";

export const metadata: Metadata = {
  title: "Winter Art Royale 2026 - Wrapped",
  description: "Discover the journey, top artists, and amazing stats from India's most passionate art contest. 325 artists, 11,000 hours of creativity, and unforgettable masterpieces.",
  icons: {
    icon: "https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg",
    apple: "https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg",
  },
  openGraph: {
    title: "Winter Art Royale 2026 - Wrapped",
    description: "Discover the journey, top artists, and amazing stats from India's most passionate art contest.",
    images: [{ url: "https://i.ibb.co/5Pcjhz7/Daami-Presents1920x1080px1000x1000px.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Winter Art Royale 2026 - Wrapped",
    description: "Discover the journey, top artists, and amazing stats from India's most passionate art contest.",
    images: ["https://i.ibb.co/5Pcjhz7/Daami-Presents1920x1080px1000x1000px.jpg"],
  },
};

export default function WrappedPage() {
  return <WinterArtRoyaleWrappedClient />;
}
