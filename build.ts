import * as esbuild from "esbuild";
import { denoPlugin } from "@deno/esbuild-plugin";

await esbuild.build({
  entryPoints: ["src/mod.ts"],
  outfile: "dist/server.js",
  format: "esm",
  bundle: true,
  minify: true,
  treeShaking: true,
  plugins: [denoPlugin()],
});

await esbuild.stop();
