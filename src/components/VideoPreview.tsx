
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getYoutubeThumbnail, getYoutubeEmbedUrl } from '@/utils/youtubeUtils';

interface VideoPreviewProps {
  videoId: string;
  title?: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoId, title }) => {
  const thumbnailUrl = getYoutubeThumbnail(videoId);
  const embedUrl = getYoutubeEmbedUrl(videoId);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card className="overflow-hidden bg-white/90 border-brand-200 shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="aspect-video w-full relative">
          {isLoading && (
            <div className="absolute inset-0 bg-brand-100 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            src={embedUrl}
            title={title || "YouTube video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full transition-opacity duration-500"
            style={{ opacity: isLoading ? 0 : 1 }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
        {title && (
          <div className="px-4 py-3">
            <h3 className="font-medium text-lg line-clamp-2 text-brand-800">{title}</h3>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
