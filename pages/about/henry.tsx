import Layout from "@/components/Layout";
import Link from "next/link";

export default function AboutHenry() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">About Henry</h1>
        <p className="text-lg text-white/80 mb-8">Music producer, mixer, and engineer based in the United States.</p>
        
        {/* Bio Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            {/* Placeholder image - replace with actual photo */}
            <div className="aspect-square bg-gray-800 w-full rounded-lg mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-white/90">Contact</h3>
                <Link href="/contact" className="text-accent hover:underline">Get in touch →</Link>
              </div>
              
              <div>
                <h3 className="font-bold text-white/90">Location</h3>
                <p className="text-white/70">Chicago, IL</p>
              </div>
              
              <div>
                <h3 className="font-bold text-white/90">Specialties</h3>
                <ul className="text-white/70">
                  <li>Mixing</li>
                  <li>Mastering</li>
                  <li>Production</li>
                  <li>Sound Design</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Background</h2>
              <p className="text-white/80 mb-4">
                With over 10 years of experience in music production and engineering, I&apos;ve worked across a wide range of genres 
                including indie rock, electronic, hip-hop, and pop. My approach combines technical precision with creative vision 
                to help artists achieve their unique sound.
              </p>
              <p className="text-white/80 mb-4">
                After studying audio engineering at Berklee College of Music, I spent several years working at premier studios in 
                Los Angeles and New York before establishing my own production space in Chicago. Throughout my career, I&apos;ve had the 
                privilege of working with both emerging artists and established names in the industry.
              </p>
              <p className="text-white/80">
                My work has been featured on major streaming platforms and has received recognition from industry professionals. 
                I take pride in building long-term relationships with artists and helping them develop their sound across multiple projects.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Approach</h2>
              <p className="text-white/80 mb-4">
                My production philosophy centers on enhancing the artist&apos;s vision rather than imposing my own. I believe that 
                the best results come from close collaboration, open communication, and a deep understanding of what makes 
                each project unique.
              </p>
              <p className="text-white/80">
                Whether you&apos;re looking for crystal-clear pop production, gritty lo-fi aesthetics, or something in between, 
                I approach each project with fresh ears and a commitment to serving the song. My goal is always to bring out 
                the best in your music while maintaining its authenticity and emotional impact.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </Layout>
  );
} 