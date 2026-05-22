import Layout from "@/components/Layout";
import Link from "next/link";

const services = [
  {
    id: "mixing",
    submitId: "mix",
    name: "Mix",
    price: "$200",
    perUnit: "per track",
    description: "Professional mixing to give your tracks clarity, depth, and balance.",
    features: [
      "3 rounds of revisions",
      "Delivery in 5-7 days",
      "Stems available on request",
    ],
  },
  {
    id: "mastering",
    submitId: "master",
    name: "Master",
    price: "$100",
    perUnit: "per track",
    description: "Final polish to make your tracks sound competitive on all platforms.",
    features: [
      "2 revisions",
      "Delivery in 3-5 days",
    ],
  },
  {
    id: "production",
    submitId: "beat",
    name: "Production",
    price: "$300",
    perUnit: "per track",
    description: "Custom beat production to bring your musical ideas to life.",
    features: [
      "Arrangement included",
      "3 rounds of revisions",
      "Delivery in 10-14 days",
    ],
  },
  {
    id: "vocal-engineering",
    submitId: "vocal-engineering",
    name: "Vocal Engineering",
    price: "$100",
    perUnit: "per song",
    description: "Professional vocal recording and engineering sessions.",
    caveat: "*** Only available for LA locals ***",
    features: [
      "In-studio vocal recording",
      "Vocal tuning and editing",
      "Comping and alignment",
    ],
  },
];

export default function Services() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Services</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {services.map((service) => (
            <Link
              key={service.id}
              id={service.id}
              href={`/submit?service=${service.submitId}`}
              className="bg-gray-900 rounded-lg overflow-hidden flex flex-col hover:bg-gray-800 transition duration-300 group"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold mb-1 group-hover:text-accent transition duration-300">{service.name}</h2>
                <p className="text-white/70 text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-accent">
                    {service.price}
                  </span>
                  <span className="text-white/60 ml-1">{service.perUnit}</span>
                </div>
                {service.caveat && (
                  <p className="text-accent/80 text-xs mt-2">{service.caveat}</p>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-accent flex-shrink-0 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <span className="block w-full bg-transparent group-hover:bg-accent text-transparent group-hover:text-white text-center font-semibold py-3 rounded-md transition duration-300">
                    Get Started
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* How to Submit */}
        <div className="bg-gray-900 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-6">How to Submit</h2>
          <div className="space-y-6 text-white/80">
            <ol className="list-decimal list-inside space-y-3">
              <li>Pick a service above and fill out the{" "}
                <Link href="/submit" className="text-accent hover:underline">submission form</Link>
                {" "}with your project details
              </li>
              <li>Upload your files directly through the site on the next page</li>
              <li>I&apos;ll follow up within 24-48 hours</li>
            </ol>

            <div className="border-t border-white/10 pt-6 space-y-2">
              <p className="text-sm font-semibold text-white/90">Good to know</p>
              <p className="text-sm">
                For mixing, please provide well-organized stems in WAV format (16-bit, 44.1kHz minimum)
              </p>
              <p className="text-sm">
                For mastering, please provide the final stereo mix with at least 3-6dB of headroom
              </p>
            </div>
          </div>
        </div>

        {/* Custom Projects */}
        <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/30 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Package?</h2>
          <p className="max-w-2xl mx-auto mb-6 text-white/80">
            If you need something specific not offered here, hmu through 
            the contact form on the site and we can talk it through 
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white hover:bg-white/90 text-gray-900 font-semibold px-8 py-3 rounded-md transition duration-300"
          >
            Contact Me for Custom Quote
          </Link>
        </div>
      </div>
    </Layout>
  );
}
