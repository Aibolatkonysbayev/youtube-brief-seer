
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidYoutubeUrl } from '@/utils/youtubeUtils';
import { ArrowRight } from 'lucide-react';

interface VideoInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const VideoInput: React.FC<VideoInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!isValidYoutubeUrl(url)) {
      setError('Invalid YouTube URL. Please enter a valid URL.');
      return;
    }

    setError(null);
    onSubmit(url);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Enter YouTube URL</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              className="flex-1 bg-white/90 border-brand-200"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !url.trim()}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span> 
                  Processing
                </span>
              ) : (
                <span className="flex items-center">
                  Summarize <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default VideoInput;
