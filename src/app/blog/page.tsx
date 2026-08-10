import BlurFade from "@/components/magicui/blur-fade";
import { BlogCard } from "@/components/blog-card";
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
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

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
                {sortedPosts.length} {sortedPosts.length === 1 ? "post" : "posts"}
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

      {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedPosts.map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <BlogCard
                title={post.metadata.title}
                summary={post.metadata.summary}
                publishedAt={post.metadata.publishedAt}
                readingMinutes={post.readingMinutes}
                tags={post.metadata.tags}
                slug={post.slug}
              />
            </BlurFade>
          ))}
        </div>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="text-center py-12">
            <Notebook className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
            <p className="text-neutral-500 font-medium">Yakında burada yazılar olacak.</p>
            <p className="text-neutral-400 text-sm mt-1">
              Yazılım geliştirme üzerine düşüncelerimi paylaşmaya yakında başlıyorum.
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
