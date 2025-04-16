// This utility file provides functions for working with Spotify data

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    name: string;
  }>;
  album: {
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  external_urls: {
    spotify: string;
  };
}

/**
 * Extract the Spotify track ID from a full Spotify URL
 * @param url The full Spotify URL (e.g., https://open.spotify.com/track/5s6VxGjZMYTXDCvLrJyXND)
 */
export function extractSpotifyId(url: string): string {
  if (!url) return '';
  
  // For track URLs like https://open.spotify.com/track/5s6VxGjZMYTXDCvLrJyXND
  if (url.includes('/track/')) {
    const parts = url.split('/track/');
    if (parts.length > 1) {
      // Remove any query parameters
      return parts[1].split('?')[0];
    }
  }
  
  return '';
}

/**
 * Get the largest album artwork URL from Spotify track data
 * @param track The Spotify track object
 */
export function getAlbumArtwork(track: SpotifyTrack): string {
  if (!track?.album?.images?.length) return '';
  
  // Sort by size (largest first)
  const sortedImages = [...track.album.images].sort((a, b) => b.width - a.width);
  return sortedImages[0].url;
}

/**
 * Format artist names from a Spotify track
 * @param track The Spotify track object
 */
export function formatArtistNames(track: SpotifyTrack): string {
  if (!track?.artists?.length) return '';
  
  return track.artists.map(artist => artist.name).join(', ');
}

/**
 * Create a data object from Spotify track data for use in our application
 * @param track The Spotify track object
 * @param role The role in the production (e.g., "Mixing, Production")
 * @param category The category for filtering (e.g., "mixing", "production")
 */
export function createTrackData(track: SpotifyTrack, role: string, category: string) {
  if (!track) return null;
  
  return {
    id: track.id,
    artist: formatArtistNames(track),
    title: track.name,
    year: new Date().getFullYear().toString(), // Would need a release_date field from Spotify
    role,
    category,
    coverArt: getAlbumArtwork(track),
    spotify: track.external_urls.spotify,
    spotifyEmbedId: track.id,
    appleMusic: '', // Would need to be looked up separately
    youtube: '', // Would need to be looked up separately
    youtubeEmbedId: '' // Would need to be looked up separately
  };
}

/**
 * Process a Spotify playlist URL to extract track data
 * Note: This is a placeholder function that would normally call the Spotify API
 * @param playlistUrl The Spotify playlist URL
 */
export async function getPlaylistTracks(playlistUrl: string) {
  // In a real implementation, this function would:
  // 1. Extract the playlist ID
  // 2. Call the Spotify API with proper authentication
  // 3. Process the results
  
  // For now, we'll just return a placeholder
  console.log(`Would fetch tracks from playlist: ${playlistUrl}`);
  return [];
}

/**
 * For client-side applications, we would need to implement the Spotify authorization flow
 * This is just a placeholder for reference
 */
export async function getSpotifyAccessToken() {
  // In a production application, this would involve:
  // 1. Implementing the authorization code flow or client credentials flow
  // 2. Securely storing client ID and secret
  // 3. Managing token refresh
  
  // For a Next.js application, this would typically be implemented in an API route
  return '';
} 