import { getBlogPosts, getPostMetadata } from "@/data/blog";
import { getBlogPostContent } from "@/data/blog-content";
import { DATA } from "@/data/resume";
import { PostDate } from "@/components/relative-date";
import { TocSidebar } from "@/components/toc-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMetadata(slug, "blog");

  if (!post) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const url = `${DATA.url}/blog/${slug}`;
  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/blog/${slug}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, compiled] = await Promise.all([
    getPostMetadata(slug, "blog"),
    getBlogPostContent(slug),
  ]);

  if (!post || !compiled) {
    notFound();
  }

  const { metadata, readingMinutes } = post;
  const { content, headings } = compiled;
  const url = `${DATA.url}/blog/${slug}`;
  const ogImage = metadata.image
    ? `${DATA.url}${metadata.image}`
    : `${url}/opengraph-image`;

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: metadata.title,
              datePublished: metadata.publishedAt,
              dateModified: metadata.updatedAt ?? metadata.publishedAt,
              description: metadata.summary,
              image: ogImage,
              url,
              author: {
                "@type": "Person",
                name: DATA.name,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: DATA.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: `${DATA.url}/blog`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: metadata.title,
                  item: url,
                },
              ],
            },
          ]),
        }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Blog&apos;a Dön
      </Link>

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{metadata.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {metadata.title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2 mb-6 text-sm max-w-[650px]">
        <PostDate
          date={metadata.publishedAt}
          className="text-sm text-neutral-600 dark:text-neutral-400"
        />
        <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-500">
          <Clock className="w-3.5 h-3.5" />
          {readingMinutes} dk okuma
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          {metadata.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/me.jpg" />
          <AvatarFallback>GÇ</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Yazar</span>
          <span className="text-sm font-medium">Gürkan Çiloğlu</span>
        </div>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800 my-6 rounded-full" />
      <div className="flex flex-col lg:flex-row lg:gap-12">
        <div className="flex-1 min-w-0">
          <div className="lg:hidden mb-6">
            <TocSidebar headings={headings} />
          </div>
          <article className="prose dark:prose-invert prose-headings:scroll-mt-20 max-w-none">
            {content}
          </article>

          <Link
            href="/blog"
            className="w-full flex flex-row justify-center items-center gap-1.5 mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-500 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="">Blog&apos;a Dön</span>
          </Link>
        </div>

        <div className="hidden lg:block">
          <TocSidebar headings={headings} />
        </div>
      </div>
    </section>
  );
}
