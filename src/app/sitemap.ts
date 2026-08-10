import { getBlogPosts, getPackagePosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, packagePosts] = await Promise.all([
    getBlogPosts(),
    getPackagePosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: DATA.url,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${DATA.url}/branding`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${DATA.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${DATA.url}/packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${DATA.url}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt ?? post.metadata.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const packageRoutes: MetadataRoute.Sitemap = packagePosts.map((post) => ({
    url: `${DATA.url}/packages/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt ?? post.metadata.publishedAt),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...packageRoutes];
}
