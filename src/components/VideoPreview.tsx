
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getYoutubeThumbnail, getYoutubeEmbedUrl } from '@/utils/youtubeUtils';

interface VideoPreviewProps {
  videoId: string;
  title?: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoId, title }) => {
  const thumbnailUrl = getYoutubeThumbnail(videoId);
  const embedUrl = getYoutubeEmbedUrl(videoId);

  return (
    <Card className="overflow-hidden bg-white/90 border-brand-200">
      <CardContent className="p-0">
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            title={title || "YouTube video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        {title && (
          <div className="px-4 py-3">
            <h3 className="font-medium text-lg line-clamp-2">{title}</h3>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoPreview;
