"use client";

import { BlogCard } from "@/components/blog-card";
import BlurFade from "@/components/magicui/blur-fade";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpZA, Clock3, History, Notebook } from "lucide-react";
import { useMemo, useState } from "react";

type BlogPost = {
  slug: string;
  readingMinutes: number;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    tags?: string[];
  };
};

type SortOption = "newest" | "oldest" | "az" | "za";

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ElementType }[] = [
  { value: "newest", label: "En Güncel → En Eski", icon: Clock3 },
  { value: "oldest", label: "En Eski → En Güncel", icon: History },
  { value: "az", label: "A → Z", icon: ArrowDownAZ },
  { value: "za", label: "Z → A", icon: ArrowUpZA },
];

function sortPosts(posts: BlogPost[], sort: SortOption) {
  const sorted = [...posts];
  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.metadata.publishedAt).getTime() -
          new Date(b.metadata.publishedAt).getTime()
      );
    case "az":
      return sorted.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title, "tr"));
    case "za":
      return sorted.sort((a, b) => b.metadata.title.localeCompare(a.metadata.title, "tr"));
  }
}

const BLUR_FADE_DELAY = 0.04;

export function BlogPostList({ posts }: { posts: BlogPost[] }) {
  const [sort, setSort] = useState<SortOption>("newest");
  const sortedPosts = useMemo(() => sortPosts(posts, sort), [posts, sort]);

  if (posts.length === 0) {
    return (
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="text-center py-12">
          <Notebook className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
          <p className="text-neutral-500 font-medium">Yakında burada yazılar olacak.</p>
          <p className="text-neutral-400 text-sm mt-1">
            Yazılım geliştirme üzerine düşüncelerimi paylaşmaya yakında başlıyorum.
          </p>
        </div>
      </BlurFade>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
          <SelectTrigger className="w-[190px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
              <SelectItem key={value} value={value}>
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
    </div>
  );
}
