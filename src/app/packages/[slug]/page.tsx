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

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug, "package");

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
  } = post.metadata;
  let ogImage = `${DATA.url}/packages/${params.slug}/opengraph-image`;

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

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug, "package");

  if (!post) {
    notFound();
  }

  // Extract headings from the content
  const headings = extractHeadings(post.source);
  
  // Add IDs to all headings in the HTML content
  let contentWithIds = post.source;
  headings.forEach(({ id, text }) => {
    const regex = new RegExp(`<h([1-6])[^>]*>(${text})<\/h\\1>`, 'g');
    contentWithIds = contentWithIds.replace(regex, `<h$1 id="${id}">$2</h$1>`);
  });

  return (
    <section id="package">
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

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: `${DATA.url}/packages/${post.slug}/opengraph-image`,
            url: `${DATA.url}/packages/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      
      <div className="flex flex-col lg:flex-row lg:gap-12">
        <div className="flex-1 min-w-0">
          <div className="lg:hidden mb-4">
            <PackageSidebar headings={headings} />
          </div>
          
          <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
            {post.metadata.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
            <Suspense fallback={<p className="h-5" />}>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </Suspense>
          </div>
          <article
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: contentWithIds }}
          ></article>
        </div>
        
        <div className="hidden lg:block">
          <PackageSidebar headings={headings} />
        </div>
      </div>
    </section>
  );
}
