import { NextApiRequest, NextApiResponse } from 'next';

const getAbsoluteURL = (req: NextApiRequest, path: string) => {
  const baseURL = process.env.NODE_ENV === 'production' 
    ? `https://${req.headers.host}` 
    : 'http://localhost:3000';
  
  return `${baseURL}${path}`;
};

const getServices = (req: NextApiRequest) => [
  {
    id: "mix",
    name: "Mix",
    price: 200,
    description: "Professional mix with 3 rounds of revisions, delivery in 5-7 days",
    image: getAbsoluteURL(req, "/images/services/mixing.jpg")
  },
  {
    id: "master",
    name: "Master",
    price: 100,
    description: "Professional mastering for streaming and digital distribution, 2 revisions",
    image: getAbsoluteURL(req, "/images/services/mastering.jpg")
  },
  {
    id: "beat",
    name: "Production",
    price: 300,
    description: "Custom beat production with 3 rounds of revisions, delivery in 10-14 days",
    image: getAbsoluteURL(req, "/images/services/beat-production.jpg")
  },
  {
    id: "vocal-engineering",
    name: "Vocal Engineering",
    price: 100,
    description: "Professional vocal recording and engineering (LA locals only)",
    image: getAbsoluteURL(req, "/images/services/mixing.jpg")
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  const services = getServices(req);

  if (id && typeof id === 'string') {
    const service = services.find(service => service.id === id);
    
    if (!service) {
      return res.status(404).json({ message: `Service with ID ${id} not found` });
    }
    
    return res.status(200).json(service);
  }

  return res.status(200).json(services);
}
