import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Car, ExternalLink, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { Button } from "./ui/button";

interface Props {
  title: string;
  href?: string;
  description: string;
  tags: readonly string[];
  image?: string;
  demoPage?: string;
  className?: string;
}

export function ShopCard({
  title,
  href,
  description,
  tags,
  image,
  demoPage,
  className,
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full p-2"
      }
    >
      {image && (
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="h-40 w-full overflow-hidden object-cover object-top"
        />
      )}
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
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
            {demoPage && (
              <Link href={demoPage}>
                <Badge className="px-1 py-0 text-[10px] bg-green-800 text-white">
                  Demo Page
                  <ExternalLinkIcon className="ml-1 h-4 w-4" />
                </Badge>
              </Link>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-2 flex justify-between items-center px-2 gap-x-3">
        <Link href={href || "#"} className="w-full">
          <Button className="w-full flex">Buy with Bionluk</Button>
        </Link>
        <Link
          href={`mailto:info@grkn.dev?subject=I want to buy a product&body=Hello, I saw a great product on your website and I want to buy it, what is the price? Product: ${title}.`}
          className="w-full"
        >
          <Button className="w-full flex flex-col">Contact by mail </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
