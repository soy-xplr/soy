import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { bookmarks } from "../src/data/bookmarks";
import { defaultBookmarkDetails } from "../src/data/bookmarkDetails";

const SITE_URL = "https://soy-xplr.vercel.app";

type UrlEntry = {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: string;
};

const urls: UrlEntry[] = [{ path: "/", changefreq: "weekly", priority: "1.0" }];

for (const bookmark of bookmarks) {
  urls.push({
    path: `/bookmarks/${encodeURIComponent(bookmark.slug)}`,
    changefreq: "monthly",
    priority: "0.8",
  });

  const subProjects = defaultBookmarkDetails[bookmark.slug]?.subProjects ?? [];
  for (const subProject of subProjects) {
    if (!subProject.slug) continue;
    urls.push({
      path: `/bookmarks/${encodeURIComponent(bookmark.slug)}/${encodeURIComponent(subProject.slug)}`,
      changefreq: "monthly",
      priority: "0.6",
    });
  }
}

const body = urls
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outPath = resolve(import.meta.dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml);
console.log(`sitemap.xml generated with ${urls.length} URLs -> ${outPath}`);
