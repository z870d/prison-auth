import { NextResponse } from "next/server";
import { fetchNews } from "@/lib/fetchNews";

export async function GET() {
  try {
    const news = await fetchNews();
    return NextResponse.json(news);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch news";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
