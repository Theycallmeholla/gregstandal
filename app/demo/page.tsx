import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// This is a Server Component that reads the directories in /app/demo
export default async function DemoIndexPage() {
  const demoDir = path.join(process.cwd(), 'app/demo');
  const thumbnailsDir = path.join(process.cwd(), 'public', 'thumbnails');
  
  // Read all directories inside app/demo
  let routes: string[] = [];
  try {
    const entries = fs.readdirSync(demoDir, { withFileTypes: true });
    routes = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  } catch (error) {
    console.error('Failed to read demo directory:', error);
  }

  // Helper to format the route name for display
  const formatName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#002542] font-sans p-8 md:p-12 selection:bg-[#f70118]/20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-black tracking-tight mb-4 text-[#002542]">
            DEMO<span className="text-[#f70118]">PAGES</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Select a template below to view the live demo.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {routes.map((route) => {
            const hasThumbnail = fs.existsSync(path.join(thumbnailsDir, `${route}.png`));
            const imgSrc = hasThumbnail 
              ? `/thumbnails/${route}.png` 
              : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

            return (
            <Link 
              href={`/demo/${route}`} 
              key={route}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-slate-200 border-b-4 hover:border-b-[#f70118] hover:-translate-y-2"
            >
              {/* Thumbnail Container: exactly 16:9 ratio */}
              <div className="relative w-full overflow-hidden bg-slate-100 border-b border-slate-200" style={{ aspectRatio: '16/9' }}>
                <img 
                  src={imgSrc} 
                  alt={`${formatName(route)} Thumbnail`}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!hasThumbnail ? 'opacity-50' : ''}`}
                />
                
                {/* Overlay indicating it's clickable */}
                <div className="absolute inset-0 bg-[#002542]/0 group-hover:bg-[#002542]/10 transition-colors flex items-center justify-center">
                  <div className="bg-white text-[#002542] font-black text-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg transform translate-y-4 group-hover:translate-y-0">
                    View Demo
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-black text-[#002542] mb-2">{formatName(route)}</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  /demo/{route}
                </p>
              </div>
            </Link>
            );
          })}
        </div>
        
        {routes.length === 0 && (
          <div className="text-center p-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xl text-slate-500 font-medium">No demo routes found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
