import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co',    // Spotify CDN for album artwork
      'scdn.co',      // Another Spotify CDN domain
      'image-cdn.hypb.st', // Just in case images come from this domain
    ],
  },
};

export default nextConfig;
