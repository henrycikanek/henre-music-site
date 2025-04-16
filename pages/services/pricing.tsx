import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Pricing() {
  // Get references to each section for scrolling
  const mixingRef = useRef<HTMLDivElement>(null);
  const masteringRef = useRef<HTMLDivElement>(null);
  const productionRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  
  // Handle hash navigation when the component mounts
  useEffect(() => {
    // Get the hash from the URL (e.g., #mixing)
    const hash = router.asPath.split('#')[1];
    
    // Scroll to the appropriate section based on the hash
    if (hash === 'mixing' && mixingRef.current) {
      mixingRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === 'mastering' && masteringRef.current) {
      masteringRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === 'production' && productionRef.current) {
      productionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.asPath]);

  const services = [
    {
      id: "mixing",
      ref: mixingRef,
      name: "Mixing",
      description: "Professional mixing to give your tracks clarity, depth, and balance.",
      tiers: [
        {
          name: "Standard",
          price: "$150",
          perUnit: "per track",
          features: [
            "Up to 24 tracks",
            "2 rounds of revisions",
            "Delivery in 5-7 days",
            "Stems available for +$50"
          ]
        },
        {
          name: "Premium",
          price: "$250",
          perUnit: "per track",
          features: [
            "Unlimited tracks",
            "3 rounds of revisions",
            "Delivery in 3-5 days",
            "Stems included",
            "Pre-mix consultation call"
          ]
        }
      ]
    },
    {
      id: "mastering",
      ref: masteringRef,
      name: "Mastering",
      description: "Final polish to make your tracks sound competitive on all platforms.",
      tiers: [
        {
          name: "Standard",
          price: "$75",
          perUnit: "per track",
          features: [
            "2 revisions",
            "Delivery in 3-5 days",
            "Streaming and CD masters"
          ]
        },
        {
          name: "Premium",
          price: "$125",
          perUnit: "per track",
          features: [
            "3 revisions",
            "Delivery in 1-2 days",
            "Streaming, CD, and vinyl masters",
            "Instrumental version",
            "Mastering consultation call"
          ]
        }
      ]
    },
    {
      id: "production",
      ref: productionRef,
      name: "Production",
      description: "Full production services to bring your musical ideas to life.",
      tiers: [
        {
          name: "Standard",
          price: "$350",
          perUnit: "per track",
          features: [
            "Arrangement",
            "3 rounds of revisions",
            "Delivery in 10-14 days",
            "Up to 5 virtual instruments"
          ]
        },
        {
          name: "Premium",
          price: "$550",
          perUnit: "per track",
          features: [
            "Arrangement",
            "Unlimited revisions",
            "Delivery in 7-10 days",
            "Unlimited virtual instruments",
            "Mixing included"
          ]
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">Pricing & Services</h1>
        <p className="text-lg text-white/80 mb-12">Transparent pricing for professional music services.</p>
        
        {/* File Submission Instructions */}
        <div className="bg-gray-900 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-4">How to Submit Files</h2>
          <div className="space-y-4 text-white/80">
            <p>
              To get started with any service, please follow these steps:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Contact me via the <Link href="/contact" className="text-accent hover:underline">contact form</Link> with details about your project</li>
              <li>I'll provide a custom quote based on your specific needs</li>
              <li>Once you approve, you'll receive a secure link to upload your files</li>
              <li>For mixing projects, please provide well-organized, tracked-out stems in WAV format (24-bit, 48kHz minimum)</li>
              <li>For mastering, please provide the final stereo mix with at least 3-6dB of headroom</li>
            </ol>
            <p className="mt-4">
              If you have any questions or special requirements, don't hesitate to reach out!
            </p>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button 
            onClick={() => mixingRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition"
          >
            Mixing
          </button>
          <button 
            onClick={() => masteringRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition"
          >
            Mastering
          </button>
          <button 
            onClick={() => productionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition"
          >
            Production
          </button>
        </div>
        
        {/* Service Tiers */}
        <div className="space-y-16">
          {services.map((service) => (
            <div key={service.id} id={service.id} ref={service.ref} className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
              <p className="text-white/80 mb-8">{service.description}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {service.tiers.map((tier, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                      <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                      <div className="flex items-end">
                        <span className="text-3xl font-bold text-accent">{tier.price}</span>
                        <span className="text-white/60 ml-1">{tier.perUnit}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {tier.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start">
                            <svg className="h-5 w-5 text-accent flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <Link
                          href="/contact"
                          className="block w-full bg-accent hover:bg-accent/90 text-black text-center font-semibold py-3 rounded-md transition duration-300"
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Custom Projects */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Package?</h2>
          <p className="max-w-2xl mx-auto mb-6 text-white/80">
            If you need a tailored solution for your project or want to discuss album rates, 
            ongoing collaboration, or any special requirements, I'm happy to create a custom package for you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white hover:bg-white/90 text-black font-semibold px-8 py-3 rounded-md transition duration-300"
          >
            Contact Me for Custom Quote
          </Link>
        </div>
      </div>
    </Layout>
  );
} 