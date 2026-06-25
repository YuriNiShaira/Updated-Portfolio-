import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Learning from './components/Learning';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import analytics from './services/analytics';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

// Analytics wrapper component
const AnalyticsWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    if (!location.pathname.startsWith('/admin')) {
      // Small delay to ensure the page is rendered
      setTimeout(() => {
        analytics.trackPageView();
      }, 100);
    }
  }, [location.pathname]);

  return children;
};

// Main portfolio component
const Portfolio = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate stars only once
    const nodeCount = 40;
    const newNodes = Array.from({ length: nodeCount }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
    setStars(newNodes);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="starry-bg relative min-h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0"></div>

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
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Learning />
      <Contact />
      <Footer />
      <BackToTop show={showBackToTop} />
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  useEffect(() => {
    // Initialize analytics only once
    analytics.init();

    // Track initial page view
    setTimeout(() => {
      if (!window.location.pathname.startsWith('/admin')) {
        analytics.trackPageView();
      }
    }, 500);

    // Track performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        analytics.trackPerformance();
      }, 1000);
    });

    // Track 404 errors
    if (window.location.pathname !== '/' && !window.location.pathname.startsWith('/admin')) {
      // Check if it's a valid route (you can expand this check)
      const validRoutes = ['/', '/about', '/skills', '/projects', '/learning', '/contact'];
      if (!validRoutes.includes(window.location.pathname)) {
        analytics.track404Error(window.location.pathname);
      }
    }

    // Listen for storage changes (for logout)
    const handleStorageChange = (e) => {
      if (e.key === 'adminToken') {
        setIsLoggedIn(!!e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <AnalyticsWrapper>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Main Portfolio Routes */}
          <Route path="/" element={<Portfolio />} />
          <Route path="/about" element={<Portfolio />} />
          <Route path="/skills" element={<Portfolio />} />
          <Route path="/projects" element={<Portfolio />} />
          <Route path="/learning" element={<Portfolio />} />
          <Route path="/contact" element={<Portfolio />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </AnalyticsWrapper>
    </BrowserRouter>
  );
}

export default App;