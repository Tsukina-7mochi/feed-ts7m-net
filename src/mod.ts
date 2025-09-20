export default {
  async fetch(req) {
    return new Response("Hello World");
  },
} satisfies ExportedHandler<Env>;
