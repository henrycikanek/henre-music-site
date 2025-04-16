import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from "next/image";
import Link from "next/link";
import fs from 'fs';
import path from 'path';
import Layout from "@/components/Layout";
import { DiscographyItem } from '@/utils/spotify-types';

interface TrackPageProps {
  track: DiscographyItem | null;
}

export default function TrackPage({ track }: TrackPageProps) {
  const router = useRouter();
  
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
          <div className="text-white/70">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  // If track is null (e.g., if it's been removed from the discography)
  if (!track) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <Link href="/discography/full" className="flex items-center text-white/70 hover:text-white mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Discography
          </Link>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Track Not Found</h1>
            <p className="text-white/70 mb-8">The track you're looking for doesn't exist or has been removed.</p>
            <Link href="/discography/full" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition">
              View All Tracks
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Link href="/discography/full" className="flex items-center text-white/70 hover:text-white mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Discography
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Cover Art */}
          <div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="aspect-square relative mb-6">
                <Image 
                  src={track.coverArt || "/images/covers/placeholder.jpg"} 
                  alt={`${track.title} by ${track.artist}`}
                  fill
                  className="object-cover rounded"
                />
              </div>
              
              <h1 className="text-2xl font-bold mb-1">{track.title}</h1>
              <h2 className="text-xl mb-4 text-white/80">{track.artist}</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Year:</span>
                  <span>{track.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Role:</span>
                  <span>{track.role}</span>
                </div>
                {track.popularity !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Popularity:</span>
                    <span>{track.popularity}/100</span>
                  </div>
                )}
                {track.streams !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Streams:</span>
                    <span>{new Intl.NumberFormat().format(track.streams)}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Listen On Section */}
            <div className="mt-8 bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Listen On</h3>
              <div className="space-y-4">
                <a 
                  href={track.spotify} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center bg-black hover:bg-gray-800 p-3 rounded-md transition"
                >
                  <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.8-.179-.92-.6-.12-.421.18-.8.6-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.262 1.081zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Spotify
                </a>
                
                {track.appleMusic && (
                  <a 
                    href={track.appleMusic} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-black hover:bg-gray-800 p-3 rounded-md transition"
                  >
                    <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.088c.822-.098 1.6-.326 2.29-.787 1.177-.793 1.9-1.91 2.19-3.312.076-.36.124-.73.15-1.1.025-.336.038-.67.04-1.01v-12.11c0-.15-.015-.3-.026-.45-.06-.873-.223-1.72-.606-2.52-.704-1.463-1.84-2.324-3.35-2.717-.59-.153-1.194-.203-1.8-.222-.09-.003-.18-.01-.27-.015zm-4.057 4.38c.964 0 1.766.21 2.414.717.65.507.954 1.235.954 2.197 0 .941-.3 1.64-.928 2.1-.624.458-1.42.68-2.414.68h-4.99v-5.696h4.964zm-5.893 11.32c-.996 0-1.833-.237-2.5-.73-.662-.488-.993-1.312-.993-2.47 0-1.153.356-1.978 1.1-2.47.735-.488 1.742-.668 3.003-.668h4.277v6.337h-4.886v.001z"/>
                    </svg>
                    Apple Music
                  </a>
                )}
                
                {track.youtube && (
                  <a 
                    href={track.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-black hover:bg-gray-800 p-3 rounded-md transition"
                  >
                    <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column: Players */}
          <div className="md:col-span-2 space-y-8">
            {/* Spotify Embed */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Listen on Spotify</h3>
              <div className="aspect-video">
                <iframe 
                  src={`https://open.spotify.com/embed/track/${track.spotifyEmbedId}`}
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="rounded-md"
                ></iframe>
              </div>
            </div>
            
            {/* YouTube Embed */}
            {track.youtubeEmbedId && (
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Watch on YouTube</h3>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="315" 
                    src={`https://www.youtube.com/embed/${track.youtubeEmbedId}`} 
                    title={`${track.title} by ${track.artist}`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="rounded-md"
                  ></iframe>
                </div>
              </div>
            )}
            
            {/* Project Description */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">About This Project</h3>
              <p className="text-white/80">
                For this {track.title} project with {track.artist}, I was responsible for {track.role.toLowerCase()}.
                The track was released in {track.year} and showcases a blend of modern production techniques and thoughtful sound engineering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Path to the discography JSON file
    const filePath = path.join(process.cwd(), 'data', 'discography.json');
    let discography: DiscographyItem[] = [];
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      discography = JSON.parse(fileContents);
    }
    
    // Generate paths for all tracks
    const paths = discography.map(track => ({
      params: { id: track.id }
    }));
    
    return {
      paths,
      // If a new track is added between builds, fallback to generate it on demand
      fallback: true,
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    
    if (!id) {
      return { props: { track: null } };
    }
    
    // Path to the discography JSON file
    const filePath = path.join(process.cwd(), 'data', 'discography.json');
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return { 
        props: { track: null },
        revalidate: 60, // Try again in a minute
      };
    }
    
    // Read and parse the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const discography: DiscographyItem[] = JSON.parse(fileContents);
    
    // Find the track with matching ID
    const track = discography.find(t => t.id === id);
    
    return {
      props: {
        track: track || null,
      },
      // Revalidate the data every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error loading track data:', error);
    return {
      props: {
        track: null,
      },
      // Try again in a minute if there was an error
      revalidate: 60,
    };
  }
}; 