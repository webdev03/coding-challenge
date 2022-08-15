import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    prerender: {
      default: true
    },
    paths: {
      base: process.env.PAGES_BUILDING === "enabled" ? "/coding-challenge" : ""
    },
    browser: {
      router: false
    },
    adapter: adapter()
  }
};

export default config;
