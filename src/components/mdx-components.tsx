import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

const calloutStyles = {
  note: {
    icon: Info,
    className: "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/30 bg-yellow-500/5 text-yellow-700 dark:text-yellow-300",
  },
  tip: {
    icon: Lightbulb,
    className: "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-300",
  },
} as const;

function Callout({
  type = "note",
  children,
}: {
  type?: keyof typeof calloutStyles;
  children: React.ReactNode;
}) {
  const { icon: Icon, className } = calloutStyles[type];
  return (
    <div
      className={cn(
        "not-prose flex items-start gap-3 rounded-lg border px-4 py-3 my-4 text-sm",
        className
      )}
    >
      <Icon className="size-4 shrink-0 mt-0.5" />
      <div className="prose-sm dark:prose-invert [&>p]:m-0">{children}</div>
    </div>
  );
}

function MDXImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  if (!props.src || typeof props.src !== "string") return null;
  return (
    <Image
      {...(props as unknown as ImageProps)}
      src={props.src}
      alt={props.alt ?? ""}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto rounded-lg"
    />
  );
}

function MDXLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "#";
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return <a {...props} target="_blank" rel="noopener noreferrer" />;
  }
  return <Link {...props} href={href} />;
}

export const mdxComponents: MDXRemoteProps["components"] = {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Callout,
  img: MDXImage,
  a: MDXLink,
};
