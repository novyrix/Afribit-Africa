'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
}

const aspectRatioMap = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
};

export function ImageWithLoader({
  src,
  alt,
  className,
  fallback = '/Images/placeholder.jpg',
  aspectRatio,
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-gray-200', aspectRatio && aspectRatioMap[aspectRatio])}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
