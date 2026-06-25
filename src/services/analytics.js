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
    this.isTracking = false;
    this.pendingEvents = [];
    this.maxRetries = 3;
    this.retryDelay = 1000;
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

  // Check if we should track (skip admin pages)
  shouldTrack() {
    return !window.location.pathname.startsWith('/admin');
  }

  // Initialize tracking
  init() {
    console.log('🚀 Analytics.init() called');
    
    // Don't initialize on admin pages
    if (!this.shouldTrack()) {
      console.log('⏭️ Skipping analytics on admin page');
      return;
    }

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
      } else {
        // User came back - reset start time for accurate tracking
        this.startTime = Date.now();
      }
    });

    // Track SPA navigation (for React Router)
    this.trackSPANavigation();

    // Process any pending events that were queued before init
    this.processPendingEvents();
  }

  // Track Single Page Application navigation
  trackSPANavigation() {
    // Listen for history changes (React Router, Next.js, etc.)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    const self = this;

    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      self.handleRouteChange();
    };

    window.history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      self.handleRouteChange();
    };

    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', () => {
      self.handleRouteChange();
    });
  }

  handleRouteChange() {
    // Skip if on admin page
    if (!this.shouldTrack()) return;

    const newPath = window.location.pathname;
    if (this.page !== newPath) {
      console.log('🔄 Route changed from', this.page, 'to', newPath);
      this.page = newPath;
      // Reset start time for new page
      this.startTime = Date.now();
      // Track new page view
      setTimeout(() => {
        this.trackPageView();
      }, 200);
    }
  }

  // Process pending events
  async processPendingEvents() {
    if (this.pendingEvents.length === 0) return;
    
    console.log(`📦 Processing ${this.pendingEvents.length} pending events`);
    const events = [...this.pendingEvents];
    this.pendingEvents = [];
    
    for (const event of events) {
      await this.trackEvent(event.type, event.target);
    }
  }

  // Track page view
  async trackPageView() {
    // Skip if on admin page
    if (!this.shouldTrack()) return;

    try {
      console.log('📄 trackPageView called for path:', window.location.pathname);
      
      const response = await this.sendRequest('/track-event', {
        sessionId: this.sessionId,
        eventType: 'page_view',
        target: window.location.pathname || '/',
        timestamp: new Date().toISOString()
      });
      
      console.log('✅ Page view tracked:', response);
    } catch (error) {
      console.error('❌ Page view tracking failed:', error);
      // Queue the event for retry
      this.queueEvent('page_view', window.location.pathname);
    }
  }

  // Queue event for retry
  queueEvent(eventType, target) {
    this.pendingEvents.push({ type: eventType, target });
    console.log(`📦 Event queued: ${eventType} -> ${target}`);
  }

  // Send request with retry logic
  async sendRequest(endpoint, data, retryCount = 0) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (retryCount < this.maxRetries) {
        console.log(`🔄 Retrying request (${retryCount + 1}/${this.maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * (retryCount + 1)));
        return this.sendRequest(endpoint, data, retryCount + 1);
      }
      throw error;
    }
  }

  // Track scroll depth with throttling
  trackScrollDepth() {
    console.log('📜 trackScrollDepth called');
    let maxDepth = 0;
    let lastEmittedDepth = 0;
    let timeoutId = null;

    const updateScroll = () => {
      // Skip if on admin page
      if (!this.shouldTrack()) return;

      // Throttle scroll events
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        timeoutId = null;
        
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (docHeight <= 0) return;
        
        const depth = Math.round((scrollTop / docHeight) * 100);
        
        if (depth > maxDepth) {
          maxDepth = depth;
          this.scrollDepth = maxDepth;
          
          // Send scroll event at thresholds (25%, 50%, 75%, 90%, 100%)
          const thresholds = [25, 50, 75, 90, 100];
          const reachedThreshold = thresholds.find(t => 
            maxDepth >= t && lastEmittedDepth < t
          );
          
          if (reachedThreshold) {
            lastEmittedDepth = reachedThreshold;
            console.log('📜 Scroll depth reached:', maxDepth + '%');
            this.trackEvent('scroll', `${maxDepth}%`);
          }
        }
      }, 200); // Throttle to 200ms
    };

    // Use passive event listener for better performance
    window.addEventListener('scroll', updateScroll, { passive: true });
    // Also check on load
    setTimeout(updateScroll, 1000);
  }

  // Track time on page with improved accuracy
  trackTimeOnPage() {
    // Skip if on admin page
    if (!this.shouldTrack()) return;

    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
    if (timeSpent > 5) { // Only track if > 5 seconds
      console.log('⏱️ Time on page:', timeSpent + 's');
      this.trackEvent('time_on_page', `${timeSpent}s`);
    }
  }

  // Track custom events with batching support
  async trackEvent(eventType, target) {
    // Skip if on admin page
    if (!this.shouldTrack()) {
      console.log('⏭️ Skipping tracking on admin page');
      return;
    }

    try {
      console.log(`📤 Sending event: ${eventType} -> ${target}`);
      
      const response = await this.sendRequest('/track-event', {
        sessionId: this.sessionId,
        eventType: eventType,
        target: target,
        timestamp: new Date().toISOString(),
        screenSize: `${window.innerWidth}x${window.innerHeight}`
      });
      
      console.log(`✅ Event tracked (${eventType}):`, response);
    } catch (error) {
      console.error('❌ Event tracking failed:', error);
      // Queue the event for retry
      this.queueEvent(eventType, target);
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

  // Track project gallery view
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

  // Track performance metrics
  trackPerformance() {
    // Skip if on admin page
    if (!this.shouldTrack()) return;

    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
      
      console.log('⏱️ Performance metrics:', { loadTime, domReady });
      
      if (loadTime > 0) {
        this.trackEvent('performance_load', `${loadTime}ms`);
      }
    }
  }
}

// Singleton instance
console.log('📊 Creating AnalyticsService instance...');
const analytics = new AnalyticsService();

// Auto-initialize if not in admin
if (!window.location.pathname.startsWith('/admin')) {
  setTimeout(() => {
    analytics.init();
    
    // Track performance after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        analytics.trackPerformance();
      }, 1000);
    });
  }, 0);
}

console.log('✅ AnalyticsService instance created');

export default analytics;