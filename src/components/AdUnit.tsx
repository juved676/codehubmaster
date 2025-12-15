import { useEffect } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  type?: 'display' | 'in-article' | 'multiplex';
  className?: string;
}

export const AdUnit = ({ 
  slot = "auto", 
  format = "auto",
  responsive = true,
  style = { display: 'block' },
  type = 'display',
  className = ''
}: AdUnitProps) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const getLayoutStyle = () => {
    if (type === 'in-article') {
      return {
        display: 'block',
        textAlign: 'center' as const,
      };
    }
    return style;
  };

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={getLayoutStyle()}
        data-ad-client="ca-pub-1155843649635845"
        data-ad-slot={slot}
        data-ad-format={type === 'in-article' ? 'fluid' : format}
        data-ad-layout={type === 'in-article' ? 'in-article' : undefined}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

// Above the fold ad - priority placement
export const AboveFoldAd = () => (
  <div className="w-full py-2 bg-card/30">
    <AdUnit 
      format="horizontal" 
      responsive={true}
      className="max-w-7xl mx-auto px-4"
    />
  </div>
);

// In-article ad for content sections
export const InArticleAd = () => (
  <div className="my-6 w-full">
    <AdUnit 
      type="in-article"
      format="fluid"
      responsive={true}
    />
  </div>
);

// Mobile-optimized responsive ad
export const MobileAd = () => (
  <div className="w-full py-4 md:hidden">
    <AdUnit 
      format="rectangle"
      responsive={true}
      style={{ display: 'block', minHeight: '250px' }}
    />
  </div>
);

// Anchor ad (sticky bottom) - auto-enabled by AdSense
// This component adds the necessary script for anchor ads
export const AnchorAd = () => {
  useEffect(() => {
    try {
      // Enable anchor and vignette ads through AdSense auto ads
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-1155843649635845",
        enable_page_level_ads: true,
        overlays: { bottom: true }
      });
    } catch (err) {
      console.error('Anchor ad error:', err);
    }
  }, []);

  return null; // Auto ads are handled by AdSense
};

// Vignette ad trigger - auto-enabled by AdSense
export const VignetteAd = () => {
  useEffect(() => {
    try {
      // Vignette ads are enabled through page-level ads
      // They show between page navigations automatically
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-1155843649635845",
        enable_page_level_ads: true
      });
    } catch (err) {
      console.error('Vignette ad error:', err);
    }
  }, []);

  return null; // Auto ads are handled by AdSense
};
