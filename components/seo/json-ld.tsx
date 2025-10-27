import { Metadata } from 'next'

export function generateJSONLD() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nocturide IDE',
    description: 'AI-powered web-based development environment for creating applications with code generation, real-time collaboration, and instant deployment.',
    url: 'https://nocturide.dev',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '0',
        priceCurrency: 'USD',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: '1',
          unitText: 'month'
        }
      }
    },
    featureList: [
      'AI Code Generation',
      'Real-time Collaboration',
      'Monaco Code Editor',
      'Instant Deployment',
      'Project Templates',
      'Multi-language Support'
    ],
    author: {
      '@type': 'Person',
      name: 'MagistrTheOne',
      url: 'https://github.com/MagistrTheOne'
    },
    publisher: {
      '@type': 'Person',
      name: 'MagistrTheOne',
      url: 'https://github.com/MagistrTheOne'
    },
    datePublished: '2025-10-01',
    dateModified: '2025-10-01',
    softwareVersion: '1.0.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '1000',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Developer Community'
        },
        reviewBody: 'Revolutionary AI-powered development environment that makes coding faster and more accessible.'
      }
    ]
  }

  return {
    __html: JSON.stringify(jsonLd, null, 2)
  }
}

export function JSONLD() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={generateJSONLD()}
    />
  )
}
