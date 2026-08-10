import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Markdown from "react-markdown";
import { MagicCard } from "@/components/magicui/magic-card";
interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  active: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  active,
  className,
}: Props) {
  return (
    <Link href={href || "#"} className={cn("block cursor-pointer", className)} target="_blank">
      <MagicCard
        gradientColor="var(--magic-gradient)"
        className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full p-2 rounded-lg border-none"
      >
        {active && <Badge className="absolute m-2 right-0">Active</Badge>}
        <CardHeader className="px-2">
          <div className="space-y-1">
            <CardTitle className="mt-1 text-base">{title}</CardTitle>
            <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
              {description}
            </Markdown>
            <time className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">{dates}</time>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-2">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <Badge
                  className="px-1 py-0 text-[10px]"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </MagicCard>
    </Link>
  );
}
