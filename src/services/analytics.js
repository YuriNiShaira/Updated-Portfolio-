const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('📊 Analytics service loaded, API_URL:', API_URL);

class AnalyticsService {
  constructor() {
    console.log('🔧 AnalyticsService constructor called');
    this.sessionId = this.getOrCreateSessionId();
    this.initialized = false;
    this.startTime = Date.now();
    this.scrollDepth = 0;
    this.page = window.location.pathname;
    console.log('✅ AnalyticsService initialized with sessionId:', this.sessionId);
  }

  // Get or create session ID (stored in localStorage for persistence)
  getOrCreateSessionId() {
    console.log('🔑 getOrCreateSessionId called');
    let sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID ? crypto.randomUUID() : 
        'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => Math.random().toString(16).slice(2, 3));
      localStorage.setItem('analytics_session_id', sessionId);
      console.log('🆕 New session ID created:', sessionId);
    } else {
      console.log('🔄 Existing session ID found:', sessionId);
    }
    return sessionId;
  }

  // Initialize tracking
  init() {
    console.log('🚀 Analytics.init() called');
    if (this.initialized) {
      console.log('⚠️ Analytics already initialized');
      return;
    }
    this.initialized = true;
    console.log('✅ Analytics initialized');

    // Set page title
    document.title = document.title || 'Portfolio';
    
    // Track initial page view after a small delay
    setTimeout(() => {
      console.log('📄 Tracking initial page view');
      this.trackPageView();
    }, 100);

    // Track scroll depth
    this.trackScrollDepth();

    // Track time on page when user leaves
    window.addEventListener('beforeunload', () => {
      this.trackTimeOnPage();
    });

    // Track page visibility change (tab switch)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackTimeOnPage();
      }
    });
  }

  // Track page view
  async trackPageView() {
    try {
      console.log('📄 trackPageView called for path:', window.location.pathname);
      
      const response = await fetch(`${API_URL}/track-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          sessionId: this.sessionId, 
          eventType: 'page_view',
          target: window.location.pathname || '/',
          timestamp: new Date().toISOString()
        })
      });
      
      const data = await response.json();
      console.log('✅ Page view tracked:', data);
    } catch (error) {
      console.error('❌ Page view tracking failed:', error);
    }
  }

  // Track scroll depth
  trackScrollDepth() {
    console.log('📜 trackScrollDepth called');
    let maxDepth = 0;
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = Math.round((scrollTop / docHeight) * 100);
      
      if (depth > maxDepth) {
        maxDepth = depth;
        this.scrollDepth = maxDepth;
        
        // Send scroll event at thresholds (25%, 50%, 75%, 100%)
        const thresholds = [25, 50, 75, 100];
        if (thresholds.includes(maxDepth) && maxDepth > 0) {
          console.log('📜 Scroll depth reached:', maxDepth + '%');
          this.trackEvent('scroll', `${maxDepth}%`);
        }
      }
    };

    window.addEventListener('scroll', updateScroll);
    // Also check on load
    setTimeout(updateScroll, 1000);
  }

  // Track time on page
  trackTimeOnPage() {
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
    if (timeSpent > 5) { // Only track if > 5 seconds
      console.log('⏱️ Time on page:', timeSpent + 's');
      this.trackEvent('time_on_page', `${timeSpent}s`);
    }
  }

  // Track custom events (project clicks, resume downloads, etc.)
  async trackEvent(eventType, target) {
    try {
      console.log(`📤 Sending event: ${eventType} -> ${target}`);
      
      const response = await fetch(`${API_URL}/track-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          sessionId: this.sessionId, 
          eventType: eventType,
          target: target,
          timestamp: new Date().toISOString()
        })
      });
      
      const data = await response.json();
      console.log(`✅ Event tracked (${eventType}):`, data);
    } catch (error) {
      console.error('❌ Event tracking failed:', error);
    }
  }

  // Track project view
  trackProjectView(projectTitle) {
    console.log('📁 Project view:', projectTitle);
    this.trackEvent('project_view', projectTitle);
  }

  // Track resume download
  trackResumeDownload() {
    console.log('📄 Resume download tracked');
    this.trackEvent('resume_download', 'Resume PDF');
  }

  // Track social click
  trackSocialClick(platform) {
    console.log('🔗 Social click:', platform);
    this.trackEvent('social_click', platform);
  }

  // Track contact form submission
  trackContactForm() {
    console.log('📧 Contact form submission tracked');
    this.trackEvent('contact_form', 'Message Sent');
  }

  // Track link click
  trackLinkClick(linkName) {
    console.log('🔗 Link click:', linkName);
    this.trackEvent('link_click', linkName);
  }

  trackProjectGalleryView(projectTitle) {
    console.log('📁 Project gallery view:', projectTitle);
    this.trackEvent('project_gallery_view', projectTitle);
  }

  // Track project GitHub click
  trackProjectGitHubClick(projectTitle) {
    console.log('🐙 Project GitHub click:', projectTitle);
    this.trackEvent('project_github_click', projectTitle);
  }

  // Track project Live Demo click
  trackProjectLiveDemoClick(projectTitle) {
    console.log('🚀 Project Live Demo click:', projectTitle);
    this.trackEvent('project_live_demo_click', projectTitle);
  }
}

// Singleton instance
console.log('📊 Creating AnalyticsService instance...');
const analytics = new AnalyticsService();
console.log('✅ AnalyticsService instance created');

export default analytics;