import { NextApiRequest, NextApiResponse } from 'next';

// Helper function to generate absolute URLs for images
const getAbsoluteURL = (req: NextApiRequest, path: string) => {
  // In production, use the host from the request
  // In development, use localhost:3000
  const baseURL = process.env.NODE_ENV === 'production' 
    ? `https://${req.headers.host}` 
    : 'http://localhost:3000';
  
  return `${baseURL}${path}`;
};

// Services data - these should match the services in your pay.tsx page
const getServices = (req: NextApiRequest) => [
  {
    id: "standard-mix",
    name: "Standard Mix",
    price: 150,
    description: "Professional mix for tracks with up to 24 stems",
    image: getAbsoluteURL(req, "/images/services/mixing.jpg")
  },
  {
    id: "premium-mix",
    name: "Premium Mix",
    price: 250,
    description: "Premium mix for complex arrangements with unlimited stems and 3 rounds of revisions",
    image: getAbsoluteURL(req, "/images/services/premium-mixing.jpg")
  },
  {
    id: "standard-master",
    name: "Standard Master",
    price: 75,
    description: "Professional mastering for streaming platforms and digital distribution",
    image: getAbsoluteURL(req, "/images/services/mastering.jpg")
  },
  {
    id: "premium-master",
    name: "Premium Master",
    price: 125,
    description: "Premium mastering with multiple formats (streaming, CD, vinyl) and 3 revisions",
    image: getAbsoluteURL(req, "/images/services/premium-mastering.jpg")
  },
  {
    id: "beat-production",
    name: "Beat Production",
    price: 350,
    description: "Custom beat production with up to 5 virtual instruments and 3 revisions",
    image: getAbsoluteURL(req, "/images/services/beat-production.jpg")
  },
  {
    id: "full-production",
    name: "Full Production",
    price: 550,
    description: "Full track production including arrangement, unlimited instruments, and mixing",
    image: getAbsoluteURL(req, "/images/services/full-production.jpg")
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get service ID from query params if present
  const { id } = req.query;
  const services = getServices(req);

  // If an ID is provided, return that specific service
  if (id && typeof id === 'string') {
    const service = services.find(service => service.id === id);
    
    if (!service) {
      return res.status(404).json({ message: `Service with ID ${id} not found` });
    }
    
    return res.status(200).json(service);
  }

  // Return all services for Snipcart validation
  return res.status(200).json(services);
} 