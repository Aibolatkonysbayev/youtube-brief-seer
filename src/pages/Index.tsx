
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import VideoInput from '@/components/VideoInput';
import VideoPreview from '@/components/VideoPreview';
import SummaryResult from '@/components/SummaryResult';
import { extractVideoId, fetchVideoDetails } from '@/utils/youtubeUtils';

interface VideoDetails {
  title?: string;
  description?: string;
  author_name?: string;
}

interface SummaryData {
  summary: string;
  insights: string[];
}

const Index = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = (submittedUrl: string) => {
    // Save the URL
    setUrl(submittedUrl);
    
    // Extract video ID
    const extractedId = extractVideoId(submittedUrl);
    setVideoId(extractedId);
    
    // Reset summary if new URL
    setSummaryData(null);
    
    if (extractedId) {
      // Fetch video details
      setIsLoading(true);
      fetchVideoDetails(extractedId)
        .then((details) => {
          setVideoDetails(details);
          // For the demo, mock fetching summary from an API
          // In a real app, you'd call your summary API here
          setTimeout(() => {
            mockSummaryGeneration(details);
          }, 2500);
        })
        .catch((error) => {
          toast({
            title: "Error fetching video details",
            description: "Could not fetch details for this video. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
        });
    }
  };

  // Mock function for generating summary - replace with actual API call later
  const mockSummaryGeneration = (details: VideoDetails) => {
    // In a real application, this would be an API call to your backend
    // that processes the YouTube video and returns a summary
    
    // For now, let's pretend we got a response
    const mockSummary = {
      summary: `This video discusses ${details.title || 'the topic'} in detail, covering key concepts and providing practical examples. The presenter explains the main ideas clearly and offers insights for viewers to apply in their own contexts.`,
      insights: [
        "The video introduces fundamental concepts with clear examples",
        "Key techniques are demonstrated step-by-step for better understanding",
        "Practical applications are discussed to help implement the knowledge",
        "Common mistakes are highlighted with solutions to avoid them"
      ]
    };
    
    setSummaryData(mockSummary);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            YouTube Summary AI
          </h1>
          <p className="text-white/90 text-lg">
            Get key insights from YouTube videos without watching them
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/30 space-y-6">
          <VideoInput onSubmit={handleSubmit} isLoading={isLoading} />

          {videoId && (
            <div className="space-y-6">
              <VideoPreview videoId={videoId} title={videoDetails?.title} />
              
              <SummaryResult 
                isLoading={isLoading}
                summary={summaryData?.summary}
                insights={summaryData?.insights}
              />
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-white/70 text-sm">
          <p>
            Note: This is a demo that currently uses mock data. 
            In a production version, it would connect to APIs to generate real summaries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
