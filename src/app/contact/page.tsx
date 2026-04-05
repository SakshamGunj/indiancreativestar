import { Metadata } from "next";
import ContactClient from "./client-page";

export const metadata: Metadata = {
  title: "Contact Us | Daami Event",
  description: "Get in touch with the Daami Event execution team. Support for registrations, partnerships, and general inquiries.",
  openGraph: {
    title: "Contact Daami Event",
    description: "Get in touch with the Daami Event execution team. We respond to all artist inquiries within 4 hours.",
    url: "https://www.daamievent.com/contact",
  },
};

export default function Page() {
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Daami Event",
    "description": "Contact page for India's premium art competition platform.",
    "url": "https://www.daamievent.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Daami Event",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-96359-08358",
        "contactType": "Customer Support",
        "email": "daamievent@gmail.com",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi"]
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <ContactClient />
    </>
  );
}
