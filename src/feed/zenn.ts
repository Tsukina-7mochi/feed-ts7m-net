import * as v from "valibot";
import { XMLParser } from "fast-xml-parser";

import { JsonFeedItem } from "../jsonFeed.ts";

const RssFeedSchema = v.object({
  rss: v.object({
    channel: v.object({
      item: v.array(v.object({
        title: v.string(),
        description: v.string(),
        link: v.string(),
        guid: v.string(),
        pubDate: v.pipe(v.string(), v.transform((s) => new Date(s))),
      })),
    }),
  }),
});

export const url = "https://zenn.dev/tsukina_7mochi/feed";

const parser = new XMLParser();

export function parseFeedItem(body: string): JsonFeedItem[] {
  const { rss } = v.parse(RssFeedSchema, parser.parse(body));

  return rss.channel.item.map((item) => ({
    id: item.guid,
    url: item.link,
    title: item.title,
    content_text: item.description,
    date_published: item.pubDate.toISOString(),
    date_modified: item.pubDate.toISOString(),
    tags: ["zenn"],
  } satisfies JsonFeedItem));
}
