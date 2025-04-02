"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import Image from "next/image";
import "./fonts.css";

export default function BrandingPage() {
  // Animation delay constant
  const BLUR_FADE_DELAY = 0.05;

  // Logo variations
  const logoVariations = [
    { src: "/assets/logo/gdev_logo_light.png", alt: "Light Logo", description: "Light Mode Logo", bg: "bg-foreground dark:bg-background" },
    { src: "/assets/logo/gdev_logo_dark.png", alt: "Dark Logo", description: "Dark Mode Logo", bg: "dark:bg-foreground" },
    { src: "/assets/logo/gdev_logo_white.png", alt: "White Logo", description: "White Logo", bg: "bg-foreground dark:bg-background" },
    { src: "/assets/logo/gdev_logo_black.png", alt: "Black Logo", description: "Black Logo", bg: "dark:bg-foreground" },
  ];

  // Text logo variations
  const textLogoVariations = [
    { src: "/assets/text/gdev_text_light.png", alt: "Light Text Logo", description: "Light Mode Text", bg: "bg-foreground dark:bg-background" },
    { src: "/assets/text/gdev_text_dark.png", alt: "Dark Text Logo", description: "Dark Mode Text", bg: "dark:bg-foreground" },
    { src: "/assets/text/gdev_text_white.png", alt: "White Text Logo", description: "White Text", bg: "bg-foreground dark:bg-background" },
    { src: "/assets/text/gdev_text_black.png", alt: "Black Text Logo", description: "Black Text", bg: "dark:bg-foreground" },
  ];

  // Text logo with dot variations
  const textLogoWithDotVariations = [
    { src: "/assets/text/gdev_text_black_with_dot.png", alt: "Black Text Logo with Dot", description: "Black Text with Dot", bg: "bg-background dark:bg-foreground" },
    { src: "/assets/text/gdev_text_white_with_dot.png", alt: "White Text Logo with Dot", description: "White Text with Dot", bg: "bg-foreground dark:bg-background" },
    { src: "/assets/text/gdev_text_dark_with_dot.png", alt: "Dark Text Logo with Dot", description: "Dark Text with Dot", bg: "dark:bg-foreground" },
  ];

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-12 py-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <section id="hero" className="px-4 md:px-6">
          <div className="mx-auto max-w-5xl space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex-col flex space-y-4">
                
                <h1 style={{fontFamily: "Quantify"}} className="text-3xl  sm:text-5xl">grkn.dev</h1>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Logo Guidelines</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl">
                  Official logo assets and usage guidelines
                </p>
              </div>
            </div>
          </div>
        </section>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <section id="logo" className="px-4 md:px-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <h2 className="text-2xl font-bold">Logo</h2>
            <Separator />
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Primary Logo</h3>
                <div className="grid grid-cols-2 gap-8">
                  {logoVariations.slice(0, 2).map((logo, index) => (
                    <div key={index} className="space-y-4">
                      <div className={`flex justify-center items-center w-full aspect-square sm:aspect-video ${logo.bg} border rounded-lg p-8`}>
                        <Image 
                          src={logo.src} 
                          alt={logo.alt}
                          width={200}
                          height={200}
                          className="max-h-full w-auto"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{logo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Alternative Logo Colors</h3>
                <div className="grid grid-cols-2 gap-8">
                  {logoVariations.slice(2, 4).map((logo, index) => (
                    <div key={index} className="space-y-4">
                      <div className={`flex justify-center items-center w-full aspect-square sm:aspect-video ${logo.bg} border rounded-lg p-8`}>
                        <Image 
                          src={logo.src} 
                          alt={logo.alt}
                          width={200}
                          height={200}
                          className="max-h-full w-auto"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{logo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Text Logo</h3>
                <div className="grid grid-cols-2 gap-8">
                  {textLogoVariations.slice(0, 2).map((logo, index) => (
                    <div key={index} className="space-y-4">
                      <div className={`flex justify-center items-center w-full aspect-square sm:aspect-video ${logo.bg} border rounded-lg p-8`}>
                        <Image 
                          src={logo.src} 
                          alt={logo.alt}
                          width={300}
                          height={100}
                          className="max-h-full w-auto"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{logo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Alternative Text Logo Colors</h3>
                <div className="grid grid-cols-2 gap-8">
                  {textLogoVariations.slice(2, 4).map((logo, index) => (
                    <div key={index} className="space-y-4">
                      <div className={`flex justify-center items-center w-full aspect-square sm:aspect-video ${logo.bg} border rounded-lg p-8`}>
                        <Image 
                          src={logo.src} 
                          alt={logo.alt}
                          width={300}
                          height={100}
                          className="max-h-full w-auto"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{logo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Text Logo with Accent</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {textLogoWithDotVariations.map((logo, index) => (
                    <div key={index} className="space-y-4">
                      <div className={`flex justify-center items-center h-32 ${logo.bg} border rounded-lg p-8`}>
                        <Image 
                          src={logo.src} 
                          alt={logo.alt}
                          width={300}
                          height={100}
                          className="max-h-full w-auto"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{logo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold">Logo Usage Guidelines</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Always maintain clear space around the logo (minimum 1x logo height)</li>
                <li>Do not distort, rotate, or alter the logo&apos;s proportions</li>
                <li>Do not apply filters, shadows, or effects to the logo</li>
                <li>Do not place the logo on visually busy backgrounds</li>
                <li>Use the light logo version on dark backgrounds and dark logo version on light backgrounds</li>
                <li>When using the text logo with accent dot, ensure the dot color remains consistent with brand colors</li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline">
                  <Link href="/assets/logo/base.psd" download>Download Logo Pack (PSD)</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <section id="typography" className="px-4 md:px-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <h2 className="text-2xl font-bold">Typography</h2>
            <Separator />
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Brand Font: Quantify</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex flex-col justify-center items-center h-64 bg-background border rounded-lg p-6">
                      <div style={{ fontFamily: 'Quantify' }} className="text-6xl mb-3">Quantify</div>
                      <div style={{ fontFamily: 'Quantify' }} className="text-xl">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                      <div style={{ fontFamily: 'Quantify' }} className="text-xl mt-2">abcdefghijklmnopqrstuvwxyz</div>
                      <div style={{ fontFamily: 'Quantify' }} className="text-xl mt-2">0123456789</div>
                    </div>
                    <p className="text-sm text-muted-foreground">Quantify Font - Regular</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-6 h-64 bg-background border rounded-lg p-6 justify-center">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Primary Use Cases:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                          <li>Brand logo</li>
                          <li>Headings and titles</li>
                          <li>Call-to-action buttons</li>
                          <li>Marketing materials</li>
                        </ul>
                      </div>
                      <div>
                        <Button asChild size="sm" variant="outline">
                          <Link href="/assets/Quantify.ttf" download>Download Quantify Font</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Typography Guidelines</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Use Quantify for headlines, titles, and brand identity elements</li>
                  <li>Maintain sufficient contrast between text and background</li>
                  <li>Keep text legible by using appropriate font sizes</li>
                  <li>Use consistent font styling throughout branded materials</li>
                  <li>Do not stretch or compress the font</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </BlurFade>
    </main>
  );
}

