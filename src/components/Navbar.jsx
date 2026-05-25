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
    <nav className={`fixed w-full z-50 transition-all duration-500 py-4 px-6 lg:px-8 ${scrolled ? 'bg-[#0A192F]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" className="group relative">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#facc15] to-[#fbbf24] bg-clip-text text-transparent">Yuri</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#facc15] group-hover:w-full transition-all duration-300"></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <div className="flex space-x-1 bg-[#112240]/50 backdrop-blur-sm rounded-2xl p-1 border border-gray-800/50">
            {navLinks.map(link => (
              <a key={link} href={`#${link}`} className="px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 hover:bg-[#facc15] hover:text-[#0A192F] hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </div>
          {/* Updated Resume button - points to local PDF in public folder */}
          <a href="/Yurisho_Mauricio_Resume.pdf" download className="ml-2 px-5 py-2.5 bg-[#facc15] text-[#0A192F] text-sm font-medium rounded-xl hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all duration-300 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-12 h-12 bg-[#112240] rounded-xl border border-gray-800 text-gray-200 hover:text-[#facc15] focus:outline-none transition-all duration-300 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute left-4 right-4 top-20 bg-[#112240]/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl py-4 px-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <a key={link} href={`#${link}`} onClick={() => setIsOpen(false)} className="px-4 py-3 text-gray-300 hover:text-[#facc15] hover:bg-[#1A2A3A] rounded-xl transition-all duration-300">
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
            {/* Updated mobile resume button */}
            <a href="/Yurisho_Mauricio_Resume.pdf" download className="mt-2 mx-2 px-4 py-3 bg-[#facc15] text-[#0A192F] font-medium rounded-xl flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;