import { siteConfig, contactInfo, services } from "@/data/content";

export default function JsonLd() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": [ "ProfessionalService", "Organization" ],
    "@id": `${ siteConfig.url }/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${ siteConfig.url }/logo2.png`,
    image: `${ siteConfig.url }/opengraph-image`,
    description: siteConfig.description,
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "E104 Technopark",
      addressLocality: "Essaouira",
      addressCountry: "MA",
    },
    sameAs: [
      contactInfo.linkedin,
      `https://wa.me/${ contactInfo.whatsapp }`,
    ].filter( Boolean ),
    areaServed: [
      {
        "@type": "Country",
        name: "Maroc",
      },
      {
        "@type": "Continent",
        name: "Europe",
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
      itemListElement: services.map( ( service, index ) => ( {
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          category: service.subtitle,
        },
      } ) ),
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${ siteConfig.url }/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${ siteConfig.url }/#organization`,
    },
    inLanguage: "fr-FR",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [ orgSchema, websiteSchema ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={ { __html: JSON.stringify( structuredData ) } }
      suppressHydrationWarning
    />
  );
}
