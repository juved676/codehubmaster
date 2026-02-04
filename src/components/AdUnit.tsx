import { useEffect, useState, useRef } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  type?: 'display' | 'in-article' | 'multiplex';
  className?: string;
}

// Defer ad initialization to avoid blocking LCP
const initAd = (element: HTMLElement | null) => {
  if (!element) return;
  
  // Wait for AdSense to be available
  requestIdleCallback(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // Silent fail for ad errors
    }
  }, { timeout: 3000 });
};

// Polyfill for requestIdleCallback
if (typeof window !== 'undefined' && !window.requestIdleCallback) {
  // @ts-ignore
  window.requestIdleCallback = (callback: IdleRequestCallback) => {
    return setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 50 }), 1);
  };
}

export const AdUnit = ({ 
  slot = "auto", 
  format = "auto",
  responsive = true,
  style = { display: 'block' },
  type = 'display',
  className = ''
}: AdUnitProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use Intersection Observer to lazy load ads
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { 
        rootMargin: '200px', // Load ads 200px before they enter viewport
        threshold: 0 
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && adRef.current) {
      initAd(adRef.current);
    }
  }, [isVisible]);

  const getLayoutStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: 'block',
      minWidth: '300px',
      width: '100%',
    };
    if (type === 'in-article') {
      return {
        ...baseStyle,
        textAlign: 'center' as const,
        minHeight: '250px',
      };
    }
    return { ...baseStyle, ...style };
  };

  // Reserve space for ads to prevent layout shifts and "No slot size" errors
  const getContainerStyle = (): React.CSSProperties => {
    if (type === 'in-article') {
      return { minHeight: '280px', minWidth: '300px', width: '100%' };
    }
    return { minHeight: '100px', minWidth: '300px', width: '100%' };
  };

  return (
    <div 
      ref={adRef} 
      className={`w-full flex justify-center ${className}`}
      style={getContainerStyle()}
    >
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={getLayoutStyle()}
          data-ad-client="ca-pub-1155843649635845"
          data-ad-slot={slot}
          data-ad-format={type === 'in-article' ? 'fluid' : format}
          data-ad-layout={type === 'in-article' ? 'in-article' : undefined}
          data-full-width-responsive={responsive.toString()}
        />
      )}
    </div>
  );
};

// Above the fold ad - priority placement (still deferred but with reserved space)
export const AboveFoldAd = () => (
  <div className="w-full py-2 bg-card/30" style={{ minHeight: '100px', minWidth: '300px' }}>
    <AdUnit 
      format="horizontal" 
      responsive={true}
      className="max-w-7xl mx-auto px-4"
    />
  </div>
);

// In-article ad for content sections
export const InArticleAd = () => (
  <div className="my-6 w-full" style={{ minHeight: '280px', minWidth: '300px' }}>
    <AdUnit 
      type="in-article"
      format="fluid"
      responsive={true}
    />
  </div>
);

// Mobile-optimized responsive ad
export const MobileAd = () => (
  <div className="w-full py-4 md:hidden" style={{ minHeight: '250px', minWidth: '300px' }}>
    <AdUnit 
      format="rectangle"
      responsive={true}
      style={{ display: 'block', minHeight: '250px', minWidth: '300px' }}
    />
  </div>
);

// REMOVED: AnchorAd and VignetteAd components
// These were causing "Only one enable_page_level_ads allowed" errors
// Page-level ads are now ONLY initialized once in index.html

export default AdUnit;
