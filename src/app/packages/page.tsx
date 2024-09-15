import NpmIcon from "@/components/Icons/npm";
import BlurFade from "@/components/magicui/blur-fade";
import { getPackagePosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Packages",
  description: "Created packages for the community by myself.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function PackagesPage() {
  let posts = await getPackagePosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          Packages ({posts.length})
        </h1>
      </BlurFade>
      {posts.length > 0 ? (
        posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="flex flex-col space-y-1 mb-4 backdrop-blur-sm bg-zinc-200 dark:bg-zinc-900 rounded-xl p-4"
                href={`/packages/${post.slug}`}
              >
                <div className="w-full flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-black dark:text-white">
                    <div className="flex items-center justify-center bg-red-500 rounded-lg p-2">
                      <NpmIcon
                        color="#fff"
                        className="w-6 h-6 fill-white text-white"
                      />
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <p className="text-lg font-medium">
                        {post.metadata.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {post.metadata.version}
                      </p>
                    </div>
                  </div>
                  <p className="h-6 text-xs text-muted-foreground">
                    {post.metadata.summary}
                  </p>
                </div>
              </Link>
            </BlurFade>
          ))
      ) : (
        <p>No packages found.</p>
      )}
    </section>
  );
}
