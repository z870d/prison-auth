"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/fetchNews";
import NewsCard from "./NewsCard";
import NewsSkeleton from "@/app/components/ui/NewsSkeleton";

export default function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadNews() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/news", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load news");

      const data = (await response.json()) as NewsItem[];
      setNews(data.slice(0, 6));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to fetch news right now."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Latest News</h2>
          <p className="text-sm text-gray-500">Stay up to date with the newest updates.</p>
        </div>

        {/* Refresh button */}
        {!loading && !error && (
          <button
            onClick={loadNews}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
          >
            Refresh
          </button>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && <NewsSkeleton count={6} />}

      {/* Error Message */}
      {!loading && error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Grid of News */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {news.map((item) => (
            <NewsCard key={`${item.title}-${item.date}`} {...item} />
          ))}
        </div>
      )}
    </section>
  );
}
