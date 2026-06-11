import React from 'react';

const Learning = () => {
  const currentlyLearning = [
    { 
      name: 'Automation & Scripting', 
      description: 'Exploring Python scripting for automating tasks and improving efficiency.' 
    },
    { 
      name: 'System Design', 
      description: 'Scalable architecture, microservices, and database sharding.' 
    },
    { 
      name: 'AWS / Azure', 
      description: 'Exploring deployment, hosting, and cloud concepts.' 
    }
  ];

  const selfImprovement = [
    { 
      title: 'Communication Skills', 
      description: 'Improving speaking confidence, professional communication, and presenting ideas clearly.' 
    },
    { 
      title: 'Problem Solving', 
      description: 'Developing analytical thinking and approaching technical challenges effectively.' 
    },
    { 
      title: 'Professional Growth', 
      description: 'Building discipline, teamwork, adaptability, and continuous learning habits.' 
    }
  ];

  return (
    <section id="learning" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Sci-Fi Section Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#00E5FF] text-sm tracking-widest uppercase font-semibold">04.</span>
            <span className="w-12 h-[1px] bg-[#00E5FF]/50"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Continuous <span className="text-[#00E5FF]">Growth</span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-xl text-center text-base font-light">
            Here is what I am currently focused on learning and improving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Currently Learning Panel */}
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 border-t-2 border-t-[#00E5FF] rounded-sm p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:bg-[#0B1B2E]/60 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-4">
              <div className="p-2 bg-[#00E5FF]/10 rounded-sm text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-wide">Technical Learning</h3>
            </div>
            
            <div className="space-y-6">
              {currentlyLearning.map(item => (
                <div key={item.name} className="relative pl-5 border-l border-[#00E5FF]/30 hover:border-[#00E5FF] transition-colors duration-300">
                  {/* Subtle active indicator dot */}
                  <div className="absolute -left-[3px] top-1.5 w-1 h-3 bg-[#00E5FF] opacity-50 group-hover:opacity-100 transition-opacity rounded-full shadow-[0_0_8px_#00E5FF]"></div>
                  
                  <h4 className="text-[#00E5FF] font-medium text-base mb-1">{item.name}</h4>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Self Improvement Panel */}
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 border-t-2 border-t-[#00E5FF] rounded-sm p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:bg-[#0B1B2E]/60 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-4">
              <div className="p-2 bg-[#00E5FF]/10 rounded-sm text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-wide">Personal Growth</h3>
            </div>
            
            <div className="space-y-6">
              {selfImprovement.map(item => (
                <div key={item.title} className="relative pl-5 border-l border-[#00E5FF]/30 hover:border-[#00E5FF] transition-colors duration-300">
                  {/* Subtle active indicator dot */}
                  <div className="absolute -left-[3px] top-1.5 w-1 h-3 bg-[#00E5FF] opacity-50 group-hover:opacity-100 transition-opacity rounded-full shadow-[0_0_8px_#00E5FF]"></div>
                  
                  <h4 className="text-[#00E5FF] font-medium text-base mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Learning;