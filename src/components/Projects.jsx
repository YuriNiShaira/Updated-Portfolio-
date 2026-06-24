import React, { useState, useEffect, useCallback } from 'react';
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
    title: 'GitInsight',
    desc: 'A GitHub Analytics Dashboard that visualizes developer activity, contribution patterns, and repository insights. Built with a hybrid GraphQL + REST architecture for accurate commit tracking.',
    tech: ['React', 'Django', 'DRF', 'GraphQL', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    images: ['gitinsight1.jpg', 'gitinsight2.jpg', 'gitinsight3.jpg'],
    github: 'https://github.com/YuriNiShaira/Github-Analytics',
    liveDemo: 'https://github-analytics-7dkv.vercel.app/',
    features: [
      'Contribution tracking via GitHub GraphQL API',
      'Activity timeline with push event analysis',
      'Language distribution with interactive pie charts',
      'User comparison and developer benchmarking',
      'Export analytics reports to PDF',
      'Redis‑powered caching for fast response times',
      'Dark/light mode with persistent user preference'
    ]
  },
  {
    id: 3,
    title: 'Queuick',
    desc: 'A real-time queue management system optimized for institutional environments. Deployed and battle-tested in a live school ecosystem to streamline registrar and student service window performance.',
    tech: ['TypeScript', 'React', 'Django', 'DRF', 'PostgreSQL', 'WebSockets', 'Docker'],
    images: ['queuick.jpg', 'queuick1.jpg', 'queuick2.jpg', 'queuick3.jpg', 'queuick5.jpg', 'queuick6.jpg', 'queuick7.jpg', 'queuick8.jpg', 'queuick10.jpg', 'queuick11.jpg', 'queuick12.jpg', 'queuick13.jpg', 'queuick14.jpg', 'queuick15.jpg'],
    github: 'https://github.com/YuriNiShaira/queue-django-api',
    features: [
      'Real-time bi-directional queue updates powered by WebSockets',
      'Integrated QR-based ticket tracking',
      'Automated SMS notifications for queue status updates',
      'Comprehensive analytics dashboard with CSV/PDF export for service performance',
      'Multi-counter / multi-service queue management system',
      'Staff panel with full control over queue flow (call, skip, reset, delete)',
      'Live display screen for public queue monitoring',
      'Mobile-responsive interface for users and staff',
    ]
  },
  {
    id: 4,
    title: 'Portfolio Analytics',
    desc: 'A full-stack MERN analytics dashboard that tracks real-time visitor data, project views, and engagement metrics for my developer portfolio. Built with MongoDB, Express, React, and Node.js.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Recharts', 'Tailwind CSS'],
    images: ['analytics1.jpg', 'analytics2.jpg', 'analytics3.jpg', 'analytics4.jpg', 'analytics5.jpg'],
    github: 'https://github.com/YuriNiShaira/portfolio-analytics',
    liveDemo: 'https://portfolioniyurisho.vercel.app',
    features: [
      'Real-time visitor tracking with anonymous session management',
      'Interactive data visualizations using Recharts (daily visitors, page views)',
      'Event tracking for project views, resume downloads, and social media clicks',
      'MongoDB aggregation pipelines for analytics processing',
      'Full-stack MERN deployment on Vercel + Render'
    ]
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const numProjects = projectsData.length;

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % numProjects);
  }, [numProjects]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + numProjects) % numProjects);
  }, [numProjects]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Track project view when card is clicked
  const handleCardClick = (index, isCenter, proj) => {
    if (isCenter) {
      // Open the modal
      setSelectedProject(proj);
      
      // TRACK THE PROJECT VIEW
      console.log(`📊 Tracking project view: ${proj.title}`);
      
      const apiUrl = import.meta.env.VITE_API_URL || 'https://backend-portfolio-wamf.onrender.com/api';
      
      fetch(`${apiUrl}/track-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // CRITICAL for cross-domain cookie tracking
        body: JSON.stringify({
          eventType: 'project_view',
          target: proj.title
        })
      })
      .then(response => response.json())
      .then(data => console.log('✅ Project view tracked:', data))
      .catch(err => console.error('❌ Tracking failed:', err));

    } else {
      // Navigate to that project in the carousel
      setCurrentIndex(index);
    }
  };

  const getCardStyles = (index) => {
    const diff = (index - currentIndex + numProjects) % numProjects;

    if (diff === 0) {
      return "translate-x-0 scale-100 z-40 opacity-100 pointer-events-auto blur-0";
    } else if (diff === 1 || diff === -(numProjects - 1)) {
      return "translate-x-[90%] md:translate-x-[110%] scale-[0.80] z-30 opacity-20 hover:opacity-60 blur-[3px] hover:blur-none cursor-pointer";
    } else if (diff === numProjects - 1 || diff === -1) {
      return "-translate-x-[90%] md:-translate-x-[110%] scale-[0.80] z-30 opacity-20 hover:opacity-60 blur-[3px] hover:blur-none cursor-pointer";
    } else {
      return "translate-x-0 scale-[0.60] z-10 opacity-0 pointer-events-none blur-md";
    }
  };

  return (
    <section id="projects" className="py-24 relative z-10 overflow-hidden">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#00E5FF] text-base tracking-widest uppercase font-semibold">03.</span>
            <span className="w-16 h-[1px] bg-[#00E5FF]/50"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Featured <span className="text-[#00E5FF]">Projects</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-[850px] md:h-[650px] flex items-center justify-center perspective-[1200px]">
          
          {/* Left Navigation Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-6 z-[100] p-2.5 md:p-3 rounded-full border border-gray-600/50 bg-[#0B1B2E]/80 text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label="Previous Project"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards Wrapper */}
          <div className="relative w-full max-w-[340px] md:max-w-[1150px] h-full flex items-center justify-center">
            {projectsData.map((proj, index) => {
              const wrapperStyles = getCardStyles(index);
              const isCenter = (index - currentIndex + numProjects) % numProjects === 0;

              return (
                <div 
                  key={proj.id}
                  onClick={() => handleCardClick(index, isCenter, proj)}
                  className={`absolute w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col md:flex-row gap-8 md:gap-16 items-center ${wrapperStyles}`}
                >
                    
                  {/* --- LEFT: IMAGE BLOCK --- */}
                  <div className="w-full md:w-[55%] relative shrink-0 group">
                    
                    {/* HUD Targeting Brackets */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#00E5FF]/40 z-20 pointer-events-none transition-colors duration-300 group-hover:border-[#00E5FF]"></div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#00E5FF]/40 z-20 pointer-events-none transition-colors duration-300 group-hover:border-[#00E5FF]"></div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#00E5FF]/40 z-20 pointer-events-none transition-colors duration-300 group-hover:border-[#00E5FF]"></div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#00E5FF]/40 z-20 pointer-events-none transition-colors duration-300 group-hover:border-[#00E5FF]"></div>

                    {/* Image Container */}
                    <div className="relative block overflow-hidden shadow-2xl aspect-[16/10] z-10 bg-[#0B1B2E]">
                      {proj.images[0] ? (
                        <img 
                          src={imageMap[proj.images[0]]} 
                          alt={proj.title} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold uppercase tracking-widest text-sm">
                          Preview Not Available
                        </div>
                      )}
                      
                      {/* Click to Expand Overlay */}
                      {isCenter && (
                        <div className="absolute inset-0 bg-[#030712]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-center justify-center backdrop-blur-[2px]">
                          <span className="text-white px-6 py-3 text-sm font-bold tracking-widest uppercase border border-white/30 bg-black/50">
                            Click to Expand
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* --- RIGHT: CONTENT BLOCK --- */}
                  <div className="w-full md:w-[45%] flex flex-col justify-center">
                    
                    {/* Project Number */}
                    <span className="text-[#00E5FF] font-mono text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#00E5FF] rounded-full"></span>
                      Project // 0{proj.id}
                    </span>

                    {/* Title */}
                    <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                      {proj.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-8">
                      {proj.desc}
                    </p>

                    {/* Feature Bullets */}
                    <div className="mb-8">
                      <ul className="space-y-3.5">
                        {proj.features.slice(0, 5).map((f, idx) => (
                          <li key={idx} className="text-gray-300 text-sm md:text-base flex items-start gap-3 font-light">
                            <span className="text-[#00E5FF] shrink-0 mt-1">
                              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                            <span className="leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2.5 mb-10">
                      {proj.tech.map(t => (
                        <span 
                          key={t} 
                          className="px-3.5 py-1.5 bg-transparent border border-[#00E5FF]/30 text-[#00E5FF] text-xs md:text-sm font-medium tracking-wide rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Operational Controls */}
                    <div className="flex items-center gap-5 mt-auto">
                      <a 
                        href={proj.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3.5 bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 rounded text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        Code
                      </a>
                      
                      {proj.liveDemo && (
                        <a 
                          href={proj.liveDemo} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3.5 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#020611] rounded text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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

          {/* Right Navigation Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-6 z-[100] p-2.5 md:p-3 rounded-full border border-gray-600/50 bg-[#0B1B2E]/80 text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF] transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            aria-label="Next Project"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
        
        {/* Pagination Dots Indicator */}
        <div className="flex justify-center items-center gap-4 mt-6 md:mt-12">
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex 
                  ? 'w-8 h-2 bg-[#00E5FF]' 
                  : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};

export default Projects;