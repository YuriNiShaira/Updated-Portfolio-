import React, { useState } from 'react';
import ProjectModal from './ProjectModal';

// Dynamically import all images from src/assets
const imageModules = import.meta.glob('/src/assets/*.{jpg,jpeg,png}', { eager: true });
const imageMap = {};
Object.keys(imageModules).forEach(path => {
  const filename = path.split('/').pop();
  imageMap[filename] = imageModules[path].default || imageModules[path];
});

const FALLBACK_IMAGE = 'https://via.placeholder.com/600x400/1A2A3A/facc15?text=Preview+Not+Found';

const projectsData = [
  {
    id: 1,
    title: 'Queuick',
    desc: 'Real-time queue management system with QR tracking and SMS notifications, deployed and used in a school environment.',
    tech: ['TypeScript', 'React', 'Django', 'DRF', 'PostgreSQL', 'WebSockets'],
    images: ['queuick.jpg', 'queuick1.jpg', 'queuick2.jpg', 'queuick3.jpg', 'queuick4.jpg', 'queuick5.jpg', 'queuick6.jpg', 'queuick7.jpg', 'queuick8.jpg', 'queuick9.jpg', 'queuick10.jpg', 'queuick11.jpg', 'queuick12.jpg', 'queuick13.jpg', 'queuick14.jpg', 'queuick15.jpg'],
    github: 'https://github.com/YuriNiShaira/queue-django-api',
    features: ['Real-time queue updates using WebSockets', 'QR-based ticket tracking and SMS notifications', 'Can see services and windows performance and can export csv via admin panel', 'Staff dashboard with queue controls (call, skip, recall)']
  },
  {
    id: 2,
    title: 'OJTrack',
    desc: 'Local OJT finder system that connects student to Company hiring OJT\'s',
    tech: ['Django', 'DRF', 'SQLite', 'React', 'ChakraUI'],
    images: ['ojt1.jpg', 'ojt2.jpg', 'ojt3.jpg', 'ojt4.jpg', 'ojt5.jpg', 'ojt6.jpg', 'ojt7.jpg', 'ojt8.jpg'],
    github: 'https://github.com/YuriNiShaira/OJT-tracking-system',
    features: ['3 role users admin/company/student', 'JWT Cookie-Based Authentication.']
  },
  {
    id: 3,
    title: 'Social Web',
    desc: 'A social media platform focused on developer communities with real-time messaging and posts.',
    tech: ['React', 'Django', 'DRF', 'ChakraUI'],
    images: ['hub1.jpg', 'hub2.jpg', 'hub3.jpg', 'hub4.jpg'],
    github: 'https://github.com/YuriNiShaira/Simple-Social-Web',
    features: ['User profiles and following system', 'Post creation, likes and comment', 'Notifications', 'Deployed', 'Can update profile and others']
  },
  {
    id: 4,
    title: 'Chatroom',
    desc: 'A simple chatroom using AJAX that lets users send and receive messages in real time without reloading the page',
    tech: ['Django', 'HTML', 'SQLite', 'JavaScript', 'AJAX'],
    images: ['chatroom1.jpg', 'chatroom2.jpg'],
    github: 'https://github.com/YuriNiShaira/chatapp',
    features: ['Real-time messaging', 'AJAX-based updates without reload']
  },
  {
    id: 5,
    title: 'E-Commerce',
    desc: 'A full-featured e-commerce platform with product management, cart, and payment integration.',
    tech: ['Django', 'DRF', 'PostgreSQL', 'Stripe', 'Redis'],
    images: ['shop1.jpg', 'shop2.jpg', 'shop3.jpg', 'shop4.jpg', 'shop5.jpg', 'shop6.jpg'],
    github: 'https://github.com/YuriNiShaira/e-commerse-',
    features: ['Product catalog & search', 'Order management system', 'Mock data']
  },
  {
    id: 6,
    title: 'To-do List App',
    desc: 'A desktop app built with PyQt5 to add, track, and mark tasks as complete efficiently.',
    tech: ['Python', 'PYQT5', 'CSS'],
    images: ['todo.jpg'],
    github: 'https://github.com/YuriNiShaira/Python-PYQT5/blob/main/todo%20PYQT5.py',
    features: ['Add and manage tasks', 'Mark tasks as complete', 'Persistent storage', 'Search and filter tasks']
  }
];

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 3);

  return (
    <section id="projects" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-[#facc15]">Projects</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Here are some projects I've built to practice coding
        </p>
        
        {/* Modernized Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {visibleProjects.map(proj => (
            <div 
              key={proj.id} 
              className="glass-card flex flex-col justify-between rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(250,204,21,0.15)] group border border-white/5 hover:border-[#facc15]/30"
            >
              {/* Image Container with Precise Proportions */}
              <div 
                className="aspect-[16/10] bg-gradient-to-br from-[#1A2A3A] to-[#0A192F] relative overflow-hidden cursor-pointer" 
                onClick={() => setSelectedProject(proj)}
              >
                <img 
                  src={imageMap[proj.images[0]] || FALLBACK_IMAGE} 
                  alt={proj.title} 
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-[#facc15] text-[#0A192F] px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Click to view Gallery
                  </span>
                </div>
              </div>

              {/* Dynamic Content Body (aligns all items inside rows cleanly) */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-[#facc15] transition-colors duration-300">
                  {proj.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {proj.desc}
                </p>
                
                {/* Clean, Non-distracting Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.tech.slice(0, 4).map(t => (
                    <span key={t} className="px-2.5 py-0.5 bg-[#1A2A3A]/40 text-gray-300 text-[11px] font-medium rounded-md border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* Modern Custom Vector List Bullets */}
                <ul className="space-y-2.5 mb-6 mt-auto">
                  {proj.features.slice(0, 2).map(f => (
                    <li key={f} className="text-gray-400 text-xs flex items-start gap-2.5">
                      <svg className="w-3.5 h-3.5 text-[#facc15] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="line-clamp-2 leading-normal">{f}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Solid Interactive Button CTA */}
                <a 
                  href={proj.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-[#facc15] text-[#0A192F] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-yellow-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all duration-300 w-full mt-2"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {projectsData.length > 3 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#facc15] text-[#facc15] font-medium rounded-lg hover:bg-[#facc15] hover:text-[#0A192F] transition-all duration-300 group"
            >
              <span>{showAll ? 'Show less' : 'View all projects'}</span>
              <svg 
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
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