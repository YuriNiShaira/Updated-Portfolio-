import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-[#facc15]">About Me</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-200">
              Fresh Graduate <span className="text-[#facc15]">•</span> Full Stack Developer
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I'm a recent IT graduate passionate about building secure and scalable web applications. 
              What I lack in professional experience, I make up for with enthusiasm, quick learning, and a 
              good mindset.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I have spent a lot of time building personal projects, experimenting with new technologies,
              and leveling up my skills so I can stay on top of modern development practices.
              I am always looking for ways to make apps not just work, but work well for real people.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {['Django/Flask', 'Fast API', 'API Development', 'JWT Auth', 'Database Design', 'Debugging', 'Problem Solver', 'Fast Learner', 'Continuous Learning', 'Adaptable', 'Friendly', 'Basic troubleshooting'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-[#1A2A3A]/80 text-[#facc15] rounded-full text-sm font-medium border border-[#facc15]/20">{skill}</span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="text-[#facc15] text-3xl font-bold">BSIT</div>
                <div className="text-gray-300">
                  <span className="block text-gray-200 font-medium mb-1">Bachelor of Science in Information and Technology</span>
                  <span className="text-sm">Class of 2026 • General De Jesus College</span>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#facc15] mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                What I'm Focused On
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start"><span className="text-[#facc15] mr-2">•</span> API Development</li>
                <li className="flex items-start"><span className="text-[#facc15] mr-2">•</span> Learn advanced web development</li>
                <li className="flex items-start"><span className="text-[#facc15] mr-2">•</span> Improving my problem solving skill</li>
              </ul>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#facc15] mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Currently Looking For
              </h4>
              <p className="text-gray-300">Open to backend and full-stack opportunities where I can build secure, scalable systems.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;