import { JsonFeed, JsonFeedItem } from "../jsonFeed.ts";
import * as QiitaFeed from "./qiita.ts";
import * as ZennFeed from "./zenn.ts";

export const fetchFeedError = new Error("Failed to fetch feed");

async function fetchQiitaFeed(): Promise<JsonFeedItem[]> {
  const res = await fetch(QiitaFeed.url);
  if (!res.ok) {
    throw fetchFeedError;
  }

  return QiitaFeed.parseFeedItem(await res.text());
}

async function fetchZennFeed(): Promise<JsonFeedItem[]> {
  const res = await fetch(ZennFeed.url);
  if (!res.ok) {
    throw fetchFeedError;
  }

  return ZennFeed.parseFeedItem(await res.text());
}

async function fetchFeedItems(): Promise<JsonFeedItem[]> {
  const [qiitaItem, zennItem] = await Promise.all([
    fetchQiitaFeed(),
    fetchZennFeed(),
  ]);

  return [...qiitaItem, ...zennItem].sort((a, b) => {
    if (a.date_published < b.date_published) return 1;
    if (a.date_published > b.date_published) return -1;
    return 0;
  });
}

export async function createFeed(): Promise<JsonFeed> {
  const feedItems = await fetchFeedItems();
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: "糖衣月餅のフィード",
    home_page_url: "https://dev.ts7m.net/",
    feed_url: "https://feed.ts7m.net/",
    language: "ja-JP",
    items: feedItems,
  } satisfies JsonFeed;
}
