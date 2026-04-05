import React from 'react';

const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Daami Event",
    "url": "https://www.daamievent.com",
    "logo": "https://res.cloudinary.com/dhvzfbhbe/image/upload/v1775321998/Rang_Kala_Logo_4_-compressed_at7c5d.webp",
    "sameAs": [
      "https://www.instagram.com/daamievent/",
      "https://www.facebook.com/daamievent"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "English"
    },
    "description": "India's premier art recognition platform curating national-level competitions like Indian Creative Star and Rang Kala Award."
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Daami Event",
    "url": "https://www.daamievent.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.daamievent.com/gallery?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

export default StructuredData;
