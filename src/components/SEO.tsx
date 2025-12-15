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
}

export const SEO = ({ 
  title, 
  description, 
  keywords = "learn python, python programming, coding tutorials, web development, AI coding, machine learning, javascript tutorial, data science course",
  canonical,
  ogImage = "https://codehubmaster.lovable.app/favicon.png",
  schemaData,
  articleData,
  faqData,
  breadcrumbs
}: SEOProps) => {
  // Auto-generate canonical URL if not provided
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href.replace(/\/$/, '') // Remove trailing slash
    : 'https://codehubmaster.lovable.app';
  
  const canonicalUrl = canonical || currentUrl;
  
  // Organization schema - optimized for US/UK search
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "CodeHubMaster",
    "alternateName": "CodeHub Master - Learn Programming",
    "description": "Free online platform for learning Python programming, web development, JavaScript, AI, and machine learning with hands-on tutorials and code examples",
    "url": "https://codehubmaster.lovable.app",
    "logo": "https://codehubmaster.lovable.app/favicon.png",
    "image": "https://codehubmaster.lovable.app/favicon.png",
    "sameAs": [
      "https://twitter.com/codehubmaster"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "areaServed": ["US", "UK", "IN", "CA", "AU"],
    "availableLanguage": ["en", "hi"]
  };

  // WebSite schema with SearchAction for sitelinks
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CodeHubMaster",
    "alternateName": "Learn Python Programming Free",
    "url": "https://codehubmaster.lovable.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://codehubmaster.lovable.app/topics?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["en-US", "en-GB", "hi-IN"]
  };

  // Article schema for content pages
  const articleSchema = articleData ? {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "image": ogImage,
    "author": {
      "@type": "Organization",
      "name": "CodeHubMaster",
      "url": "https://codehubmaster.lovable.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CodeHubMaster",
      "logo": {
        "@type": "ImageObject",
        "url": "https://codehubmaster.lovable.app/favicon.png"
      }
    },
    "datePublished": articleData.publishedTime || new Date().toISOString(),
    "dateModified": articleData.modifiedTime || new Date().toISOString(),
    "articleSection": articleData.section || "Programming Tutorial",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "inLanguage": "en-US"
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

  // Course schema for educational content
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Python Programming Tutorial",
    "description": "Learn Python programming from basics to advanced with free tutorials, code examples, and hands-on projects",
    "provider": {
      "@type": "Organization",
      "name": "CodeHubMaster",
      "sameAs": "https://codehubmaster.lovable.app"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT10H"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

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
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
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
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* WebSite Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Course Schema */}
      <script type="application/ld+json">
        {JSON.stringify(courseSchema)}
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
