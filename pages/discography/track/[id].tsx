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
          <Link href="/discography" className="flex items-center text-white/70 hover:text-white mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Discography
          </Link>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Track Not Found</h1>
            <p className="text-white/70 mb-8">The track you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/discography" className="bg-accent hover:bg-accent-light px-6 py-3 rounded-lg transition">
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
        <Link href="/discography" className="flex items-center text-white/70 hover:text-white mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Discography
        </Link>
        
        <div className="max-w-4xl mx-auto">
          {/* Cover + Info */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start mb-10">
            <div className="w-48 h-48 sm:w-64 sm:h-64 relative flex-shrink-0">
              <Image 
                src={track.coverArt || "/images/covers/placeholder.jpg"} 
                alt={`${track.title} by ${track.artist}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 pt-2 text-center md:text-left">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2">{track.title}</h1>
              <h2 className="text-xl sm:text-2xl text-white/80 mb-4">{track.artist}</h2>
              <div className="flex items-center justify-center md:justify-start gap-6 text-base mb-2">
                <span className="text-white/60">{track.year}</span>
                <span><span className="text-white/60">Role: </span><span className="text-accent font-medium">{track.role}</span></span>
              </div>
              {track.spotify && (
                <a 
                  href={track.spotify} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-white/70 hover:text-white transition"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.8-.179-.92-.6-.12-.421.18-.8.6-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.262 1.081zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Open in Spotify
                </a>
              )}
            </div>
          </div>

          {/* Spotify Embed */}
          <div className="rounded-lg overflow-hidden">
            <iframe 
              src={`https://open.spotify.com/embed/track/${track.spotifyEmbedId}`}
              width="100%" 
              height="152" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="rounded-lg sm:h-[352px]"
            ></iframe>
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