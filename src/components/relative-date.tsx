"use client";

import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";

type Relative = { label: string; replaceAbsolute: boolean };

function getRelative(date: string): Relative {
  const currentDate = new Date().getTime();
  const normalized = date.includes("T") ? date : `${date}T00:00:00`;
  const targetDate = new Date(normalized).getTime();
  const daysAgo = Math.floor(Math.abs(currentDate - targetDate) / (1000 * 60 * 60 * 24));

  if (daysAgo < 1) return { label: "Today", replaceAbsolute: true };
  if (daysAgo < 7) return { label: `${daysAgo}d ago`, replaceAbsolute: false };
  if (daysAgo < 30) return { label: `${Math.floor(daysAgo / 7)}w ago`, replaceAbsolute: false };
  if (daysAgo < 365) return { label: `${Math.floor(daysAgo / 30)}mo ago`, replaceAbsolute: false };
  return { label: `${Math.floor(daysAgo / 365)}y ago`, replaceAbsolute: false };
}

export function PostDate({ date, className }: { date: string; className?: string }) {
  const [relative, setRelative] = useState<Relative | null>(null);

  useEffect(() => {
    setRelative(getRelative(date));
  }, [date]);

  const absolute = formatDate(date);

  return (
    <span className={className}>
      {relative?.replaceAbsolute ? relative.label : absolute}
      {relative && !relative.replaceAbsolute ? ` (${relative.label})` : ""}
    </span>
  );
}
