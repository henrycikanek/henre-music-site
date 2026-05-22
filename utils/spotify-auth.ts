// Utility for handling Spotify API authentication
// This file should be imported by any API routes that need to access the Spotify API

// Define types for Spotify token response
interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Cache the token and its expiration
let cachedToken: string | null = null;
let tokenExpiration: number = 0;

/**
 * Gets an access token from Spotify using client credentials flow
 * https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
 */
export async function getSpotifyAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  const now = Date.now();
  if (cachedToken && tokenExpiration > now) {
    return cachedToken;
  }

  // We need to get a new token
  try {
    // In a real application, these would be stored in environment variables
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Missing Spotify credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.');
    }

    // Base64 encode the client ID and secret
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    // Make request to Spotify token endpoint
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get Spotify token: ${response.status} ${errorText}`);
    }

    const data = await response.json() as SpotifyTokenResponse;
    
    // Cache the token
    cachedToken = data.access_token;
    // Set expiration time (subtract 60 seconds as a buffer)
    tokenExpiration = now + (data.expires_in - 60) * 1000;
    
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
}

/**
 * Clear the cached token (useful if a token becomes invalid)
 */
export function clearTokenCache(): void {
  cachedToken = null;
  tokenExpiration = 0;
} 