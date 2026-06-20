const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class AnalyticsService {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.initialized = false;
    this.startTime = Date.now();
    this.scrollDepth = 0;
    this.page = window.location.pathname;
  }

  // Get or create session ID (stored in localStorage for persistence)
  getOrCreateSessionId() {
    let sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID ? crypto.randomUUID() : 
        'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => Math.random().toString(16).slice(2, 3));
      localStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  // Initialize tracking
  init() {
    if (this.initialized) return;
    this.initialized = true;

    // Set page title
    document.title = document.title || 'Portfolio';
    
    // Track initial page view
    this.trackPageView();

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
      await fetch(`${API_URL}/track-page`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          path: window.location.pathname,
          title: document.title,
          referrer: document.referrer,
          screenSize: `${window.innerWidth}x${window.innerHeight}`,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.debug('Analytics: Page view tracking failed', error);
    }
  }

  // Track scroll depth
  trackScrollDepth() {
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
      this.trackEvent('time_on_page', `${timeSpent}s`);
    }
  }

  // Track custom events (project clicks, resume downloads, etc.)
  async trackEvent(eventType, target) {
    try {
      await fetch(`${API_URL}/track-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          eventType,
          target,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.debug('Analytics: Event tracking failed', error);
    }
  }

  // Track project view
  trackProjectView(projectTitle) {
    this.trackEvent('project_view', projectTitle);
  }

  // Track resume download
  trackResumeDownload() {
    this.trackEvent('resume_download', 'Resume PDF');
  }

  // Track social click
  trackSocialClick(platform) {
    this.trackEvent('social_click', platform);
  }

  // Track contact form submission
  trackContactForm() {
    this.trackEvent('contact_form', 'Message Sent');
  }

  // Track link click
  trackLinkClick(linkName) {
    this.trackEvent('link_click', linkName);
  }
}

// Singleton instance
const analytics = new AnalyticsService();
export default analytics;