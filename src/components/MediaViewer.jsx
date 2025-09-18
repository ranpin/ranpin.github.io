import React from 'react';

const MediaViewer = ({ src, type, alt, className = '', controls = true }) => {
  if (!src) return null;

  // 检测是否为 data URL (本地上传的文件)
  const isDataUrl = src.startsWith('data:');
  
  // 检测B站链接
  const isBilibili = src.includes('bilibili.com') || src.includes('player.bilibili.com');
  
  // 检测YouTube链接
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  
  // 检测Vimeo链接
  const isVimeo = src.includes('vimeo.com');

  // 处理视频类型
  if (type === 'video' || src.includes('video') || isYouTube || isBilibili || isVimeo) {
    // B站视频处理
    if (isBilibili) {
      let embedUrl = src;
      
      // 如果是普通B站链接，转换为嵌入格式
      if (src.includes('/video/')) {
        const bvMatch = src.match(/\/video\/(BV\w+)/);
        const avMatch = src.match(/\/video\/(av\d+)/);
        
        if (bvMatch) {
          embedUrl = `https://player.bilibili.com/player.html?bvid=${bvMatch[1]}&page=1&high_quality=1&danmaku=0`;
        } else if (avMatch) {
          embedUrl = `https://player.bilibili.com/player.html?aid=${avMatch[1].replace('av', '')}&page=1&high_quality=1&danmaku=0`;
        }
      }
      
      return (
        <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            frameBorder="0"
            allowFullScreen
            title={alt || "B站视频"}
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        </div>
      );
    }
    
    // YouTube视频处理
    if (isYouTube) {
      let videoId = '';
      
      if (src.includes('youtu.be/')) {
        videoId = src.split('youtu.be/')[1].split('?')[0];
      } else if (src.includes('youtube.com/watch?v=')) {
        videoId = src.split('v=')[1].split('&')[0];
      }
      
      if (videoId) {
        return (
          <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allowFullScreen
              title={alt || "YouTube视频"}
            />
          </div>
        );
      }
    }
    
    // Vimeo视频处理
    if (isVimeo) {
      const vimeoMatch = src.match(/vimeo\.com\/(\d+)/);
      if (vimeoMatch) {
        const videoId = vimeoMatch[1];
        return (
          <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://player.vimeo.com/video/${videoId}`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allowFullScreen
              title={alt || "Vimeo视频"}
            />
          </div>
        );
      }
    }
    
    // 本地视频文件
    if (isDataUrl || src.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video
          src={src}
          className={`w-full rounded-lg ${className}`}
          controls={controls}
          preload="metadata"
        >
          您的浏览器不支持视频播放。
        </video>
      );
    }
  }

  // 处理图片类型
  if (type === 'image' || src.includes('image') || isDataUrl || src.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return (
      <img
        src={src}
        alt={alt || "图片"}
        className={`w-full rounded-lg ${className}`}
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
          console.warn('图片加载失败:', src);
        }}
      />
    );
  }

  // 默认处理：尝试作为图片显示
  return (
    <img
      src={src}
      alt={alt || "媒体文件"}
      className={`w-full rounded-lg ${className}`}
      loading="lazy"
      onError={(e) => {
        e.target.style.display = 'none';
        console.warn('媒体文件加载失败:', src);
      }}
    />
  );
};

export default MediaViewer;
