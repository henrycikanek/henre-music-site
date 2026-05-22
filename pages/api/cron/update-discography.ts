import { NextApiRequest, NextApiResponse } from 'next';
import { updateDiscographyFromPlaylist } from '@/utils/update-discography';

// Response type for the API
type UpdateResponse = {
  success: boolean;
  message: string;
  count?: number;
  tracks?: unknown[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateResponse>
) {
  // Only allow POST requests with the correct secret
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Validate secret key for security (prevents unauthorized access)
  const { secret } = req.query;
  const expectedSecret = process.env.CRON_SECRET;
  
  if (!secret || secret !== expectedSecret) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized. Provide valid secret key.' 
    });
  }

  // Get the playlist URL from the environment variable
  const playlistUrl = process.env.SPOTIFY_PLAYLIST_URL;
  
  if (!playlistUrl) {
    return res.status(500).json({ 
      success: false, 
      message: 'Missing SPOTIFY_PLAYLIST_URL environment variable' 
    });
  }

  try {
    // Update the discography from the playlist
    const discography = await updateDiscographyFromPlaylist(playlistUrl);
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Discography updated successfully',
      count: discography.length,
      tracks: discography
    });
  } catch (error) {
    console.error('Error in update discography job:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update discography',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

// Configure API to extend the timeout for long-running operations
export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
    responseLimit: '8mb',
  },
}; 