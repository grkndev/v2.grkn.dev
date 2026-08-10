import fs from "fs";
import matter from "gray-matter";
import type { Element, Root } from "hast";
import { toString as hastToString } from "hast-util-to-string";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

import { mdxComponents } from "@/components/mdx-components";

export type Heading = {
  id: string;
  text: string;
  level: number;
};

function collectHeadings(headings: Heading[]) {
  return () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const match = /^h([1-6])$/.exec(node.tagName);
      if (!match) return;
      const id = node.properties?.id;
      if (typeof id !== "string") return;
      headings.push({
        id,
        text: hastToString(node),
        level: Number(match[1]),
      });
    });
  };
}

export async function getBlogPostContent(slug: string) {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  let source: string;
  try {
    source = fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }

  const { content: rawContent } = matter(source);
  const headings: Heading[] = [];

  const { content } = await compileMDX({
    source: rawContent,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          collectHeadings(headings),
          [
            rehypePrettyCode,
            {
              theme: {
                light: "min-light",
                dark: "min-dark",
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  return { content, headings };
}
