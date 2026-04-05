import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  name: string;
  type?: string;
  image?: string;
  url?: string;
  schema?: Record<string, any>;
}

export function SEO({ title, description, name, type = 'website', image, url, schema }: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      
      {/* Open Graph tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Structured Data (JSON-LD) for Google */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
