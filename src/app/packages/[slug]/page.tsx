import { getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { extractHeadings, formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PackageSidebar } from "@/components/package-sidebar";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import { Calendar, ExternalLink, Package, Github, BookOpen } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = await getPost(slug, "package");

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
  } = post.metadata;
  let ogImage = `${DATA.url}/packages/${slug}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${DATA.url}/packages/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      creator: "@grkndev",
      site: "@grkndev",
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = await getPost(slug, "package");

  if (!post) {
    notFound();
  }

  // Extract headings from the content
  const headings = extractHeadings(post.source);

  // Add IDs to all headings in the HTML content
  let contentWithIds = post.source;
  headings.forEach(({ id, text }) => {
    const regex = new RegExp(`<h([1-6])[^>]*>(${text})<\/h\\1>`, "g");
    contentWithIds = contentWithIds.replace(regex, `<h$1 id="${id}">$2</h$1>`);
  });

  const installCommand = `npm install @grkndev/${slug}`;

  return (
    <section id="package">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: `${DATA.url}/packages/${post.slug}/opengraph-image`,
            url: `${DATA.url}/packages/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
            programmingLanguage: "TypeScript",
            codeRepository: `https://github.com/grkndev/${slug}`,
          }),
        }}
      />

      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/packages">Packages</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.metadata.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero Section */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left: Package Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/25">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-2xl lg:text-3xl tracking-tight text-neutral-900 dark:text-neutral-100">
                  {post.metadata.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  {post.metadata.version && (
                    <Badge variant="secondary" className="text-xs">
                      v{post.metadata.version}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    TypeScript
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-xl">
              {post.metadata.summary}
            </p>

            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <Suspense fallback={<span className="h-5" />}>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.metadata.publishedAt)}</span>
                </div>
              </Suspense>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="lg:w-80 space-y-4">
            {/* Install Command */}
            <div className="p-3 rounded-lg bg-neutral-900 dark:bg-black border border-neutral-800">
              <div className="flex items-center justify-between gap-2">
                <code className="text-sm text-green-400 font-mono truncate">
                  $ {installCommand}
                </code>
                <CopyButton text={installCommand} className="shrink-0 hover:bg-neutral-800" />
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              <Link
                href={`https://www.npmjs.com/package/@grkndev/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                <svg viewBox="0 0 780 250" className="w-5 h-5 fill-current">
                  <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z" />
                </svg>
                View on npm
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </Link>
              <Link
                href={`https://github.com/grkndev/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row lg:gap-12">
        <div className="flex-1 min-w-0">
          {/* Mobile TOC */}
          <div className="lg:hidden mb-6">
            <PackageSidebar headings={headings} />
          </div>

          {/* Documentation Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <BookOpen className="w-5 h-5 text-neutral-500" />
            <h2 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Documentation
            </h2>
          </div>

          {/* Article Content */}
          <article
            className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-20 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 max-w-none"
            dangerouslySetInnerHTML={{ __html: contentWithIds }}
          />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <PackageSidebar headings={headings} />
        </div>
      </div>
    </section>
  );
}
