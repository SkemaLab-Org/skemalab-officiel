import { siteConfig } from "@/data/content";
import { getBlogSitemapEntries } from "@/lib/blog/sitemap";

export const revalidate = 60;

export default async function sitemap() {
  const baseUrl = siteConfig.url;
  const blogEntries = await getBlogSitemapEntries();

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          fr: baseUrl,
          "x-default": baseUrl,
        },
      },
      images: [
        `${ baseUrl }/opengraph-image`,
        `${ baseUrl }/favicon.ico`,
      ],
    },
    {
      url: `${ baseUrl }/our-story`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${ baseUrl }/our-story`,
          "x-default": `${ baseUrl }/our-story`,
        },
      },
      images: [
        `${ baseUrl }/opengraph-image`,
      ],
    },
    ...blogEntries,
  ];
}
