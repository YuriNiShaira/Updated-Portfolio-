import React from 'react';

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Chakra UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chakraui/chakraui-original.svg' }
    ]
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', invert: true },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', invert: true },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-plain.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' }
    ]
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { name: 'Swagger', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
      { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg' }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Sci-Fi Section Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#00E5FF] text-sm tracking-widest uppercase font-semibold">02.</span>
            <span className="w-12 h-[1px] bg-[#00E5FF]/50"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Technical <span className="text-[#00E5FF]">Arsenal</span>
          </h2>
        </div>

        <p className="text-gray-400 font-light text-center mb-16 max-w-2xl mx-auto">
          Technologies and systems initialized during academic training and independent project development.
        </p>

        {/* Stack of Categories */}
        <div className="flex flex-col gap-16 max-w-5xl mx-auto">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-col gap-10">
              
              {/* Category Subheading (Sci-Fi Data Divider style) */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent"></div>
                <h3 className="relative px-6 bg-[#030712] text-sm md:text-base font-semibold text-[#00E5FF] tracking-widest uppercase shadow-[0_0_15px_#030712]">
                  {category.title}
                </h3>
              </div>

              {/* Grid Layout for Orbs */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-8 md:gap-10 justify-items-center">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center text-center group cursor-default">
                    
                    {/* The Sci-Fi Orb */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4 flex items-center justify-center rounded-full bg-[#0B1B2E]/50 backdrop-blur-sm border border-[#00E5FF]/20 shadow-[inset_0_0_15px_rgba(0,229,255,0.05)] transition-all duration-500 group-hover:border-[#00E5FF]/60 group-hover:bg-[#0B1B2E]/80 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2),inset_0_0_20px_rgba(0,229,255,0.1)] group-hover:-translate-y-2">
                      
                      {/* Inner glowing core for hover effect */}
                      <div className="absolute inset-0 rounded-full bg-[#00E5FF]/0 group-hover:bg-[#00E5FF]/5 transition-colors duration-500"></div>
                      
                      {/* Icon */}
                      <img 
                        src={skill.icon} 
                        className={`relative z-10 w-10 h-10 md:w-12 md:h-12 opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] ${skill.invert ? 'filter invert' : ''}`} 
                        alt={skill.name} 
                      />
                    </div>

                    {/* Skill Text */}
                    <span className="text-xs tracking-wider uppercase font-medium text-gray-500 group-hover:text-[#00E5FF] transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;