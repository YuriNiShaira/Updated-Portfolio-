import React, { useState, useEffect, useCallback } from 'react';

// Reuse same image import logic
const imageModules = import.meta.glob('/src/assets/*.{jpg,jpeg,png}', { eager: true });
const imageMap = {};
Object.keys(imageModules).forEach(path => {
  const filename = path.split('/').pop();
  imageMap[filename] = imageModules[path].default;
});

const ProjectModal = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = project?.images.map(img => imageMap[img]) || [];

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next, onClose]);

  if (!images.length) return null;

  return (
    <div className="fixed inset-0 bg-[#030712]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all" onClick={onClose}>
      <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute -top-12 right-0 text-gray-400 hover:text-[#00E5FF] transition-colors z-10 group flex items-center gap-2">
          <span className="text-xs tracking-widest uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        {/* Main Gallery Container */}
        <div className="relative bg-[#0B1B2E] border border-[#00E5FF]/20 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="relative aspect-video bg-[#030712] flex items-center justify-center">
            <img src={images[currentIndex]} className="max-w-full max-h-[70vh] object-contain" alt={project.title} />
          </div>
          
          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button 
                onClick={prev} 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#030712]/60 backdrop-blur-sm border border-transparent hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 text-white hover:text-[#00E5FF] w-12 h-12 rounded-sm flex items-center justify-center transition-all shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={next} 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#030712]/60 backdrop-blur-sm border border-transparent hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 text-white hover:text-[#00E5FF] w-12 h-12 rounded-sm flex items-center justify-center transition-all shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
          
          {/* Image Counter Badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#030712]/80 backdrop-blur-sm border border-[#00E5FF]/30 text-[#00E5FF] px-4 py-1.5 rounded-sm text-xs font-mono tracking-widest shadow-[0_0_10px_rgba(0,229,255,0.1)]">
            [ {currentIndex + 1} / {images.length} ]
          </div>
        </div>
        
        {/* Thumbnails */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-[#00E5FF]/50 hover:scrollbar-thumb-[#00E5FF] scrollbar-track-[#030712]/50">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentIndex(idx)} 
              className={`flex-shrink-0 relative w-24 h-16 cursor-pointer rounded-sm overflow-hidden transition-all duration-300 ${idx === currentIndex ? 'border border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.4)] scale-105' : 'border border-transparent opacity-50 hover:opacity-100 hover:border-[#00E5FF]/50'}`}
            >
              <img src={img} className="w-full h-full object-cover" alt={`${project.title} thumbnail ${idx + 1}`} />
              {/* Subtle blue overlay on inactive thumbnails */}
              {idx !== currentIndex && <div className="absolute inset-0 bg-[#0B1B2E]/20"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;