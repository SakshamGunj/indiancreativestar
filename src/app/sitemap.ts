import { MetadataRoute } from 'next';
import { hallOfFameData } from '@/data/hallOfFameWinners';
import { client } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.daamievent.com";
  
  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/hall-of-fame`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/rangkala-award`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/winterartroyale/halloffame`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/winterartroyale/wrapped`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  ];

  // 2. Hall of Fame Event Routes
  const hallOfFameRoutes = hallOfFameData.map((event) => ({
    url: `${baseUrl}/hall-of-fame/${event.eventId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3. Dynamic Blog Routes from Sanity
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current, _updatedAt }`);
    blogRoutes = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch Sanity posts", error);
  }

  return [...staticRoutes, ...hallOfFameRoutes, ...blogRoutes];
}
