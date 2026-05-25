import React from 'react';

// Organized floating icons to keep your JSX clean
const floatingIcons = [
  { name: 'Python', id: '1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Django', id: '2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', invert: true },
  { name: 'React', id: '3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', id: '4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'PostgreSQL', id: '5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'TypeScript', id: '6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
];

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden z-10">
      
      {/* Floating tech icons */}
      {floatingIcons.map((tech) => (
        <div key={tech.name} className={`tech-icon tech-icon-${tech.id}`}>
          <img 
            src={tech.icon} 
            className={`w-16 h-16 md:w-20 md:h-20 ${tech.invert ? 'brightness-0 invert' : ''}`} 
            alt={tech.name} 
          />
        </div>
      ))}

      {/* Background Glow Orbs (Kept exactly as requested) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#facc15]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#facc15]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Welcome Badge */}
        <div className="inline-flex items-center gap-2 welcome-badge rounded-full px-4 py-2 mb-8 border border-[#facc15]/20 bg-[#facc15]/5">
          <span className="w-2 h-2 bg-[#facc15] rounded-full animate-pulse shadow-[0_0_10px_#facc15]"></span>
          <span className="text-sm text-gray-300 tracking-wide">Web Developer</span>
        </div>
        
        {/* Name - Fixed Spacing using Flexbox and gap */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 flex flex-wrap justify-center gap-3 md:gap-5">
          <span className="text-[#facc15] inline-block hover:scale-105 transition-transform duration-300 cursor-default">
            Yuri
          </span>
          <span className="text-gray-200 inline-block hover:scale-105 transition-transform duration-300 cursor-default">
            Mauricio
          </span>
        </h1>
        
        {/* Subtitle */}
        <div className="h-20 mb-6">
          <h2 className="text-xl md:text-3xl text-gray-300 font-light flex flex-wrap items-center justify-center gap-2">
            <span>Still learning. Always building. Never settling.</span>
            <span className="text-[#facc15] animate-wave inline-block origin-bottom-right">😽</span>
          </h2>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-4">
          <a href="#projects" className="group relative px-8 py-4 bg-[#facc15] text-[#0A192F] font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] hover:-translate-y-1 w-full sm:w-auto text-center overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Projects
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
          <a href="#contact" className="group px-8 py-4 border-2 border-[#facc15] text-[#facc15] font-bold rounded-lg transition-all duration-300 hover:bg-[#facc15] hover:text-[#0A192F] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-2">
            <span>Contact Me</span>
            <svg className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
        <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-[#facc15] transition-colors duration-300 group">
          <span className="text-sm mb-3 font-medium tracking-widest uppercase text-xs">Scroll Down</span>
          <div className="w-7 h-12 border-2 border-gray-400 rounded-full group-hover:border-[#facc15] transition-colors flex justify-center p-1">
            <div className="w-1.5 h-3 bg-gray-400 group-hover:bg-[#facc15] rounded-full mt-1 animate-scroll transition-colors"></div>
          </div>
        </a>
      </div>
      
    </section>
  );
};

export default Hero;