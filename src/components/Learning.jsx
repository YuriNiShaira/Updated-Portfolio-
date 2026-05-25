import React from 'react';

const Learning = () => {
  const currentlyLearning = [
    { 
      name: 'Linux', 
      description: 'Learning terminal commands, server navigation, and understanding Linux environments' 
    },
    { 
      name: 'System Design', 
      description: 'Scalable architecture, microservices, and database sharding' 
    },
    { 
      name: 'AWS/Azure', 
      description: 'Exploring deployment, hosting, and cloud concepts' 
    }
  ];

  const selfImprovement = [
    { 
      title: 'Communication Skills', 
      description: 'Improving speaking confidence, professional communication, and presenting ideas clearly' 
    },
    { 
      title: 'Problem Solving', 
      description: 'Developing analytical thinking and approaching technical challenges effectively' 
    },
    { 
      title: 'Professional Growth', 
      description: 'Building discipline, teamwork, adaptability, and continuous learning habits' 
    }
  ];

  return (
    <section id="learning" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-[#facc15]">Continuous</span> Growth
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Here's what I'm currently focused on.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Currently Learning */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-7 h-7 text-[#facc15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-200">Currently Learning</h3>
            </div>
            <div className="space-y-4">
              {currentlyLearning.map(item => (
                <div key={item.name} className="border-l-2 border-[#facc15]/40 pl-4">
                  <h4 className="text-[#facc15] font-medium text-base">{item.name}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Self Improvement */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-7 h-7 text-[#facc15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-200">Self Improvement</h3>
            </div>
            <div className="space-y-4">
              {selfImprovement.map(item => (
                <div key={item.title} className="border-l-2 border-[#facc15]/40 pl-4">
                  <h4 className="text-white font-medium text-base">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
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