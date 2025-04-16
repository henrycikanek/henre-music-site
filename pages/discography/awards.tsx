import Layout from "@/components/Layout";

export default function AwardsDiscography() {
  const awards = [
    {
      id: 1,
      award: "Spotify Editorial Playlist Placement",
      organization: "Spotify",
      project: "Be - Henre",
      year: "2020"
    },
    {
      id: 2,
      award: "Featured on 'Fresh Finds'",
      organization: "Spotify",
      project: "Technicolor - Henre",
      year: "2023"
    },
    {
      id: 3,
      award: "Radio Play",
      organization: "BBC Radio 1Xtra",
      project: "MET YOU AT A BAR - Jaz Karis, Tone Stith",
      year: "2024"
    },
    {
      id: 4,
      award: "New Music Friday Playlist Feature",
      organization: "Spotify",
      project: "TEQUILA - Jaz Karis, Reekado Banks",
      year: "2024"
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">Recognition & Features</h1>
        <p className="text-lg text-white/80 mb-12">Projects that have received notable recognition and features in the industry.</p>
        
        <div className="space-y-8">
          {awards.map((award) => (
            <div key={award.id} className="bg-gray-900 p-8 rounded-lg border-l-4 border-accent">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">{award.award}</h2>
                  <div className="text-white/80">{award.organization}</div>
                  <div className="text-accent mt-3">{award.project}</div>
                </div>
                <div className="mt-4 md:mt-0 bg-black/30 px-4 py-2 rounded-full text-white/70">
                  {award.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
} 