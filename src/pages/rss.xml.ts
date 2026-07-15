import { getCollection } from "astro:content";
import { sortPosts } from "../lib/blog";

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] ?? character);

export async function GET() {
  const posts = sortPosts(await getCollection("blog", ({ data }) => !data.draft));
  const items = posts.map((post) => {
    const url = `https://recepozgur.com/blog/${post.data.slug}/`;
    return `<item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>
    </item>`;
  }).join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Recep Özgür Mıh — Teknik Blog</title>
    <link>https://recepozgur.com/blog/</link>
    <description>Mobil, backend, API, AI ürünleri ve yazılım mimarisi üzerine kaynaklı teknik notlar.</description>
    <language>tr-TR</language>
    ${items}
  </channel>
</rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
