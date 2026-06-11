import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 relative overflow-hidden z-10">
      
      {/* Holographic tech icons */}
      <div className="tech-icon tech-icon-1 opacity-20 hover:opacity-100 transition-opacity duration-500"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" alt="Python" /></div>
      <div className="tech-icon tech-icon-2 opacity-20 hover:opacity-100 transition-opacity duration-500"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" className="w-16 h-16 md:w-20 md:h-20 filter invert drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" alt="Django" /></div>
      <div className="tech-icon tech-icon-3 opacity-20 hover:opacity-100 transition-opacity duration-500"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" alt="React" /></div>
      <div className="tech-icon tech-icon-4 opacity-20 hover:opacity-100 transition-opacity duration-500"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" alt="JavaScript" /></div>
      <div className="tech-icon tech-icon-5 opacity-20 hover:opacity-100 transition-opacity duration-500"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" alt="PostgreSQL" /></div>
      <div className="tech-icon tech-icon-6 opacity-20 hover:opacity-100 transition-opacity duration-500"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" alt="TypeScript" /></div>

      {/* Ambient background glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00E5FF]/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

      {/* Main Content Container - Box removed, back to floating text */}
      <div className="max-w-7xl mx-auto text-center relative z-10 mb-16 md:mb-20">
        
        {/* Simple, Professional Badge */}
        <div className="inline-flex items-center gap-3 bg-[#030712]/50 backdrop-blur-md border border-[#00E5FF]/30 rounded-full px-5 py-2 mb-8 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
          <span className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_8px_#00E5FF]"></span>
          <span className="text-sm text-[#00E5FF] tracking-wider uppercase font-medium">Web Developer</span>
        </div>
        
        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 flex flex-wrap justify-center gap-3 md:gap-5 tracking-tight">
          <span className="text-[#00E5FF] inline-block hover:scale-105 transition-transform duration-300 cursor-default drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            Yuri
          </span>
          <span className="text-white inline-block hover:scale-105 transition-transform duration-300 cursor-default">
            Mauricio
          </span>
        </h1>
        
        {/* Your Original Quote */}
        <div className="h-20 mb-6 flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl text-gray-400 font-light flex items-center justify-center gap-2">
            <span>Still learning. Always building. Never settling.</span>
            <span className="animate-wave inline-block ml-2 text-[#00E5FF]">😽</span>
          </h2>
        </div>
        
        {/* Standard, Clear Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4">
          <a href="#projects" className="group relative px-8 py-4 bg-[#00E5FF]/10 backdrop-blur-sm border border-[#00E5FF] text-[#00E5FF] font-semibold rounded-none transition-all duration-300 hover:bg-[#00E5FF] hover:text-[#030712] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] w-full sm:w-auto text-center flex items-center justify-center gap-2">
            <span className="tracking-wide">View Projects</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
          
          <a href="#contact" className="group px-8 py-4 bg-transparent border border-gray-700 text-gray-300 font-semibold rounded-none transition-all duration-300 hover:border-[#00E5FF]/50 hover:text-[#00E5FF] w-full sm:w-auto text-center flex items-center justify-center gap-2">
            <span className="tracking-wide">Contact Me</span>
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <a href="#about" className="flex flex-col items-center text-gray-500 hover:text-[#00E5FF] transition-colors group">
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <div className="w-5 h-8 border border-gray-600 rounded-sm group-hover:border-[#00E5FF] group-hover:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all flex justify-center">
            <div className="w-1 h-2 bg-[#00E5FF] rounded-sm mt-1 animate-scroll"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;