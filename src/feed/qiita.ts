import * as v from "valibot";
import { XMLParser } from "fast-xml-parser";

import { JsonFeedItem } from "../jsonFeed.ts";

const RssFeedSchema = v.object({
  feed: v.object({
    entry: v.array(v.object({
      id: v.string(),
      published: v.pipe(v.string(), v.isoTimestamp()),
      updated: v.pipe(v.string(), v.isoTimestamp()),
      url: v.string(),
      title: v.string(),
      content: v.string(),
    })),
  }),
});

export const url = "https://qiita.com/Tsukina_7mochi/feed";

const parser = new XMLParser();

export function parseFeedItem(body: string): JsonFeedItem[] {
  const { feed } = v.parse(RssFeedSchema, parser.parse(body));

  return feed.entry.map((item) => ({
    id: item.id,
    url: item.url,
    title: item.title,
    content_text: item.content,
    date_published: item.published,
    date_modified: item.updated,
    tags: ["qiita"],
  } satisfies JsonFeedItem));
}
