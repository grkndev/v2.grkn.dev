"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { LoadingSpinner } from "./ui/loading-spinner";

interface PageLoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const PageLoadingContext = createContext<PageLoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const usePageLoading = () => useContext(PageLoadingContext);

export function PageLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathnameRef = useRef(pathname);
  const prevSearchParamsRef = useRef(searchParams);
  const isFirstRender = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Skip the first render to avoid showing loading on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathnameRef.current = pathname;
      prevSearchParamsRef.current = searchParams;
      return;
    }

    // Convert searchParams to string for comparison
    const currentSearchParamsString = searchParams.toString();
    const prevSearchParamsString = prevSearchParamsRef.current.toString();

    // If the route is changing (but not on first render)
    if (pathname !== prevPathnameRef.current || currentSearchParamsString !== prevSearchParamsString) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set loading to true
      setIsLoading(true);
      
      // Then set loading to false after a short delay
      timerRef.current = setTimeout(() => {
        setIsLoading(false);
        timerRef.current = null;
      }, 500);
      
      // Save current values
      prevPathnameRef.current = pathname;
      prevSearchParamsRef.current = searchParams;
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname, searchParams]);

  return (
    <PageLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
          <LoadingSpinner size={48} className="text-primary" />
        </div>
      )}
    </PageLoadingContext.Provider>
  );
}

// This component can be used to manually trigger loading state
export function PageLoadingTrigger({
  loading,
}: {
  loading: boolean;
}) {
  const { setIsLoading } = usePageLoading();
  
  useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);
  
  return null;
} 