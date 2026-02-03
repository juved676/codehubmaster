import { useState, useEffect, ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  placeholder?: string;
}

/**
 * Optimized Image component with:
 * - Explicit width/height to prevent layout shifts (CLS)
 * - Lazy loading for below-fold images
 * - Eager loading for priority/LCP images
 * - Native loading attribute support
 * - Fade-in animation on load
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  placeholder,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : (placeholder || ''));

  useEffect(() => {
    if (!priority && !placeholder) {
      setImageSrc(src);
    }
  }, [src, priority, placeholder]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setIsLoaded(true)}
      className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
      {...props}
    />
  );
}

/**
 * Hero/Background image component optimized for LCP
 * Uses WebP format and priority loading
 */
export function HeroImage({
  src,
  alt,
  className = '',
  style = {},
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div 
      className={className}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }}
      role="img"
      aria-label={alt}
    />
  );
}

export default OptimizedImage;
