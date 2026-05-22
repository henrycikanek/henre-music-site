// Types for Spotify API responses

// Basic track information from Spotify API
export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: {
    spotify: string;
  };
  popularity: number; // 0-100 popularity score (a measure related to streams)
}

// Artist information
export interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

// Album information
export interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string; // Format: "YYYY-MM-DD" or "YYYY-MM" or "YYYY"
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
}

// Image object
export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

// Playlist response
export interface SpotifyPlaylistResponse {
  items: {
    track: SpotifyTrack;
    added_at: string; // ISO datetime
  }[];
  next: string | null; // URL for the next page of results
  total: number; // Total number of tracks
}

// Track with additional metadata for our application
export interface TrackWithMetadata extends SpotifyTrack {
  role?: string; // e.g., "Mixing, Production"
  category?: string; // e.g., "mixing", "production"
  streams?: number; // Stream count (would need to be fetched separately)
  youtubeUrl?: string;
  appleMusicUrl?: string;
  youtubeEmbedId?: string;
}

// Our application's discography item format
export interface DiscographyItem {
  id: string;
  artist: string;
  title: string;
  year: string;
  role: string;
  category: string;
  coverArt: string;
  spotify: string;
  spotifyEmbedId: string;
  appleMusic?: string;
  youtube?: string;
  youtubeEmbedId?: string;
  streams?: number; // Added for sorting by popularity
  popularity?: number; // Spotify's popularity score as fallback
} 