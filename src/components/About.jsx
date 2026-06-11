import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Sci-Fi Section Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#00E5FF] text-sm tracking-widest uppercase font-semibold">01.</span>
            <span className="w-12 h-[1px] bg-[#00E5FF]/50"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            System <span className="text-[#00E5FF]">Profile</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Text & Skills */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
              Fresh Graduate 
              <span className="text-[#00E5FF]">|</span> 
              Full Stack Developer
            </h3>
            
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <p>
                I'm a recent IT graduate passionate about building secure and scalable web applications. 
                What I lack in professional experience, I make up for with enthusiasm, quick learning, and a 
                strong mindset.
              </p>
              <p>
                I have spent a lot of time building personal projects, experimenting with new technologies,
                and leveling up my skills so I can stay on top of modern development practices.
                I am always looking for ways to make apps not just work, but work exceptionally well for real people.
              </p>
            </div>

            {/* Tags / Badges */}
            <div className="pt-2">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Core Competencies</p>
              <div className="flex flex-wrap gap-2.5">
                {['Django/Flask', 'Fast API', 'API Development', 'JWT Auth', 'Database Design', 'Debugging', 'Problem Solver', 'Fast Learner', 'Continuous Learning', 'Adaptable', 'Friendly', 'Troubleshooting'].map(skill => (
                  <span 
                    key={skill} 
                    className="px-4 py-1.5 bg-[#0B1B2E]/80 text-[#00E5FF] rounded-sm text-xs tracking-wide font-medium border border-[#00E5FF]/20 hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Cards */}
          <div className="space-y-6">
            
            {/* Education Card */}
            <div className="glass-card rounded-sm p-6 border-l-4 border-l-[#00E5FF]">
              <div className="flex items-start space-x-4">
                <div className="text-[#00E5FF] text-3xl font-bold tracking-tighter mt-1">BSIT</div>
                <div className="text-gray-300">
                  <span className="block text-white font-medium mb-1">Bachelor of Science in Information Technology</span>
                  <span className="text-sm text-gray-400 font-light flex items-center gap-2">
                    Class of 2026 <span className="w-1 h-1 rounded-full bg-[#00E5FF]"></span> General De Jesus College
                  </span>
                </div>
              </div>
            </div>

            {/* Focus Card */}
            <div className="glass-card rounded-sm p-6 group">
              <h4 className="text-sm tracking-widest uppercase font-semibold text-[#00E5FF] mb-4 flex items-center">
                <svg className="w-4 h-4 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Current Focus
              </h4>
              <ul className="space-y-3 text-gray-400 font-light text-sm">
                <li className="flex items-center"><span className="text-[#00E5FF] mr-3">▹</span> API Development & Architecture</li>
                <li className="flex items-center"><span className="text-[#00E5FF] mr-3">▹</span> Advanced Web Technologies</li>
                <li className="flex items-center"><span className="text-[#00E5FF] mr-3">▹</span> Complex Problem Solving</li>
              </ul>
            </div>

            {/* Seeking Card */}
            <div className="glass-card rounded-sm p-6 group">
              <h4 className="text-sm tracking-widest uppercase font-semibold text-[#00E5FF] mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Target Roles
              </h4>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Open to backend and full-stack opportunities where I can contribute to building secure, highly scalable systems.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;