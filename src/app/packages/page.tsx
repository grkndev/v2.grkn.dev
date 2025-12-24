import BlurFade from "@/components/magicui/blur-fade";
import { getPackagePosts } from "@/data/blog";
import { PackageCard } from "@/components/package-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Package, Sparkles } from "lucide-react";

export const metadata = {
  title: "Packages",
  description: "Open source npm packages created for the developer community.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function PackagesPage() {
  const posts = await getPackagePosts();

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return (
    <section className="min-h-screen">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Packages</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero Section */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/25">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-3xl tracking-tight text-neutral-900 dark:text-neutral-100">
                Packages
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {posts.length} open source package
              </p>
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Open source npm packages I created for the developer community.
            Each one comes production-ready with TypeScript support.
          </p>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex flex-wrap gap-6 mb-10 p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">{posts.length}</span> Packages
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Active development
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">MIT</span> License
            </span>
          </div>
        </div>
      </BlurFade>

      {/* Package Grid */}
      {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedPosts.map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.slug}>
              <PackageCard
                title={post.metadata.title}
                summary={post.metadata.summary}
                version={post.metadata.version}
                publishedAt={post.metadata.publishedAt}
                slug={post.slug}
              />
            </BlurFade>
          ))}
        </div>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
            <p className="text-neutral-500">No packages yet.</p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
