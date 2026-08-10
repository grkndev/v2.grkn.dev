import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const normalized = date.includes("T") ? date : `${date}T00:00:00`;
  return new Date(normalized).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function estimateReadingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function extractHeadings(html: string) {
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/g;
  const headings: { id: string; text: string; level: number }[] = [];
  
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]*>/g, ''); // Remove any HTML tags inside the heading
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''); // Create an ID from the text
    
    headings.push({ id, text, level });
  }
  
  return headings;
}
