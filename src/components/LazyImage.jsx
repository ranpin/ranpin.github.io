import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  fallback = null,
  onLoad = null,
  onError = null 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  // 默认占位符
  const defaultPlaceholder = (
    <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
      <i className="fas fa-image text-gray-400 text-2xl"></i>
    </div>
  );

  // 默认错误回退
  const defaultFallback = (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}>
      <div className="text-center text-gray-500">
        <i className="fas fa-exclamation-triangle text-xl mb-2"></i>
        <p className="text-sm">图片加载失败</p>
      </div>
    </div>
  );

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* 占位符 */}
      {!isInView && (placeholder || defaultPlaceholder)}
      
      {/* 错误回退 */}
      {hasError && (fallback || defaultFallback)}
      
      {/* 实际图片 */}
      {isInView && !hasError && (
        <>
          {/* 加载中的占位符 */}
          {!isLoaded && (placeholder || defaultPlaceholder)}
          
          <img
            src={src}
            alt={alt}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
            } ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;
