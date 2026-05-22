import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-wider">
              HENRY CIKANEK
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/discography" className="hover:text-accent">
              DISCOGRAPHY
            </Link>

            <Link href="/services" className="hover:text-accent">
              SERVICES
            </Link>
            
            <Link href="/submit" className="hover:text-accent">
              SUBMIT PROJECT
            </Link>
            
            {/* TODO: Re-enable About page after content is ready */}
            {/* <Link href="/about/henry" className="hover:text-accent">
              ABOUT
            </Link> */}
            
            <Link href="/contact" className="hover:text-accent">
              CONTACT
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10">
          <div className="px-4 py-4 space-y-1 bg-gray-950">
            <Link href="/discography" className="block px-3 py-3 hover:text-accent hover:bg-white/5 rounded-md font-medium transition" onClick={() => setIsMobileMenuOpen(false)}>
              DISCOGRAPHY
            </Link>

            <Link href="/services" className="block px-3 py-3 hover:text-accent hover:bg-white/5 rounded-md font-medium transition" onClick={() => setIsMobileMenuOpen(false)}>
              SERVICES
            </Link>
            
            <Link href="/submit" className="block px-3 py-3 hover:text-accent hover:bg-white/5 rounded-md font-medium transition" onClick={() => setIsMobileMenuOpen(false)}>
              SUBMIT PROJECT
            </Link>
            
            {/* TODO: Re-enable About page after content is ready */}
            {/* <Link href="/about/henry" className="block px-3 py-3 hover:text-accent hover:bg-white/5 rounded-md font-medium transition" onClick={() => setIsMobileMenuOpen(false)}>
              ABOUT
            </Link> */}
            
            <Link href="/contact" className="block px-3 py-3 hover:text-accent hover:bg-white/5 rounded-md font-medium transition" onClick={() => setIsMobileMenuOpen(false)}>
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
