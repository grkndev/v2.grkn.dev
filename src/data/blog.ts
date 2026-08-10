import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  version?: string;
};

type PostType = "blog" | "package";

function typeToDir(type: PostType) {
  return type === "blog" ? "content" : "docs";
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readPostFile(slug: string, type: PostType) {
  const filePath = path.join(process.cwd(), typeToDir(type), `${slug}.mdx`);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export const getPost = cache(async (slug: string, type: PostType) => {
  const source = readPostFile(slug, type);
  if (source === null) {
    return null;
  }
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata: metadata as Metadata,
    slug,
  };
});

export const getPostMetadata = cache(async (slug: string, type: PostType) => {
  const source = readPostFile(slug, type);
  if (source === null) {
    return null;
  }
  const { data: metadata } = matter(source);
  return {
    metadata: metadata as Metadata,
    slug,
  };
});

async function getAllPostsMetadata(dir: string, type: PostType) {
  const mdxFiles = getMDXFiles(dir);

  const posts = await Promise.all(
    mdxFiles.map((file) => {
      const slug = path.basename(file, path.extname(file));
      return getPostMetadata(slug, type);
    })
  );

  return posts.filter((post): post is NonNullable<typeof post> => post !== null);
}

export async function getBlogPosts() {
  return getAllPostsMetadata(path.join(process.cwd(), "content"), "blog");
}

export async function getPackagePosts() {
  return getAllPostsMetadata(path.join(process.cwd(), "docs"), "package");
}
