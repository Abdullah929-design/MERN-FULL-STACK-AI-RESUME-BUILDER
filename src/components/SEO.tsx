import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export const SEO: React.FC<SEOProps> = ({
  title = 'AI Resume Builder | Free Professional Resume Maker',
  description = 'Create professional resumes in minutes with our AI-powered resume builder. High-impact templates, ATS-friendly designs, and intelligent content suggestions.',
  keywords = 'AI resume builder, free resume maker, professional resume generator, ATS resume, resume generator, AI career tools',
  canonical = 'https://www.airesumes.online', // Replace with your actual domain
  ogTitle,
  ogDescription,
  ogImage = 'https://www.airesumes.online/og-image.png', // Replace with your actual OG image
  ogType = 'website',
  twitterHandle = '@airesumes',
  twitterCard = 'summary_large_image',
}) => {
  const siteTitle = title.includes('AI Resume Builder') ? title : `${title} | AI Resume Builder`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || siteTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="AI Resume Builder" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || siteTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Robot tags (ensuring no noindex) */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    </Helmet>
  );
};
