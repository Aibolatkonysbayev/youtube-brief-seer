/**
 * Extract the video ID from a YouTube URL
 */
export const extractVideoId = (url: string): string | null => {
  // Regular expressions for various YouTube URL formats
  const regexps = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/user\/[^\/]+\/\?v=([^&]+)/i,
  ];

  for (const regex of regexps) {
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Get YouTube video thumbnail URL from video ID
 */
export const getYoutubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

/**
 * Check if a string is a valid YouTube URL
 */
export const isValidYoutubeUrl = (url: string): boolean => {
  return extractVideoId(url) !== null;
};

/**
 * Generate embed URL for a YouTube video
 */
export const getYoutubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Fetch video details (title, description) from the oEmbed API
 */
export const fetchVideoDetails = async (videoId: string) => {
  try {
    const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch video details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

/**
 * Generate summary using OpenAI API
 */
export const generateSummaryWithAI = async (videoId: string, transcript: string, apiKey: string) => {
  console.log('Generating summary for video:', videoId);
  
  try {
    // For production use, you should store your API key in environment variables
    // and access it through a backend service, not directly in the frontend
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes YouTube video transcripts. Provide a concise summary and key insights.'
          },
          {
            role: 'user',
            content: `Please summarize this YouTube video transcript:\n\n${transcript}`
          }
        ],
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return {
      summary: data.choices[0].message.content,
      insights: extractInsights(data.choices[0].message.content)
    };
    
  } catch (error) {
    console.error('Error generating summary:', error);
    // Fall back to mock data if the API call fails
    return {
      summary: 'Unable to generate summary. Using placeholder text instead.',
      insights: [
        'API connection failed - check your API key',
        'Make sure you have proper authentication',
        'Check console for detailed error information'
      ]
    };
  }
};

// Helper function to extract insights from the AI response
const extractInsights = (text: string): string[] => {
  // This is a simplified implementation
  // In production, you might use more sophisticated NLP techniques
  // or have the AI format its response in a structured way
  
  const lines = text.split('\n');
  const insights = lines
    .filter(line => line.includes('•') || line.includes('-') || line.includes('*'))
    .map(line => line.replace(/^[•\-*]\s*/, '').trim())
    .filter(line => line.length > 0)
    .slice(0, 5); // Limit to 5 insights
    
  return insights.length > 0 ? insights : ['No specific insights found in the summary'];
};
