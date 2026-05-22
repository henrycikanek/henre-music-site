import Layout from "@/components/Layout";
import Link from "next/link";
import { 
  MusicalNoteIcon, 
  SpeakerWaveIcon, 
  RocketLaunchIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";

const serviceOptions = [
  {
    id: "mix",
    name: "Mix",
    price: 200,
    description: "Professional mix with 3 rounds of revisions, delivery in 5-7 days",
    image: "/images/services/mixing.jpg",
    icon: SpeakerWaveIcon,
  },
  {
    id: "master",
    name: "Master",
    price: 100,
    description: "Professional mastering for streaming and digital distribution, 2 revisions",
    image: "/images/services/mastering.jpg",
    icon: MusicalNoteIcon,
  },
  {
    id: "beat",
    name: "Production",
    price: 300,
    description: "Custom beat production with 3 rounds of revisions, delivery in 10-14 days",
    image: "/images/services/beat-production.jpg",
    icon: RocketLaunchIcon,
  },
  {
    id: "vocal-engineering",
    name: "Vocal Engineering",
    price: 100,
    description: "Professional vocal recording and engineering (LA locals only)",
    image: "/images/services/mixing.jpg",
    icon: MicrophoneIcon,
  },
];

export default function PayPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Services</h1>
        <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-12">Select a service and purchase securely.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {serviceOptions.map(service => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="bg-gray-900 p-6 rounded-lg border border-white/10 hover:border-accent/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="mr-3 p-2 bg-accent/10 rounded-full">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </span>
                    <h3 className="text-xl font-bold">{service.name}</h3>
                  </div>
                  <span className="text-lg font-semibold text-accent">${service.price}</span>
                </div>
                <p className="text-white/70 text-sm mb-6">{service.description}</p>
                
                <button
                  className="snipcart-add-item w-full py-2 bg-accent text-gray-900 rounded-md font-medium hover:bg-accent/90 transition flex items-center justify-center"
                  data-item-id={service.id}
                  data-item-price={service.price}
                  data-item-url={`/api/services?id=${service.id}`}
                  data-item-description={service.description}
                  data-item-image={service.image}
                  data-item-name={service.name}
                >
                  <span className="mr-2">Add to Cart</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="mr-3 p-2 bg-accent/10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </span>
            <h2 className="text-xl font-bold">Need something custom?</h2>
          </div>
          <p className="text-white/80 mb-6">
            If you need a custom service package or have specific requirements, please get in touch.
            I&apos;ll be happy to create a custom quote for your project.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-accent text-gray-900 font-semibold rounded-md hover:bg-accent/90 transition"
            >
              <span className="mr-2">Request Custom Quote</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
