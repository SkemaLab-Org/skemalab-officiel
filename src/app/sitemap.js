import { siteConfig } from "@/data/content";

export default function sitemap() {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
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
      lastModified,
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
  ];
}
