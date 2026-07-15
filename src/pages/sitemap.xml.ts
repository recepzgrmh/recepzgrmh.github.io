import { getCollection } from "astro:content";
import { sortPosts } from "../lib/blog";

const staticPaths = [
  "/", "/tr/", "/tr/about/", "/tr/academic-life/", "/tr/chat/", "/tr/contact/", "/tr/labs/", "/tr/skills/",
  "/en/", "/en/about/", "/en/academic-life/", "/en/chat/", "/en/contact/", "/en/labs/", "/en/skills/", "/blog/",
];

export async function GET() {
  const posts = sortPosts(await getCollection("blog", ({ data }) => !data.draft));
  const staticUrls = staticPaths.map((path) => `<url><loc>https://recepozgur.com${path}</loc></url>`);
  const postUrls = posts.map((post) => `<url><loc>https://recepozgur.com/blog/${post.data.slug}/</loc><lastmod>${(post.data.updatedAt ?? post.data.publishedAt).toISOString().slice(0, 10)}</lastmod></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].join("\n")}
</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
