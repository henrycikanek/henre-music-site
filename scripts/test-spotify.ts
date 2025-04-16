// Test script to verify Spotify integration
import { getSpotifyAccessToken } from '../utils/spotify-auth';
import { updateDiscographyFromPlaylist } from '../utils/update-discography';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testSpotifyIntegration() {
  console.log('🔑 Testing Spotify API credentials...');
  
  try {
    // Step 1: Test authentication
    console.log('Attempting to get Spotify access token...');
    const token = await getSpotifyAccessToken();
    console.log('✅ Successfully retrieved access token!');
    
    // Step 2: Test playlist fetching
    console.log('\n📋 Testing playlist fetch...');
    const playlistUrl = process.env.SPOTIFY_PLAYLIST_URL;
    
    if (!playlistUrl) {
      console.error('❌ No playlist URL found in environment variables!');
      console.log('Make sure SPOTIFY_PLAYLIST_URL is set in your .env.local file');
      return;
    }
    
    console.log(`Attempting to fetch tracks from playlist: ${playlistUrl}`);
    const discography = await updateDiscographyFromPlaylist(playlistUrl);
    
    console.log('✅ Successfully fetched and processed playlist!');
    console.log(`Found ${discography.length} tracks:`);
    
    // Print out a summary of found tracks
    discography.forEach((track, index) => {
      console.log(`${index + 1}. "${track.title}" by ${track.artist} (${track.year})`);
    });
    
    console.log('\n✨ Test completed successfully! Your Spotify integration is working properly.');
    console.log('Your discography data has been saved to data/discography.json');
    console.log('Track metadata has been saved to data/track-metadata.json');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check that your SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are correct');
    console.log('2. Verify your playlist URL is valid and accessible');
    console.log('3. Ensure your playlist contains tracks');
  }
}

// Run the test
testSpotifyIntegration(); 