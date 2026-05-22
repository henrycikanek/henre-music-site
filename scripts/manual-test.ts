// Simple test to verify environment variables
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

function testEnvVars() {
  console.log('Testing environment variables...');
  
  // Check if .env.local exists
  const envPath = path.resolve(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);
  
  console.log(`.env.local file ${envExists ? 'exists' : 'does not exist'} at: ${envPath}`);
  
  // List all environment variables (excluding their values for security)
  console.log('\nEnvironment variables found:');
  
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const spotifyPlaylistUrl = process.env.SPOTIFY_PLAYLIST_URL;
  
  console.log(`SPOTIFY_CLIENT_ID: ${spotifyClientId ? '✅ Set' : '❌ Not set'}`);
  console.log(`SPOTIFY_CLIENT_SECRET: ${spotifyClientSecret ? '✅ Set' : '❌ Not set'}`);
  console.log(`SPOTIFY_PLAYLIST_URL: ${spotifyPlaylistUrl ? '✅ Set' : '❌ Not set'}`);
  
  if (spotifyPlaylistUrl) {
    console.log(`\nPlaylist URL: ${spotifyPlaylistUrl}`);
  }
  
  // Provide troubleshooting tips
  if (!spotifyClientId || !spotifyClientSecret || !spotifyPlaylistUrl) {
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure your .env.local file exists in the project root directory');
    console.log('2. Ensure your .env.local file has the following format:');
    console.log(`
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_PLAYLIST_URL=https://open.spotify.com/playlist/your_playlist_id_here
    `);
    console.log('3. No spaces around the = sign');
    console.log('4. No quotes around the values');
  }
}

testEnvVars(); 