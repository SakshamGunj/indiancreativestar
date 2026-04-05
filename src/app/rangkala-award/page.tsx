import { Metadata } from "next";
import ClientPage from "./client-page";

export const metadata: Metadata = {
  title: "Rang Kala Award | India's #1 Zero-Hidden-Fee Art Competition",
  description: "Compete from home, win real Golden Trophies, and build worldwide authority as an artist. Strict 350 participant limit. Enter the Rang Kala Awards today.",
  openGraph: {
    title: "The Rang Kala Award",
    description: "The only art competition with zero delivery fees for winners. Strictly capped at 350 artists.",
    url: "https://www.daamievent.com/rangkala-award",
    images: [
      {
        url: "https://www.daamievent.com/Trophy_transparent.png",
        width: 800,
        height: 600,
        alt: "The Rang Kala Golden Trophy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Rang Kala Award",
    description: "Compete from home and win real Golden Trophies without hidden fees.",
    images: ["https://www.daamievent.com/Trophy_transparent.png"],
  },
};

export default function Page() {
  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Rang Kala Award",
    "description": "A prestigious national-level online art competition accepting wet medium, drawing, and digital art submissions.",
    "image": "https://www.daamievent.com/Trophy_transparent.png",
    "startDate": "2024-05-01T09:00", // Dynamic placeholder
    "endDate": "2024-12-31T23:59",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://www.daamievent.com/rangkala-award"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.daamievent.com/rangkala-award/register",
      "price": "599",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01T00:00"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Daami Event",
      "url": "https://www.daamievent.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
      />
      <ClientPage />
    </>
  );
}
