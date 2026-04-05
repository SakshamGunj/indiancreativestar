import { Metadata } from "next";
import ClientPage from "./client-page";

export const metadata: Metadata = {
  title: "Daami Event | India's Premium Art Competitions",
  description: "Daami Event curates national-level art competitions, cultural events, and the most prestigious Hall of Fame for artists across India.",
  openGraph: {
    title: "Daami Event | India's Premium Art Competitions",
    description: "Join the largest online art competitions in India. Build authority, win real trophies without hidden fees, and secure your spot in our Hall of Fame.",
    url: "https://www.daamievent.com",
    siteName: "Daami Event",
    images: [
      {
        url: "https://www.daamievent.com/lovable-uploads/3b26f380-c74f-448d-a46c-6f0c07b063a6.png",
        width: 1200,
        height: 630,
        alt: "Daami Event Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daami Event | India's Premium Art Competitions",
    description: "Compete from home, win real golden trophies, and build worldwide authority as an artist.",
    images: ["https://www.daamievent.com/lovable-uploads/3b26f380-c74f-448d-a46c-6f0c07b063a6.png"],
  },
};

export default function Page() {
  // JSON-LD schema for Daami Event (Organization)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Daami Event",
    "url": "https://www.daamievent.com",
    "logo": "https://www.daamievent.com/lovable-uploads/3b26f380-c74f-448d-a46c-6f0c07b063a6.png",
    "description": "Daami Event curates premium national-level art competitions, cultural events, and the ultimate Hall of Fame for artists across India.",
    "sameAs": [
      "https://www.instagram.com/daamievent"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@daamievent.com",
      "contactType": "Customer Support"
    }
  };

  return (
    <>
      {/* Inject Generative AI Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Render the stunning Client UI */}
      <ClientPage />
    </>
  );
}
