"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0.1 }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Clean up observer
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.package-sidebar-mobile') && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  if (headings.length === 0) {
    return null;
  }

  const currentHeading = headings.find(h => h.id === activeId)?.text || "İçindekiler";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-56 shrink-0 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto pr-4">
        <nav className="space-y-1">
          <p className="text-sm font-medium mb-3 text-neutral-500 dark:text-neutral-400">
            İçindekiler
          </p>
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToSection(heading.id)}
              className={cn(
                "text-sm block w-full text-left py-1 px-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                {
                  "bg-neutral-100 dark:bg-neutral-800 text-primary": activeId === heading.id,
                  "pl-4": heading.level === 2,
                  "pl-6": heading.level === 3,
                  "pl-8": heading.level >= 4,
                }
              )}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden w-full mb-6 package-sidebar-mobile">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-between w-full p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md"
        >
          <div className="flex items-center">
            <Menu className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium truncate max-w-[250px]">
              {currentHeading}
            </span>
          </div>
          {isMobileMenuOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white dark:bg-neutral-900 shadow-lg">
            <div className="p-1">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => scrollToSection(heading.id)}
                  className={cn(
                    "text-sm block w-full text-left py-2 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                    {
                      "bg-neutral-100 dark:bg-neutral-800 text-primary": activeId === heading.id,
                      "pl-5": heading.level === 2,
                      "pl-7": heading.level === 3,
                      "pl-9": heading.level >= 4,
                    }
                  )}
                >
                  {heading.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
} 