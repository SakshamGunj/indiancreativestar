import { Metadata } from 'next';
import { client, urlFor } from "@/lib/sanity";
import BlogClient from "./BlogClient";
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      metaDescription,
      mainImage
    }`,
    { slug: params.slug }
  );

  if (!post) {
    return {
      title: "Article Not Found | Daami Event",
    };
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).url() : "";

  return {
    title: `${post.title} | Daami Event Journal`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id
    }`,
    { slug: params.slug }
  );

  if (!post) {
    notFound();
  }

  return <BlogClient />;
}

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current }`);
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}
