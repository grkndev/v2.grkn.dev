"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, List, Circle } from "lucide-react";

interface PackageSidebarProps {
  headings: Array<{
    id: string;
    text: string;
    level: number;
  }>;
}

export function PackageSidebar({ headings }: PackageSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".package-sidebar-mobile") && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsMobileMenuOpen(false);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  const currentHeading = headings.find((h) => h.id === activeId)?.text || "Table of Contents";
  const activeIndex = headings.findIndex((h) => h.id === activeId);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-hidden">
        <div className="relative">
          {/* Progress bar */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-red-500 to-orange-500 transition-all duration-150"
              style={{ height: `${progress}%` }}
            />
          </div>

          <nav className="pl-4">
            <div className="flex items-center gap-2 mb-4">
              <List className="w-4 h-4 text-neutral-500" />
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                On this page
              </p>
              <span className="text-xs text-neutral-400 ml-auto">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-12rem)] pr-2 scrollbar-thin">
              {headings.map((heading, index) => {
                const isActive = activeId === heading.id;
                const isPast = index < activeIndex;

                return (
                  <button
                    key={heading.id}
                    onClick={() => scrollToSection(heading.id)}
                    className={cn(
                      "group flex items-start gap-2 w-full text-left py-1.5 px-2 rounded-lg text-sm transition-all duration-200",
                      {
                        "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-medium": isActive,
                        "text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800": !isActive,
                        "text-neutral-400 dark:text-neutral-600": isPast && !isActive,
                      }
                    )}
                  >
                    <span
                      className={cn("shrink-0 mt-1.5 transition-all duration-200", {
                        "pl-0": heading.level === 1,
                        "pl-2": heading.level === 2,
                        "pl-4": heading.level === 3,
                        "pl-6": heading.level >= 4,
                      })}
                    >
                      <Circle
                        className={cn("w-1.5 h-1.5 transition-all duration-200", {
                          "fill-red-500 text-red-500 scale-125": isActive,
                          "fill-neutral-300 text-neutral-300 dark:fill-neutral-600 dark:text-neutral-600": !isActive && !isPast,
                          "fill-neutral-400 text-neutral-400 dark:fill-neutral-500 dark:text-neutral-500": isPast && !isActive,
                        })}
                      />
                    </span>
                    <span className="leading-tight">{heading.text}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden w-full package-sidebar-mobile">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-between w-full p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-all hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
              <List className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xs text-neutral-500 block">On this page</span>
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate max-w-[200px] block">
                {currentHeading}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">{Math.round(progress)}%</span>
            {isMobileMenuOpen ? (
              <ChevronUp className="h-5 w-5 text-neutral-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-neutral-500" />
            )}
          </div>
        </button>

        {isMobileMenuOpen && (
          <div className="absolute z-20 left-0 right-0 mt-2 mx-4 max-h-72 overflow-auto rounded-xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-800">
            {/* Progress indicator */}
            <div className="sticky top-0 h-1 bg-neutral-100 dark:bg-neutral-800">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-2">
              {headings.map((heading, index) => {
                const isActive = activeId === heading.id;
                const isPast = index < activeIndex;

                return (
                  <button
                    key={heading.id}
                    onClick={() => scrollToSection(heading.id)}
                    className={cn(
                      "flex items-center gap-2 w-full text-left py-2.5 px-3 rounded-lg text-sm transition-all",
                      {
                        "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-medium": isActive,
                        "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800": !isActive,
                        "text-neutral-400 dark:text-neutral-600": isPast && !isActive,
                      }
                    )}
                  >
                    <Circle
                      className={cn("w-2 h-2 shrink-0", {
                        "fill-red-500 text-red-500": isActive,
                        "fill-neutral-300 text-neutral-300 dark:fill-neutral-600 dark:text-neutral-600": !isActive,
                      })}
                    />
                    <span
                      className={cn("truncate", {
                        "pl-0": heading.level === 1,
                        "pl-2": heading.level === 2,
                        "pl-4": heading.level === 3,
                        "pl-6": heading.level >= 4,
                      })}
                    >
                      {heading.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
