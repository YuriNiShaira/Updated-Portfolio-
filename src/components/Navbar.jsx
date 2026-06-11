import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 lg:px-8 ${scrolled ? 'bg-[#030712]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,229,255,0.05)] border-b border-[#00E5FF]/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Sci-Fi Terminal Logo */}
        <a href="#home" className="group relative flex items-center gap-1">
          <span className="text-2xl font-bold text-white tracking-tighter">Y U</span>
          <span className="text-2xl font-bold text-[#00E5FF] tracking-tighter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">R I</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00E5FF] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#00E5FF]"></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="flex space-x-1 bg-[#0B1B2E]/60 backdrop-blur-sm rounded-sm p-1 border border-[#00E5FF]/20">
            {navLinks.map(link => (
              <a key={link} href={`#${link}`} className="px-5 py-2 text-xs tracking-widest uppercase font-semibold text-gray-300 rounded-sm transition-all duration-300 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]">
                {link}
              </a>
            ))}
          </div>
          
          {/* Cyberpunk Resume Button */}
          <a href="/Yurisho_Mauricio_Resume.pdf" download className="ml-4 px-5 py-2.5 bg-[#00E5FF]/10 border border-[#00E5FF] text-[#00E5FF] text-xs tracking-widest uppercase font-semibold rounded-sm hover:bg-[#00E5FF] hover:text-[#030712] hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300 flex items-center gap-2 group">
            <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-12 h-12 bg-transparent rounded-sm border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/10 focus:outline-none transition-all duration-300 flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.1)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute left-4 right-4 top-20 bg-[#0B1B2E]/95 backdrop-blur-xl border border-[#00E5FF]/30 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4 px-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <a key={link} href={`#${link}`} onClick={() => setIsOpen(false)} className="px-4 py-3 text-xs tracking-widest uppercase text-gray-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/5 rounded-sm transition-all duration-300 border-l-2 border-transparent hover:border-[#00E5FF]">
                {link}
              </a>
            ))}
            {/* Updated mobile resume button */}
            <a href="/Yurisho_Mauricio_Resume.pdf" download className="mt-4 mx-2 px-4 py-3 bg-[#00E5FF]/10 border border-[#00E5FF] text-[#00E5FF] text-xs tracking-widest uppercase font-semibold rounded-sm flex items-center justify-center gap-2 hover:bg-[#00E5FF] hover:text-[#030712] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              EXTRACT_DATA
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;