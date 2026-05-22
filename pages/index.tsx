import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import { DiscographyItem } from '@/utils/spotify-types';

interface HomePageProps {
  featuredTracks: DiscographyItem[];
}

export default function Home({ featuredTracks = [] }: HomePageProps) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-studio.jpeg"
            alt="Studio"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 md:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Professional Music Production & Mixing
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/services" 
              className="bg-white hover:bg-white/90 text-gray-900 font-semibold px-6 py-3 rounded-md transition duration-300"
            >
              Let&apos;s Work!
            </Link>
            <Link 
              href="/discography" 
              className="bg-transparent border border-white hover:border-accent hover:text-accent text-white font-semibold px-6 py-3 rounded-md transition duration-300"
            >
              View My Past Work
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Services</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <Link 
              href="/services#mixing" 
              className="block bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 transition duration-300 group cursor-pointer text-center"
            >
              <div className="mb-3 sm:mb-4 text-accent group-hover:scale-110 transform transition duration-300 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold group-hover:text-accent transition duration-300">Mixing</h3>
            </Link>
            
            <Link 
              href="/services#mastering" 
              className="block bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 transition duration-300 group cursor-pointer text-center"
            >
              <div className="mb-3 sm:mb-4 text-accent group-hover:scale-110 transform transition duration-300 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold group-hover:text-accent transition duration-300">Mastering</h3>
            </Link>
            
            <Link 
              href="/services#production" 
              className="block bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 transition duration-300 group cursor-pointer text-center"
            >
              <div className="mb-3 sm:mb-4 text-accent group-hover:scale-110 transform transition duration-300 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold group-hover:text-accent transition duration-300">Production</h3>
            </Link>
            
            <Link 
              href="/services#vocal-engineering" 
              className="block bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 transition duration-300 group cursor-pointer text-center"
            >
              <div className="mb-3 sm:mb-4 text-accent group-hover:scale-110 transform transition duration-300 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-xl font-bold group-hover:text-accent transition duration-300">Vocal Eng.</h3>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Works */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Featured Work</h2>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            Check out some of my recent projects spanning various genres and styles.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {/* Display actual track data from discography */}
            {featuredTracks && featuredTracks.length > 0 ? (
              featuredTracks.map((track) => (
                <Link
                  key={track.id}
                  href={`/discography/track/${track.id}`}
                  className="group relative overflow-hidden rounded-lg hover:shadow-xl transition duration-300"
                >
                  <div className="aspect-square relative bg-gray-800">
                    <Image 
                      src={track.coverArt || "/images/covers/placeholder.jpg"} 
                      alt={`${track.title} by ${track.artist}`}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4 w-full">
                      <h3 className="text-lg font-bold truncate">{track.title}</h3>
                      <p className="text-sm text-white/80 truncate">{track.artist}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-white/50">{track.year}</span>
                        <span className="text-xs text-accent font-medium">{track.role}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback placeholders if no tracks are found
              [...Array(6)].map((_, index) => (
                <div key={index} className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center text-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/discography" 
              className="inline-block bg-transparent border border-white hover:border-accent hover:text-accent text-white font-semibold px-6 py-3 rounded-md transition duration-300"
            >
              View Full Discography
            </Link>
          </div>
        </div>
      </section>
      
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Path to the discography JSON file
    const filePath = path.join(process.cwd(), 'data', 'discography.json');
    
    // Check if the file exists
    let allTracks: DiscographyItem[] = [];
    
    if (fs.existsSync(filePath)) {
      // Read and parse the file
      const fileContents = fs.readFileSync(filePath, 'utf8');
      allTracks = JSON.parse(fileContents);
      
      // Sort by popularity to get the most popular tracks
      allTracks.sort((a, b) => {
        // Sort by popularity score if available
        if (a.popularity !== undefined && b.popularity !== undefined) {
          return b.popularity - a.popularity;
        }
        return 0;
      });
    } else {
      console.warn('Discography file not found. Will use empty array.');
    }
    
    // Take only the top 6 tracks for the featured section
    const featuredTracks = allTracks.slice(0, 6);
    
    return {
      props: {
        featuredTracks: featuredTracks || [],
      },
      // Revalidate the data every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error loading discography data:', error);
    return {
      props: {
        featuredTracks: [],
      },
      // Try again in a minute if there was an error
      revalidate: 60,
    };
  }
};
