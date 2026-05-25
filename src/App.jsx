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

    // Generate random stars
    const starCount = 200;
    const newStars = Array.from({ length: starCount }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 2,
      delay: Math.random() * 5,
    }));
    setStars(newStars);

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
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
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