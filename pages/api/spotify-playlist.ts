// Next.js API route for fetching playlist data from Spotify
import type { NextApiRequest, NextApiResponse } from 'next';

type PlaylistResponse = {
  tracks?: any[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlaylistResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;
  
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid playlist URL' });
  }

  // Extract playlist ID from URL
  const playlistId = extractPlaylistId(url);
  
  if (!playlistId) {
    return res.status(400).json({ error: 'Invalid Spotify playlist URL' });
  }

  try {
    // Get access token (requires Spotify developer app credentials)
    const accessToken = await getSpotifyAccessToken();
    
    // Fetch playlist data
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(id,name,artists,album,external_urls))&limit=50`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify API error:', errorData);
      return res.status(response.status).json({ 
        error: `Error fetching from Spotify: ${errorData.error?.message || 'Unknown error'}` 
      });
    }

    const data = await response.json();
    
    // Extract just the tracks from the response
    const tracks = data.items.map((item: any) => item.track);
    
    return res.status(200).json({ tracks });
    
  } catch (error) {
    console.error('Error fetching Spotify playlist:', error);
    return res.status(500).json({ error: 'Failed to fetch playlist data from Spotify' });
  }
}

// Helper function to extract playlist ID from Spotify URL
function extractPlaylistId(url: string): string {
  if (!url) return '';
  
  // For playlist URLs like https://open.spotify.com/playlist/76HddJKzgzUyW0SA4okGBY
  if (url.includes('/playlist/')) {
    const parts = url.split('/playlist/');
    if (parts.length > 1) {
      // Remove any query parameters
      return parts[1].split('?')[0];
    }
  }
  
  return '';
}

// Helper function to get Spotify access token (same as in spotify-track.ts)
async function getSpotifyAccessToken(): Promise<string> {
  // This is a placeholder for demonstration purposes
  // In a real application, you would implement proper authentication
  
  return 'placeholder_token';
} 