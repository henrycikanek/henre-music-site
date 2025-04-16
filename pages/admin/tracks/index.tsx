import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { DiscographyItem } from '@/utils/spotify-types';

interface AdminPageProps {
  discography: DiscographyItem[];
  metadata: Record<string, { role: string; category: string }>;
}

export default function AdminTracksPage({ discography, metadata }: AdminPageProps) {
  const router = useRouter();
  const [tracks, setTracks] = useState<DiscographyItem[]>(discography);
  const [editingTrack, setEditingTrack] = useState<string | null>(null);
  const [trackMetadata, setTrackMetadata] = useState<Record<string, { role: string; category: string }>>(metadata);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Categories for track classification
  const categories = [
    { id: "production", label: "Production" },
    { id: "mixing", label: "Mixing" },
    { id: "mastering", label: "Mastering" },
    { id: "writing", label: "Writing" }
  ];

  // Common roles
  const roles = [
    "Production",
    "Mixing",
    "Mastering",
    "Writing",
    "Production, Mixing",
    "Production, Mastering",
    "Mixing, Mastering",
    "Production, Mixing, Mastering",
    "Writing, Production"
  ];

  // Update the metadata for a track
  const updateTrackMetadata = (trackId: string, field: 'role' | 'category', value: string) => {
    const updatedMetadata = { 
      ...trackMetadata,
      [trackId]: {
        ...trackMetadata[trackId],
        [field]: value
      }
    };
    setTrackMetadata(updatedMetadata);
  };

  // Save metadata changes
  const saveMetadata = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/save-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metadata: trackMetadata }),
      });

      if (!response.ok) {
        throw new Error('Failed to save metadata');
      }

      setMessage({ text: 'Metadata saved successfully!', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving metadata:', error);
      setMessage({ text: 'Error saving metadata', type: 'error' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Trigger playlist update
  const updateFromPlaylist = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cron/update-discography?secret=' + process.env.NEXT_PUBLIC_ADMIN_SECRET, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to update from playlist');
      }

      const result = await response.json();
      
      setMessage({ 
        text: `Updated successfully! Found ${result.count} tracks.`, 
        type: 'success' 
      });
      
      // Reload the page to see updated data
      setTimeout(() => {
        router.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating from playlist:', error);
      setMessage({ text: 'Error updating from playlist', type: 'error' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Track Management</h1>
          <div className="flex space-x-4">
            <button
              onClick={saveMetadata}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={updateFromPlaylist}
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update from Spotify Playlist'}
            </button>
          </div>
        </div>

        {message && (
          <div 
            className={`p-4 mb-6 rounded ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-4 text-left">Cover</th>
                <th className="py-3 px-4 text-left">Track</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => (
                <tr key={track.id} className="border-t border-gray-800">
                  <td className="py-4 px-4">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={track.coverArt || "/images/covers/placeholder.jpg"}
                        alt={track.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-white/70">{track.artist}</div>
                  </td>
                  <td className="py-4 px-4">
                    {editingTrack === track.id ? (
                      <select 
                        className="bg-gray-800 border border-gray-700 rounded p-2 w-full text-white"
                        value={trackMetadata[track.id]?.role || ''}
                        onChange={(e) => updateTrackMetadata(track.id, 'role', e.target.value)}
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                        <option value={trackMetadata[track.id]?.role}>
                          {trackMetadata[track.id]?.role}
                        </option>
                      </select>
                    ) : (
                      trackMetadata[track.id]?.role || 'Not set'
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {editingTrack === track.id ? (
                      <select 
                        className="bg-gray-800 border border-gray-700 rounded p-2 w-full text-white"
                        value={trackMetadata[track.id]?.category || ''}
                        onChange={(e) => updateTrackMetadata(track.id, 'category', e.target.value)}
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.label}</option>
                        ))}
                      </select>
                    ) : (
                      categories.find(c => c.id === trackMetadata[track.id]?.category)?.label || 'Not set'
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setEditingTrack(editingTrack === track.id ? null : track.id)}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      {editingTrack === track.id ? 'Done' : 'Edit'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // In a real application, check for authentication here
  // This is a simplified example without proper auth
  
  try {
    // Check if the data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Path to the discography JSON file
    const discographyPath = path.join(process.cwd(), 'data', 'discography.json');
    const metadataPath = path.join(process.cwd(), 'data', 'track-metadata.json');
    
    let discography: DiscographyItem[] = [];
    let metadata: Record<string, { role: string; category: string }> = {};
    
    // Load discography if it exists
    if (fs.existsSync(discographyPath)) {
      const fileContents = fs.readFileSync(discographyPath, 'utf8');
      discography = JSON.parse(fileContents);
    }
    
    // Load metadata if it exists
    if (fs.existsSync(metadataPath)) {
      const fileContents = fs.readFileSync(metadataPath, 'utf8');
      metadata = JSON.parse(fileContents);
    }
    
    // Ensure metadata exists for all tracks
    discography.forEach(track => {
      if (!metadata[track.id]) {
        metadata[track.id] = {
          role: track.role || 'Production',
          category: track.category || 'production'
        };
      }
    });
    
    return {
      props: {
        discography,
        metadata,
      }
    };
  } catch (error) {
    console.error('Error loading track data:', error);
    return {
      props: {
        discography: [],
        metadata: {},
      }
    };
  }
}; 