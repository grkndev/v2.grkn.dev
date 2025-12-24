import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import "./globals.css";
import GoogleAdsense from "@/components/Google/GoogleAdsense";
import { PageLoadingProvider } from "@/components/page-loading-provider";
import { DotPattern } from "@/components/magicui/dot-pattern";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  keywords: DATA.keywords,
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};
export const viewport = {
  themeColor: "white",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `
{
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "dateCreated": "2020-01-01T12:00:00-05:00",
      "dateModified": "2025-12-24T15:00:00-05:00",
      "mainEntity": {
        "@type": "Person",
        "name": "Gürkan Çiloğlu",
        "alternateName": "grkndev",
        "identifier": "grkndev",
        "interactionStatistic": [{
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/FollowAction",
          "userInteractionCount": 1
        },{
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": 5
        }],
        "agentInteractionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/WriteAction",
          "userInteractionCount": 347
        },
        "description": "Software Developer",
        "image": "https://www.grkn.dev/me.jpg",
        "hasPart": [{
    "@type": "Article",
    "headline": "Snowflake Id - npm package",
    "url": "https://grkn.dev/packages/snowflakeid",
    "datePublished": "2025-03-05T18:34:00Z",
    "author": { "@id": "#main-author", "url": "https://grkn.dev/", "name": "GrknDev" }
  },{
    "@type": "Article",
    "headline": "Mornius - npm package",
    "url": "https://grkn.dev/packages/mornius",
    "datePublished": "2023-10-18T18:34:00Z",
    "author": { "@id": "#main-author", "url": "https://grkn.dev/", "name": "GrknDev" }
  },{
    "@type": "Article",
    "headline": "Twitcher - npm package",
    "url": "https://grkn.dev/packages/twitcher",
    "datePublished": "2024-05-01T18:34:00Z",
    "author": { "@id": "#main-author", "url": "https://grkn.dev/", "name": "GrknDev" }
  },{
    "@type": "Article",
    "headline": "Branding - Portfolio",
    "url": "https://grkn.dev/branding",
    "datePublished": "2025-08-31T18:34:00Z",
    "author": { "@id": "#main-author", "url": "https://grkn.dev/", "name": "GrknDev" }
  }],
        "sameAs": [
          "https://www.grkn.dev/",
          "https://grkn.dev/"
        ]
      }
    }
`}} />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-5xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >

        <ThemeProvider attribute="class" defaultTheme="dark">

          <TooltipProvider delayDuration={0}>
            <PageLoadingProvider>
              <Navbar />
              {children}
            </PageLoadingProvider>
          </TooltipProvider>
        </ThemeProvider>

        <GoogleAdsense pId={DATA.gads} />
      </body>
    </html>
  );
}
