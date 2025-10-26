import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afribit.africa';
const SITE_NAME = 'Afribit Africa';
const SITE_DESCRIPTION = 'Empowering Africa through Bitcoin education, financial inclusion, and community development. Join us in bringing financial freedom to African communities.';

export interface SEOConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path,
  image = '/images/og-default.jpg',
  type = 'website',
  keywords = [],
  noIndex = false,
}: SEOConfig): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  const defaultKeywords = [
    'Bitcoin',
    'Africa',
    'Bitcoin education',
    'financial inclusion',
    'cryptocurrency',
    'Uganda',
    'Bitcoin adoption',
    'financial freedom',
    'blockchain',
    'African development',
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords].join(', '),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AfribitAfrica',
      creator: '@AfribitAfrica',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

// JSON-LD Structured Data Helpers

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Afribit',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: SITE_DESCRIPTION,
    email: 'info@afribit.africa',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Uganda',
      addressRegion: 'Central Region',
    },
    sameAs: [
      'https://twitter.com/AfribitAfrica',
      'https://facebook.com/AfribitAfrica',
      'https://github.com/novyrix/Afribit-Africa',
    ],
    foundingDate: '2020',
    founders: [
      {
        '@type': 'Person',
        name: 'Afribit Team',
      },
    ],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getDonationSchema(programName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    recipient: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    description,
    name: `Donate to ${programName}`,
    url: `${SITE_URL}/donate`,
  };
}

export function getEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'Uganda',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate?: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image ? `${SITE_URL}${article.image}` : `${SITE_URL}/images/og-default.jpg`,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };
}
