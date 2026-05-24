import React, { useEffect, useState } from 'react';

const BackToTop = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-[#facc15] text-[#0A192F] w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:-translate-y-1 z-40 flex items-center justify-center ${
        show ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
    </button>
  );
};

export default BackToTop;