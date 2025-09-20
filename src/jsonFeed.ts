export type JsonFeed = {
  version: "https://jsonfeed.org/version/1.1";
  title: string;
  home_page_url: string;
  feed_url: string;
  language: string;
  items: JsonFeedItem[];
};

export type JsonFeedItem = {
  id: string;
  url: string;
  title: string;
  content_text: string;
  date_published: string;
  date_modified: string;
  tags?: string[];
};
