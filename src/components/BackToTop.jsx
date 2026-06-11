import React from 'react';

const BackToTop = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-[#0B1B2E]/80 backdrop-blur-md border border-[#00E5FF]/50 text-[#00E5FF] w-12 h-12 rounded-sm shadow-[0_0_10px_rgba(0,229,255,0.1)] transition-all duration-500 hover:bg-[#00E5FF] hover:text-[#030712] hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] hover:-translate-y-1 z-40 flex items-center justify-center group ${
        show ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-8'
      }`}
      aria-label="Back to top"
    >
      {/* HUD-style corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>

      <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default BackToTop;