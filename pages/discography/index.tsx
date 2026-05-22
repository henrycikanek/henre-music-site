import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import { DiscographyItem } from '@/utils/spotify-types';

// Categories for filtering
const categories = [
  { id: "all", label: "All" },
  { id: "production", label: "Production" },
  { id: "mixing", label: "Mixing" },
  { id: "mastering", label: "Mastering" },
  { id: "writing", label: "Writing" }
];

interface DiscographyPageProps {
  discography: DiscographyItem[];
}

export default function DiscographyPage({ discography }: DiscographyPageProps) {
  const [filter, setFilter] = useState("all");
  const [filteredWorks, setFilteredWorks] = useState<DiscographyItem[]>([]);
  
  // Filter works when the category changes
  useEffect(() => {
    if (filter === "all") {
      setFilteredWorks(discography);
    } else {
      setFilteredWorks(discography.filter(work => work.category.split(',').includes(filter)));
    }
  }, [filter, discography]);
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Discography</h1>
        
        {/* Category filter */}
        <div className="mb-12">
          <h2 className="text-xl mb-4">Filter by Role</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-5 py-2 rounded-full transition ${
                  filter === category.id 
                    ? "bg-accent text-white" 
                    : "bg-gray-800 text-white/70 hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Works grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredWorks.map((work) => (
            <Link 
              key={work.id} 
              href={`/discography/track/${work.id}`}
              className="group bg-gray-900 rounded-lg overflow-hidden transition hover:bg-gray-800"
            >
              <div className="aspect-square relative">
                <Image 
                  src={work.coverArt || "/images/covers/placeholder.jpg"} 
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">{work.title}</h3>
                <p className="text-white/70 text-sm mb-2 truncate">{work.artist}</p>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs text-white/50 flex-shrink-0">{work.year}</span>
                  <span className="text-xs text-accent font-medium text-right leading-relaxed">{work.role}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredWorks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70">No works found in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Path to the discography JSON file
    const filePath = path.join(process.cwd(), 'data', 'discography.json');
    
    // Check if the file exists
    let discography: DiscographyItem[] = [];
    
    if (fs.existsSync(filePath)) {
      // Read and parse the file
      const fileContents = fs.readFileSync(filePath, 'utf8');
      discography = JSON.parse(fileContents);
    } else {
      // If file doesn't exist, use an empty array
      console.warn('Discography file not found. Will use empty array.');
    }
    
    return {
      props: {
        discography,
      },
      // Revalidate the data every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error loading discography data:', error);
    return {
      props: {
        discography: [],
      },
      // Try again in a minute if there was an error
      revalidate: 60,
    };
  }
}; 