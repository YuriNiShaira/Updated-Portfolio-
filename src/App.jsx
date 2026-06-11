import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Learning from './components/Learning';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    // Generate fewer, more deliberate "Data Nodes" instead of stars
    const nodeCount = 40;
    const newNodes = Array.from({ length: nodeCount }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1, // Smaller, sharper dots
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
    setStars(newNodes);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animations for each section
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [learningRef, learningInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="starry-bg relative min-h-screen">
      
      {/* CSS Grid Overlay for a HUD feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0"></div>

      {/* Render Data Nodes - ADDED 'absolute', 'rounded-full', and 'bg-[#00E5FF]' */}
      {stars.map((node, i) => (
        <div
          key={i}
          className="data-node absolute rounded-full bg-[#00E5FF]"
          style={{
            left: `${node.left}%`,
            top: `${node.top}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            animationDuration: `${node.duration}s`,
            animationDelay: `${node.delay}s`,
          }}
        />
      ))}

      <Navbar />

      <div ref={heroRef} className={`fade-in ${heroInView ? 'visible' : ''}`}>
        <Hero />
      </div>
      <div ref={aboutRef} className={`fade-in ${aboutInView ? 'visible' : ''}`}>
        <About />
      </div>
      <div ref={skillsRef} className={`fade-in ${skillsInView ? 'visible' : ''}`}>
        <Skills />
      </div>
      <div ref={projectsRef} className={`fade-in ${projectsInView ? 'visible' : ''}`}>
        <Projects />
      </div>
      <div ref={learningRef} className={`fade-in ${learningInView ? 'visible' : ''}`}>
        <Learning />
      </div>
      <div ref={contactRef} className={`fade-in ${contactInView ? 'visible' : ''}`}>
        <Contact />
      </div>

      <Footer />
      <BackToTop show={showBackToTop} />
    </div>
  );
}

export default App;