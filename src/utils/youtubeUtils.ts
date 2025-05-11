
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
