import React, { useState } from 'react';

// Reuse same image import logic
const imageModules = import.meta.glob('/src/assets/*.{jpg,jpeg,png}', { eager: true });
const imageMap = {};
Object.keys(imageModules).forEach(path => {
  const filename = path.split('/').pop();
  imageMap[filename] = imageModules[path].default;
});

const ProjectModal = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = project.images.map(img => imageMap[img]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!images.length) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-[#facc15] transition-colors z-10">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="relative bg-[#0A192F] rounded-xl overflow-hidden">
          <div className="relative aspect-video bg-[#1A2A3A] flex items-center justify-center">
            <img src={images[currentIndex]} className="max-w-full max-h-[70vh] object-contain" alt={project.title} />
          </div>
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#facc15] text-white hover:text-[#0A192F] w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#facc15] text-white hover:text-[#0A192F] w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
            {currentIndex+1} / {images.length}
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#facc15] scrollbar-track-gray-800">
          {images.map((img, idx) => (
            <img key={idx} src={img} onClick={() => setCurrentIndex(idx)} className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${idx === currentIndex ? 'opacity-100 border-2 border-[#facc15]' : 'opacity-60 hover:opacity-100'}`} alt={`thumb ${idx}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;