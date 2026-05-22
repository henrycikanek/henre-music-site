import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type SaveResponse = {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SaveResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // In a real application, you would implement proper authentication here
  // This is a simplified example without proper auth checks
  
  try {
    const { metadata } = req.body;
    
    if (!metadata) {
      return res.status(400).json({ success: false, message: 'No metadata provided' });
    }
    
    // Ensure the data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Path to the metadata file
    const metadataFile = path.join(process.cwd(), 'data', 'track-metadata.json');
    
    // Save the metadata
    fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
    
    // Update the discography file to reflect the changes
    const discographyFile = path.join(process.cwd(), 'data', 'discography.json');
    
    if (fs.existsSync(discographyFile)) {
      // Read the current discography
      const discographyJson = fs.readFileSync(discographyFile, 'utf8');
      const discography = JSON.parse(discographyJson);
      
      // Update each track with its metadata
      const updatedDiscography = discography.map((track: Record<string, unknown>) => {
        const trackId = track.id as string;
        if (trackId && metadata[trackId]) {
          return {
            ...track,
            role: metadata[trackId].role,
            category: metadata[trackId].category
          };
        }
        return track;
      });
      
      // Save the updated discography
      fs.writeFileSync(discographyFile, JSON.stringify(updatedDiscography, null, 2));
    }
    
    return res.status(200).json({ success: true, message: 'Metadata saved successfully' });
  } catch (error) {
    console.error('Error saving metadata:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to save metadata: ' + (error instanceof Error ? error.message : String(error))
    });
  }
} 