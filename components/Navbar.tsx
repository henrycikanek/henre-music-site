import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isDiscographyOpen, setIsDiscographyOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-black text-white">
      {/* Desktop Navigation */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-wider">
              HENRY CIKANEK
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {/* Discography Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center hover:text-accent focus:outline-none"
                onClick={() => {
                  setIsDiscographyOpen(!isDiscographyOpen);
                  setIsServicesOpen(false);
                  setIsAboutOpen(false);
                }}
              >
                DISCOGRAPHY
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {isDiscographyOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <Link href="/discography/selected" className="block px-4 py-2 hover:bg-gray-800">
                      SELECTED
                    </Link>
                    <Link href="/discography/awards" className="block px-4 py-2 hover:bg-gray-800">
                      AWARDS
                    </Link>
                    <Link href="/discography/full" className="block px-4 py-2 hover:bg-gray-800">
                      FULL
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center hover:text-accent focus:outline-none"
                onClick={() => {
                  setIsServicesOpen(!isServicesOpen);
                  setIsDiscographyOpen(false);
                  setIsAboutOpen(false);
                }}
              >
                SERVICES
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {isServicesOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <Link href="/services/pricing" className="block px-4 py-2 hover:bg-gray-800">
                      PRICING / SEND FILES
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* About Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center hover:text-accent focus:outline-none"
                onClick={() => {
                  setIsAboutOpen(!isAboutOpen);
                  setIsDiscographyOpen(false);
                  setIsServicesOpen(false);
                }}
              >
                ABOUT
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {isAboutOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <Link href="/about/henry" className="block px-4 py-2 hover:bg-gray-800">
                      ABOUT HENRY
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/contact" className="hover:text-accent">
              CONTACT
            </Link>
            
            <Link href="/pay" className="hover:text-accent">
              PAY
            </Link>
            
            <button className="snipcart-checkout hover:text-accent flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span className="hidden sm:inline">CART</span> (<span className="snipcart-items-count">0</span>)
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="block px-3 py-2 font-medium">
              DISCOGRAPHY
              <div className="pl-4 mt-2 space-y-2">
                <Link href="/discography/full" className="block py-1 hover:text-accent">
                  FULL
                </Link>
                <Link href="/discography/awards" className="block py-1 hover:text-accent">
                  AWARDS
                </Link>
              </div>
            </div>
            
            <div className="block px-3 py-2 font-medium">
              SERVICES
              <div className="pl-4 mt-2 space-y-2">
                <Link href="/services/pricing" className="block py-1 hover:text-accent">
                  PRICING / SEND FILES
                </Link>
              </div>
            </div>
            
            <div className="block px-3 py-2 font-medium">
              ABOUT
              <div className="pl-4 mt-2 space-y-2">
                <Link href="/about/henry" className="block py-1 hover:text-accent">
                  ABOUT HENRY
                </Link>
              </div>
            </div>
            
            <Link href="/contact" className="block px-3 py-2 hover:text-accent font-medium">
              CONTACT
            </Link>
            
            <Link href="/pay" className="block px-3 py-2 hover:text-accent font-medium">
              PAY
            </Link>
            
            <button className="snipcart-checkout block px-3 py-2 hover:text-accent font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              CART (<span className="snipcart-items-count">0</span>)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
} 