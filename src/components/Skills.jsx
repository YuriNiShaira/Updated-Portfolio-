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
    title: 'Backend Development & Databases',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', invert: true },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', invert: true },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-plain.svg' },
      { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', invert: true },
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-[#facc15]">Technical Skills</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Technologies and tools I've worked with during my academic journey and personal projects
        </p>

        {/* Stack of Categories */}
        <div className="flex flex-col gap-16 max-w-5xl mx-auto">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-col gap-10">
              
              {/* Category Subheading */}
              <h3 className="text-xl font-semibold text-gray-200 tracking-wide border-b border-gray-800 pb-3 text-center">
                {category.title}
              </h3>

              {/* Grid Layout */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-8 md:gap-12 justify-items-center">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center text-center group cursor-default">
                    <img 
                      src={skill.icon} 
                      className={`w-12 h-12 md:w-16 md:h-16 mb-3 opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 ${skill.invert ? 'brightness-0 invert' : ''}`} 
                      alt={skill.name} 
                    />
                    <span className="text-xs md:text-sm text-gray-400 group-hover:text-[#facc15] transition-colors">
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