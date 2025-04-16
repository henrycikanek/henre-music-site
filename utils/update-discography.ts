import fs from 'fs';
import path from 'path';
import { getSpotifyAccessToken, clearTokenCache } from './spotify-auth';
import { SpotifyTrack, SpotifyPlaylistResponse, DiscographyItem } from './spotify-types';

// File to store the discography data
const DISCOGRAPHY_FILE = path.join(process.cwd(), 'data', 'discography.json');
const METADATA_FILE = path.join(process.cwd(), 'data', 'track-metadata.json');

// Ensure the data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Extract playlist ID from a Spotify playlist URL
 */
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

/**
 * Get all tracks from a Spotify playlist (handles pagination)
 */
async function getAllPlaylistTracks(playlistId: string, accessToken: string): Promise<SpotifyTrack[]> {
  let allTracks: SpotifyTrack[] = [];
  let nextUrl: string | null = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(id,name,artists,album,external_urls,popularity)),next,total&limit=100`;
  
  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch playlist: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as SpotifyPlaylistResponse;
    
    // Add the tracks from this page to our array
    const tracks = data.items
      .filter(item => item.track) // Filter out any null tracks
      .map(item => item.track);
    
    allTracks = [...allTracks, ...tracks];
    
    // Update the nextUrl for pagination
    nextUrl = data.next;
  }
  
  return allTracks;
}

/**
 * Load existing track metadata (roles, categories, etc.) from file
 */
function loadTrackMetadata(): Record<string, { role: string; category: string }> {
  try {
    if (fs.existsSync(METADATA_FILE)) {
      const data = fs.readFileSync(METADATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading track metadata:', error);
  }
  
  return {};
}

/**
 * Save track metadata to file
 */
function saveTrackMetadata(metadata: Record<string, { role: string; category: string }>) {
  try {
    ensureDataDirectory();
    fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
  } catch (error) {
    console.error('Error saving track metadata:', error);
  }
}

/**
 * Get the largest album artwork URL from a track
 */
function getAlbumArtwork(track: SpotifyTrack): string {
  if (!track?.album?.images?.length) return '';
  
  // Sort by size (largest first)
  const sortedImages = [...track.album.images].sort((a, b) => b.width - a.width);
  return sortedImages[0].url;
}

/**
 * Format artist names from a track
 */
function formatArtistNames(track: SpotifyTrack): string {
  if (!track?.artists?.length) return '';
  
  return track.artists.map(artist => artist.name).join(', ');
}

/**
 * Extract year from release date
 */
function extractYear(releaseDate: string): string {
  if (!releaseDate) return new Date().getFullYear().toString();
  
  // Spotify release_date can be in format: "YYYY-MM-DD", "YYYY-MM", or "YYYY"
  return releaseDate.split('-')[0];
}

/**
 * Convert Spotify track to our DiscographyItem format
 */
function convertTrackToDiscographyItem(
  track: SpotifyTrack, 
  metadata: Record<string, { role: string; category: string }>
): DiscographyItem {
  // Look up or create default metadata for this track
  const trackMetadata = metadata[track.id] || {
    role: 'Production', // Default role
    category: 'production' // Default category
  };
  
  return {
    id: track.id,
    artist: formatArtistNames(track),
    title: track.name,
    year: extractYear(track.album.release_date),
    role: trackMetadata.role,
    category: trackMetadata.category,
    coverArt: getAlbumArtwork(track),
    spotify: track.external_urls.spotify,
    spotifyEmbedId: track.id,
    appleMusic: '', // Would need to be looked up separately
    youtube: '', // Would need to be looked up separately
    youtubeEmbedId: '', // Would need to be looked up separately
    popularity: track.popularity // Spotify's popularity score (0-100)
  };
}

/**
 * Get stream counts for tracks - would require Spotify Web API with proper scope
 * This is a placeholder function as the API doesn't easily provide this data
 */
async function enrichWithStreamCounts(
  discography: DiscographyItem[], 
  accessToken: string
): Promise<DiscographyItem[]> {
  // In a real implementation, you would need to use an API that provides stream counts
  // Spotify doesn't expose this directly in their API
  
  // As a fallback, we're using the 'popularity' score from Spotify (0-100)
  // which is related to play counts but not exactly the same
  
  return discography;
}

/**
 * Main function to update discography from a Spotify playlist
 */
export async function updateDiscographyFromPlaylist(playlistUrl: string): Promise<DiscographyItem[]> {
  const playlistId = extractPlaylistId(playlistUrl);
  
  if (!playlistId) {
    throw new Error('Invalid Spotify playlist URL');
  }
  
  try {
    // Load existing metadata
    const metadata = loadTrackMetadata();
    
    // Get access token
    const accessToken = await getSpotifyAccessToken();
    
    // Get all tracks from the playlist
    const tracks = await getAllPlaylistTracks(playlistId, accessToken);
    
    // Convert tracks to our format
    let discography = tracks.map(track => convertTrackToDiscographyItem(track, metadata));
    
    // Try to get stream counts (placeholder in this implementation)
    discography = await enrichWithStreamCounts(discography, accessToken);
    
    // Sort by popularity (as a proxy for streams)
    discography.sort((a, b) => {
      // Sort by stream count if available
      if (a.streams && b.streams) {
        return b.streams - a.streams;
      }
      // Fall back to Spotify popularity score
      return (b.popularity || 0) - (a.popularity || 0);
    });
    
    // Save the updated discography
    ensureDataDirectory();
    fs.writeFileSync(DISCOGRAPHY_FILE, JSON.stringify(discography, null, 2));
    
    // Update metadata file with any new tracks
    tracks.forEach(track => {
      if (!metadata[track.id]) {
        metadata[track.id] = {
          role: 'Production', // Default role
          category: 'production' // Default category
        };
      }
    });
    
    saveTrackMetadata(metadata);
    
    return discography;
  } catch (error) {
    console.error('Error updating discography:', error);
    throw error;
  }
} 