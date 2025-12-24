"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import { MagicCard } from "@/components/magicui/magic-card";

interface PackageCardProps {
  title: string;
  summary: string;
  version?: string;
  publishedAt: string;
  slug: string;
  className?: string;
}

export function PackageCard({
  title,
  summary,
  version,
  publishedAt,
  slug,
  className,
}: PackageCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/packages/${slug}`} className={cn("block group", className)}>
      <MagicCard
        className="p-5 cursor-pointer border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
        gradientColor="#dc262615"
        gradientFrom="#dc2626"
        gradientTo="#f97316"
      >
        <div className="flex flex-col h-full gap-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/20">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-red-500 transition-colors">
                  {title}
                </h3>
                {version && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 mt-1">
                    v{version}
                  </Badge>
                )}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 flex-grow">
            {summary}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </MagicCard>
    </Link>
  );
}
