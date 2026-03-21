import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schemaData?: any;
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  faqData?: Array<{
    question: string;
    answer: string;
  }>;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  isAIContent?: boolean;
  noIndex?: boolean;
}

export const SEO = ({ 
  title, 
  description, 
  keywords = "AI coding assistant, AI programming help, artificial intelligence coding, machine learning tutorials, AI code generator, GPT coding, AI developer tools, automated coding, intelligent programming assistant",
  canonical,
  ogImage = "https://codehubmaster.site/favicon.png",
  schemaData,
  articleData,
  faqData,
  breadcrumbs,
  isAIContent = true,
  noIndex = false
}: SEOProps) => {
  // Auto-generate canonical URL if not provided
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href.replace(/\/$/, '') // Remove trailing slash
    : 'https://codehubmaster.site';
  
  const canonicalUrl = canonical || currentUrl;
  
  // Simple WebSite schema - educational content focus
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CodeHubMaster",
    "url": "https://codehubmaster.site/",
    "description": "Learn coding with AI-powered tutorials"
  };

  // Organization schema - educational platform
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "CodeHubMaster",
    "description": "Free coding education platform with AI-powered tutorials and programming guides",
    "url": "https://codehubmaster.site",
    "logo": "https://codehubmaster.site/favicon.png"
  };

  // Article schema for content pages
  const articleSchema = articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": ogImage,
    "author": {
      "@type": "Organization",
      "name": "CodeHubMaster",
      "url": "https://codehubmaster.site"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CodeHubMaster",
      "logo": {
        "@type": "ImageObject",
        "url": "https://codehubmaster.site/favicon.png"
      }
    },
    "datePublished": articleData.publishedTime || new Date().toISOString(),
    "dateModified": articleData.modifiedTime || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  } : null;

  // FAQ schema for question pages
  const faqSchema = faqData && faqData.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Breadcrumb schema for navigation
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags for international targeting - signals to Google/AdSense your target audience */}
      <link rel="alternate" hrefLang="en-US" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-GB" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {/* Geographic targeting for US/UK - helps AdSense understand target audience */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      <meta name="language" content="en-US" />
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="audience" content="all" />
      <meta name="target" content="all" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      
      {/* AdSense optimization hints */}
      <meta name="adsense-audience" content="en-US,en-GB" />
      
      {/* Robots - conditional noindex for low-quality pages */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={articleData ? "article" : "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="CodeHubMaster" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@codehubmaster" />
      <meta name="twitter:creator" content="@codehubmaster" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Article specific meta */}
      {articleData && (
        <>
          <meta property="article:published_time" content={articleData.publishedTime} />
          <meta property="article:modified_time" content={articleData.modifiedTime} />
          <meta property="article:author" content={articleData.author || "CodeHubMaster"} />
          <meta property="article:section" content={articleData.section} />
        </>
      )}
      
      {/* WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Article Schema */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {/* Custom Schema.org JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};
