import { ImageResponse } from "next/og";
import { OpenGraphImage } from "@/components/og-image";
import { getRegularFont, getBoldFont } from "@/lib/fonts";
import { sharedTitle, sharedImage } from "@/app/shared-metadata";
export const runtime = "edge";
export const alt = `${sharedTitle} - Packages`;
export const size = {
  width: sharedImage.width,
  height: sharedImage.height,
};
export const contentType = sharedImage.type;

export default async function Image({ params }) {
  const packageName = params.slug;
  const [regularFontData, boldFontData] = await Promise.all([
    getRegularFont(),
    getBoldFont(),
  ]);

  return new ImageResponse(
    (
      <OpenGraphImage
        title={packageName}
        description={"GrknDev's libraries published in npm"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 512 512"
          >
            <path d="M227.6 213.1H256v57.1h-28.4z" />
            <path d="M0 156v171.4h142.2V356H256v-28.6h256V156zm142.2 142.9h-28.4v-85.7H85.3v85.7H28.4V184.6h113.8zm142.2 0h-56.9v28.6h-56.9V184.6h113.8zm199.2 0h-28.4v-85.7h-28.4v85.7h-28.4v-85.7H370v85.7h-56.9V184.6h170.7v114.3z" />
          </svg>
        }
      />
    ),
    {
      ...size,
      fonts: [
        {
          name: "SF Pro",
          data: regularFontData,
          style: "normal",
          weight: 500,
        },
        {
          name: "SF Pro",
          data: boldFontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
