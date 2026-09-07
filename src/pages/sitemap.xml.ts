import { getCollection } from "astro:content";
import type { BlogPost } from "../lib/blog";
import { sortPosts } from "../lib/blog";
import { CONTENT, LANGS } from "../i18n/content";

const SITE = "https://recepozgur.com";
const BUILD_DATE = new Date().toISOString().slice(0, 10);

// Every page file under src/pages/[lang]/. The brackets are escaped so the glob
// reads them as literal characters instead of a character class. Pages added
// later show up here on their own — no hand-maintained list to fall behind.
// Sources are pulled in raw purely to drop redirect-only stubs (e.g.
// [lang]/academic.astro, which 301s to /[lang]/academic-life/).
const langPageSources = import.meta.glob<string>("./\\[lang\\]/**/*.astro", {
  query: "?raw",
  import: "default",
  eager: true,
});

/** "./[lang]/about.astro" → "about/" · "work/index.astro" → "work/" · "index.astro" → "" */
const toRoute = (file: string) =>
  file
    .replace("./[lang]/", "")
    .replace(/\.astro$/, "")
    .replace(/(^|\/)index$/, "")
    .replace(/^(.+)$/, "$1/");

const routes = Object.entries(langPageSources)
  .filter(([, source]) => !source.includes("Astro.redirect"))
  .map(([file]) => toRoute(file))
  .sort();

// Dynamic project routes expand from the real slugs in src/i18n/content.ts.
const langUrls = LANGS.flatMap((lang) =>
  routes.flatMap((route) =>
    route.includes("[slug]")
      ? CONTENT[lang].projects.map(
          (project) => `/${lang}/${route.replace("[slug]", project.slug)}`,
        )
      : [`/${lang}/${route}`],
  ),
);

const postDate = (post: BlogPost) =>
  (post.data.updatedAt ?? post.data.publishedAt).toISOString().slice(0, 10);

export async function GET() {
  if (routes.length === 0) {
    throw new Error(
      "sitemap.xml: no page files matched src/pages/[lang]/**/*.astro — the glob pattern is broken, refusing to emit a sitemap missing every localised page.",
    );
  }

  const posts = sortPosts(await getCollection("blog", ({ data }) => !data.draft));

  const entries = [
    { loc: "/", lastmod: BUILD_DATE },
    ...langUrls.map((loc) => ({ loc, lastmod: BUILD_DATE })),
    { loc: "/blog/", lastmod: posts[0] ? postDate(posts[0]) : BUILD_DATE },
    ...posts.map((post) => ({
      loc: `/blog/${post.data.slug}/`,
      lastmod: postDate(post),
    })),
  ];

  const urls = entries.map(
    ({ loc, lastmod }) =>
      `<url><loc>${SITE}${loc}</loc><lastmod>${lastmod}</lastmod></url>`,
  );

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
