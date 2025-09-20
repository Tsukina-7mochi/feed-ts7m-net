export default {
  async fetch(req: Request): Promise<Response> {
    return new Response("Hello World");
  },
};
