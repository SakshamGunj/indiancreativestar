import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'cpmabg3p', // find this in sanity.config.ts
  dataset: 'production', // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // use a UTC date string
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
