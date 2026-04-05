import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'cpmabg3p',
  dataset: 'production',
  useCdn: false,         // direct API instead of CDN — fixes CORS on localhost
  apiVersion: '2023-05-03',
  perspective: 'published',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
