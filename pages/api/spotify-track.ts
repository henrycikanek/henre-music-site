// Next.js API route for fetching track data from Spotify
import type { NextApiRequest, NextApiResponse } from 'next';
import { extractSpotifyId } from '@/utils/spotify';

type SpotifyResponse = {
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SpotifyResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;
  
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid track URL' });
  }

  const trackId = extractSpotifyId(url);
  
  if (!trackId) {
    return res.status(400).json({ error: 'Invalid Spotify track URL' });
  }

  try {
    // In a production environment, you would need to securely implement:
    // 1. Client credentials flow or authorization code flow
    // 2. Proper token refresh
    // 3. Secure storage of credentials
    
    // For now, we'll add a placeholder for the token acquisition process
    const accessToken = await getSpotifyAccessToken();
    
    // Fetch track data from Spotify API
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
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
    return res.status(200).json({ data });
    
  } catch (error) {
    console.error('Error fetching Spotify track:', error);
    return res.status(500).json({ error: 'Failed to fetch track data from Spotify' });
  }
}

// Helper function to get Spotify access token
// In a real implementation, this would be properly secured and cached
async function getSpotifyAccessToken(): Promise<string> {
  // This is a placeholder for demonstration purposes
  // In a real application, you would:
  // 1. Store client credentials securely (e.g. environment variables)
  // 2. Implement the client credentials flow
  // 3. Cache the token and handle refreshing
  
  // For documentation purposes only - not functional code
  /*
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
    },
    body: 'grant_type=client_credentials'
  });
  
  const data = await response.json();
  return data.access_token;
  */
  
  return 'placeholder_token';
} 