"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function PageHeader() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/50 dark:border-neutral-800/50 bg-background/70 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto flex items-center justify-center px-6 py-4">
        <Link href="/">
          <Image
            src="/assets/text/gdev_text_dark.png"
            alt="grkndev"
            width={168}
            height={40}
            priority
            className="h-8 w-auto object-contain dark:hidden"
          />
          <Image
            src="/assets/text/gdev_text_light.png"
            alt="grkndev"
            width={168}
            height={40}
            priority
            className="hidden h-8 w-auto object-contain dark:block"
          />
        </Link>
      </div>
    </header>
  );
}
