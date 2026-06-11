import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

// Import all images from src/assets
const imageModules = import.meta.glob('/src/assets/*.{jpg,jpeg,png}', { eager: true });
const imageMap = {};
Object.keys(imageModules).forEach(path => {
  const filename = path.split('/').pop();
  imageMap[filename] = imageModules[path].default;
});

const projectsData = [
  {
    id: 1,
    title: 'LogOfUs',
    desc: 'Multi-tenant SaaS relationship diary for couples to document memories, milestones, and shared experiences together. Designed with strict data isolation and cross-partner syncing mechanics.',
    tech: ['TypeScript', 'React', 'DRF', 'PostgreSQL', 'Supabase', 'JWT', 'Tailwind CSS'],
    images: ['log.jpg', 'log1.jpg', 'log2.jpg', 'log3.jpg', 'log4.jpg', 'log5.jpg', 'log6.jpg', 'log7.jpg'],
    github: 'https://github.com/YuriNiShaira/logofus',
    liveDemo: 'https://logofus.vercel.app/',
    features: [
      "Multi-tenant architecture with couple‑based data isolation",
      "JWT authentication with token refresh and secure logout",
      "Invite‑code partner linking system",
      "Shared timeline, bucket list, watchlist, playlist, and couple games",
      "Memory calendar with book‑style",
      "Dark/light mode with animated cherry blossom and starry backgrounds",
    ]
  },
  {
    id: 2,
    title: 'Queuick',
    desc: 'A real-time queue management system optimized for institutional environments. Deployed and battle-tested in a live school ecosystem to streamline registrar and student service window performance.',
    tech: ['TypeScript', 'React', 'Django', 'DRF', 'PostgreSQL', 'WebSockets'],
    images: ['queuick.jpg', 'queuick1.jpg', 'queuick2.jpg', 'queuick3.jpg', 'queuick5.jpg', 'queuick6.jpg', 'queuick7.jpg', 'queuick8.jpg', 'queuick10.jpg', 'queuick11.jpg', 'queuick12.jpg', 'queuick13.jpg', 'queuick14.jpg', 'queuick15.jpg',],
    github: 'https://github.com/YuriNiShaira/queue-django-api',
    features: [
      'Real-time bi-directional queue updates powered by WebSockets',
      'Integrated QR-based ticket tracking',
      'Automated SMS notifications for queue status updates',
      'Comprehensive analytics dashboard with CSV/PDF export for service performance',
      'Multi-counter / multi-service queue management system',
      'staff panel with full control over queue flow (call, skip, reset, delete)',
      'Live display screen for public queue monitoring',
      'Mobile-responsive interface for users and staff',
    ]
  },
  {
    id: 3,
    title: 'OJTrack',
    desc: 'A dedicated three-tier matching system connecting students looking for critical apprenticeship opportunities directly with authenticated corporate partners.',
    tech: ['Django', 'DRF', 'SQLite', 'React', 'ChakraUI'],
    images: ['ojt1.jpg', 'ojt2.jpg', 'ojt3.jpg', 'ojt4.jpg', 'ojt5.jpg', 'ojt6.jpg' , 'ojt7.jpg', 'ojt8.jpg'],
    github: 'https://github.com/YuriNiShaira/OJT-tracking-system',
    features: [
      'Granular 3-role access control (Admin, Company, and Student portals)',
      'Secure, HTTP-only Cookie-Based JWT Authentication mapping',
      'Real-time student application progression and pipeline dashboard tracking'
    ]
  },
  {
    id: 4,
    title: 'Social Web',
    desc: 'A social media platform for developer communities with real‑time messaging, posts, likes, and comment threads.',
    tech: ['React', 'Django', 'DRF', 'ChakraUI'],
    images: ['hub1.jpg', 'hub2.jpg', 'hub3.jpg', 'hub4.jpg'],
    github: 'https://github.com/YuriNiShaira/Simple-Social-Web',
    features: [
      'User profiles with follow/unfollow system',
      'Post creation, likes, and nested comments',
    ]
  },
  {
    id: 5,
    title: 'Chatroom',
    desc: 'A lightweight AJAX‑powered chatroom that enables real‑time messaging without full page reloads.',
    tech: ['Django', 'HTML', 'SQLite', 'JavaScript', 'AJAX'],
    images: ['chatroom1.jpg', 'chatroom2.jpg'],
    github: 'https://github.com/YuriNiShaira/chatapp',
    features: [
      'Asynchronous message posting with zero page refresh',
      'Simple, fast, and mobile‑friendly interface',
      'Ideal for understanding AJAX fundamentals'
    ]
  },
  {
    id: 6,
    title: 'E‑Commerce',
    desc: 'A full‑featured online store with product catalog, shopping cart, order management, and mock payment integration.',
    tech: ['Django', 'DRF', 'PostgreSQL', 'Stripe', 'Redis'],
    images: ['shop1.jpg', 'shop2.jpg', 'shop3.jpg', 'shop4.jpg', 'shop5.jpg', 'shop6.jpg'],
    github: 'https://github.com/YuriNiShaira/e-commerse-',
    features: [
      'Product catalog with search and filtering',
      'Shopping cart and checkout simulation',
      'Order history and admin dashboard',
      'Mock Stripe payment flow'
    ]
  },
  {
    id: 7,
    title: 'To‑do List App',
    desc: 'A feature‑rich desktop task manager built with PyQt5 – add, complete, search, and persist tasks locally.',
    tech: ['Python', 'PyQt5', 'CSS'],
    images: ['todo.jpg'],
    github: 'https://github.com/YuriNiShaira/Python-PYQT5/blob/main/todo%20PYQT5.py',
    features: [
      'Add, edit, and delete tasks',
      'Mark tasks as complete with one click',
      'Search and filter by completion status'
    ]
  }
];

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 3);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-24">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#00E5FF] text-sm tracking-widest uppercase font-semibold">03.</span>
            <span className="w-12 h-[1px] bg-[#00E5FF]/50"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Featured <span className="text-[#00E5FF]">Projects</span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-xl text-center text-base font-light">
            A selection of my technical projects, highlighting core features and technologies used.
          </p>
        </div>

        {/* Alternating Feature List Container */}
        <div className="space-y-24 md:space-y-40">
          {visibleProjects.map((proj, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={proj.id} 
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center group`}
              >
                
                {/* --- IMAGE BLOCK WITH HUD FRAME --- */}
                <div className="w-full md:w-1/2 relative p-2 md:p-3">
                  
                  {/* Animating HUD Targeting Brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00E5FF]/30 group-hover:border-[#00E5FF] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-20 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00E5FF]/30 group-hover:border-[#00E5FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00E5FF]/30 group-hover:border-[#00E5FF] group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-300 z-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00E5FF]/30 group-hover:border-[#00E5FF] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 z-20 pointer-events-none"></div>

                  <div 
                    onClick={() => setSelectedProject(proj)}
                    className="relative block rounded-sm overflow-hidden bg-[#0B1B2E] shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer group-hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all duration-500 aspect-[16/10] z-10"
                  >
                    {/* Fallback text */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold tracking-wider uppercase text-sm">
                      Preview Not Available
                    </div>
                    
                    <img 
                      src={imageMap[proj.images[0]]} 
                      alt={proj.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-100" 
                    />
                    
                    {/* Scanning Grid & Hover overlay */}
                    <div className="absolute inset-0 bg-[#030712]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-[2px]">
                      
                      {/* Subtle CSS Scanline Effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
                      
                      <span className="bg-[#00E5FF]/10 border border-[#00E5FF] text-[#00E5FF] px-5 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 relative z-30">
                        View Screenshots
                      </span>
                    </div>
                  </div>
                </div>

                {/* --- CONTENT BLOCK --- */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-[#00E5FF] font-mono text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse"></span>
                    Project // 0{proj.id}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-[#00E5FF] transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-6">
                    {proj.desc}
                  </p>

                  {/* Feature Bullets */}
                  <div className="mb-6">
                    <ul className="space-y-3">
                      {proj.features.map((f, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start gap-3 font-light">
                          <span className="text-[#00E5FF] shrink-0 text-xs mt-1">▹</span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tech.map(t => (
                      <span 
                        key={t} 
                        className="px-3 py-1.5 bg-[#0B1B2E]/60 text-[#00E5FF] text-xs tracking-wide rounded-sm border border-[#00E5FF]/20 cursor-default hover:bg-[#00E5FF]/10 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Operational Controls */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-gray-600 hover:border-[#00E5FF]/50 text-gray-300 hover:text-[#00E5FF] hover:bg-[#00E5FF]/5 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      Code
                    </a>
                    
                    {proj.liveDemo && (
                      <a 
                        href={proj.liveDemo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#030712] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More / Show Less Button */}
        {projectsData.length > 3 && (
          <div className="text-center mt-24">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#00E5FF] text-[#00E5FF] text-sm font-semibold tracking-widest uppercase rounded-sm hover:bg-[#00E5FF] hover:text-[#030712] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              <span>{showAll ? 'Show Less' : 'View All Projects'}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-1'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};

export default Projects;