import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 px-6 bg-[#030712] border-t border-[#00E5FF]/20 relative z-10 overflow-hidden">
      
      {/* Subtle top edge glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: System Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"></span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[#00E5FF] opacity-80">
            System.Online
          </span>
        </div>

        {/* Center: Brand & Copyright */}
        <div className="flex items-center text-center">
          <span className="text-gray-500 text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} 
            <span className="text-white font-bold ml-3">YURI</span>
            <span className="text-[#00E5FF] font-bold drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]">.MAURICIO</span>
            <span className="ml-3 hidden sm:inline text-gray-600">// All Rights Reserved</span>
          </span>
        </div>

        {/* Right: Tech Stack / Build Info */}
        <div className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-gray-500 flex gap-2">
          <span className="hidden md:inline">Engine:</span>
          <span className="text-[#00E5FF] hover:text-white transition-colors cursor-default">React</span>
          <span className="text-gray-600">|</span>
          <span className="text-[#00E5FF] hover:text-white transition-colors cursor-default">Tailwind</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;