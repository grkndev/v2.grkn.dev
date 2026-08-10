import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Notebook } from "lucide-react";
import Link from "next/link";
import { MagicCard } from "@/components/magicui/magic-card";

interface BlogCardProps {
  title: string;
  summary: string;
  publishedAt: string;
  readingMinutes: number;
  tags?: string[];
  slug: string;
  className?: string;
}

export function BlogCard({
  title,
  summary,
  publishedAt,
  readingMinutes,
  tags,
  slug,
  className,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className={cn("block group", className)}>
      <MagicCard
        className="p-5 cursor-pointer border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
        gradientColor="#2563eb15"
        gradientFrom="#2563eb"
        gradientTo="#7c3aed"
      >
        <div className="flex flex-col h-full gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 shadow-lg shadow-blue-500/20">
                <Notebook className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-blue-500 transition-colors">
                {title}
              </h3>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 flex-grow">
            {summary}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span>{formatDate(publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingMinutes} dk
            </span>
          </div>
        </div>
      </MagicCard>
    </Link>
  );
}
