import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: string;
  schema?: Record<string, unknown>;
}

export function SEO({ title, description, canonical, ogImage, type = 'website', schema }: SEOProps) {
  const fullTitle = `${title} | ProPlumb USA`;
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://proplumb.com';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: 'ProPlumb USA',
    description: 'Professional plumbing services for residential and commercial properties.',
    url: siteUrl,
    telephone: '+15559117473',
    email: 'info@proplumb.com',
    address: { '@type': 'PostalAddress', streetAddress: '1234 Pipeline Avenue, Suite 100', addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77001', addressCountry: 'US' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', bestRating: '5', ratingCount: '500' },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '17:00' },
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="robots" content="index, follow" />
      <script type="application/ld+json">{JSON.stringify(schema || localBusinessSchema)}</script>
    </Helmet>
  );
}
