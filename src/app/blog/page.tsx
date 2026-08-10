import BlurFade from "@/components/magicui/blur-fade";
import { BlogPostList } from "@/components/blog-post-list";
import { getBlogPosts } from "@/data/blog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Notebook, Rss } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
  alternates: {
    types: {
      "application/rss+xml": "/blog/feed.xml",
    },
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="min-h-screen">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center justify-between gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 shadow-lg shadow-blue-500/25">
              <Notebook className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-3xl tracking-tight text-neutral-900 dark:text-neutral-100">
                Blog
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </p>
            </div>
          </div>
          <Link
            href="/blog/feed.xml"
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-orange-500 transition-colors"
          >
            <Rss className="w-3.5 h-3.5" />
            RSS
          </Link>
        </div>
      </BlurFade>

      <BlogPostList posts={posts} />
    </section>
  );
}
