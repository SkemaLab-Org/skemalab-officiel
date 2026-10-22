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
      url: `${ baseUrl }/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${ baseUrl }/about`,
          "x-default": `${ baseUrl }/about`,
        },
      },
      images: [
        `${ baseUrl }/opengraph-image`,
      ],
    },
  ];
}
