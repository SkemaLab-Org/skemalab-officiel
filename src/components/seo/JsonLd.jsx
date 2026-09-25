import { siteConfig, contactInfo, services } from "@/data/content";

export default function JsonLd() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    image: `${siteConfig.url}/opengraph-image`,
    description: siteConfig.description,
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: contactInfo.locations[0] || "Essaouira",
      addressCountry: contactInfo.locations[1] === "Maroc" ? "MA" : "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.5085,
      longitude: -9.7595,
    },
    sameAs: [
      contactInfo.linkedin,
      `https://wa.me/${contactInfo.whatsapp}`,
    ].filter(Boolean),
    priceRange: "$$",
    currenciesAccepted: "EUR, MAD, USD",
    paymentAccepted: "Virement bancaire, Carte bancaire",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Maroc",
      },
      {
        "@type": "Country",
        name: "France",
      },
      {
        "@type": "Continent",
        name: "Europe",
      },
      {
        "@type": "AdministrativeArea",
        name: "MENA",
      },
    ],
    knowsAbout: [
      "Développement Web",
      "Next.js",
      "React",
      "Digital Marketing",
      "SEO",
      "SEA",
      "Automatisation de workflows",
      "n8n",
      "Make",
      "Intégration d'IA",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Skemalab",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          category: service.subtitle,
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
          },
        },
      })),
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "fr-FR",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [orgSchema, websiteSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      suppressHydrationWarning
    />
  );
}
