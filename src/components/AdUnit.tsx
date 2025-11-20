import { useEffect } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

export const AdUnit = ({ 
  slot = "auto", 
  format = "auto",
  responsive = true,
  style = { display: 'block' }
}: AdUnitProps) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="my-8 w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-1155843649635845"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};
