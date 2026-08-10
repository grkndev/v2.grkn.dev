import { ImageResponse } from "next/og";
import { OpenGraphImage } from "@/components/og-image";
import { getRegularFont, getBoldFont } from "@/lib/fonts";
import { sharedTitle, sharedImage } from "@/app/shared-metadata";
import { getBlogPosts, getPostMetadata } from "@/data/blog";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const alt = `${sharedTitle} - Blog`;
export const size = {
  width: sharedImage.width,
  height: sharedImage.height,
};
export const contentType = sharedImage.type;

export default async function Image({ params }) {
  const { slug } = await params;
  const post = await getPostMetadata(slug, "blog");
  const [regularFontData, boldFontData] = await Promise.all([
    getRegularFont(),
    getBoldFont(),
  ]);

  return new ImageResponse(
    (
      <OpenGraphImage
        title={post?.metadata.title ?? slug}
        description={post?.metadata.summary}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            <path d="M9 7h7" />
            <path d="M9 11h7" />
          </svg>
        }
      />
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: regularFontData,
          style: "normal",
          weight: 500,
        },
        {
          name: "Geist",
          data: boldFontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
