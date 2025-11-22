import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schemaData?: any;
}

export const SEO = ({ 
  title, 
  description, 
  keywords = "learn python, python programming, coding tutorials, web development, AI coding, machine learning",
  canonical,
  ogImage = "https://codehubmaster.lovable.app/favicon.png",
  schemaData
}: SEOProps) => {
  // Auto-generate canonical URL if not provided
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href.replace(/\/$/, '') // Remove trailing slash
    : 'https://codehubmaster.lovable.app';
  
  const canonicalUrl = canonical || currentUrl;
  
  // Default organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "CodeHubMaster",
    "description": "Free online platform for learning Python programming, web development, AI, and machine learning",
    "url": "https://codehubmaster.lovable.app",
    "logo": "https://codehubmaster.lovable.app/favicon.png",
    "sameAs": [
      "https://twitter.com/codehubmaster"
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="CodeHubMaster" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@codehubmaster" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Custom Schema.org JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};
