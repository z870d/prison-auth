export type NewsItem = {
  title: string;
  date: string;
  description: string;
  image: string;
  url: string;
};

const DEFAULT_NEWS_API =
  "https://api.spaceflightnewsapi.net/v4/articles/?limit=6&ordering=-published_at";

export async function fetchNews(): Promise<NewsItem[]> {
  const endpoint = process.env.NEWS_API_URL ?? DEFAULT_NEWS_API;

  const response = await fetch(endpoint, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Attempt to normalize common shapes (Spaceflight News API by default)
  const items: Array<Record<string, unknown>> = Array.isArray(data)
    ? (data as Array<Record<string, unknown>>)
    : Array.isArray((data as Record<string, unknown>).results)
      ? ((data as { results: Array<Record<string, unknown>> }).results)
      : [];

  const mapped = items
    .map((item) => {
      const date =
        (item.publishedAt as string | undefined) ??
        (item.published_at as string | undefined) ??
        (item.date as string | undefined) ??
        (item.createdAt as string | undefined) ??
        (item.created_at as string | undefined) ??
        new Date().toISOString();

      return {
        title: (item.title as string | undefined) ?? "Untitled",
        date,
        description:
          (item.description as string | undefined) ??
          (item.summary as string | undefined) ??
          "",
        image:
          (item.image as string | undefined) ??
          (item.imageUrl as string | undefined) ??
          (item.image_url as string | undefined) ??
          (item.thumbnail as string | undefined) ??
          (item.thumbnailUrl as string | undefined) ??
          (item.thumbnail_url as string | undefined) ??
          "",
        url:
          (item.url as string | undefined) ??
          (item.link as string | undefined) ??
          "#",
      } satisfies NewsItem;
    })
    .filter((item: NewsItem) => Boolean(item.title))
    .sort(
      (a: NewsItem, b: NewsItem) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    .slice(0, 6);

  return mapped;
}
