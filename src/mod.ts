import { createFeed, fetchFeedError } from "./feed/mod.ts";

export default {
  async fetch(req) {
    if (req.method !== "GET") {
      return new Response("Method Not Allowed: Only GET method allowed.", {
        status: 405,
      });
    }

    const accepts = (req.headers.get("accept") ?? "*/*")
      .split(",")
      .map((s) => s.trim());
    if (!(accepts.includes("application/json") || accepts.includes("*/*"))) {
      return new Response(
        "Unsupported Type: Only application/json content type supported.",
        { status: 406 },
      );
    }

    try {
      const feed = await createFeed();

      return new Response(JSON.stringify(feed), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      if (e === fetchFeedError) {
        return new Response("Failed to fetch feed", { status: 502 });
      }
      console.error(e);

      return new Response("Internal Server Error", { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
