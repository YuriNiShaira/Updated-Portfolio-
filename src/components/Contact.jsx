import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    window.location.href = `mailto:yurimauricio0404@gmail.com?subject=Contact from ${name}&body=${message}%0A%0AReply to: ${email}`;
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Sci-Fi Section Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#00E5FF] text-sm tracking-widest uppercase font-semibold">05.</span>
            <span className="w-12 h-[1px] bg-[#00E5FF]/50"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Get In <span className="text-[#00E5FF]">Touch</span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-xl text-center text-base font-light">
            Feel free to reach out for opportunities, collaborations, or just to say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          
          {/* Social Links Panel */}
          <div className="space-y-8 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-white tracking-wide border-b border-gray-800 pb-4 mb-2">
              Connect Online
            </h3>
            
            <div className="flex items-center space-x-5 group cursor-pointer">
              <div className="w-12 h-12 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-sm flex items-center justify-center group-hover:bg-[#00E5FF] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300">
                <svg className="w-5 h-5 text-[#00E5FF] group-hover:text-[#030712] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Email</p>
                <a href="mailto:yurimauricio0404@gmail.com" className="text-gray-300 font-light hover:text-[#00E5FF] transition-colors">yurimauricio0404@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center space-x-5 group cursor-pointer">
              <div className="w-12 h-12 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-sm flex items-center justify-center group-hover:bg-[#00E5FF] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300">
                <svg className="w-5 h-5 text-[#00E5FF] group-hover:text-[#030712] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Github</p>
                <a href="https://github.com/YuriNiShaira" target="_blank" rel="noreferrer" className="text-gray-300 font-light hover:text-[#00E5FF] transition-colors">@YuriNiShaira</a>
              </div>
            </div>

            <div className="flex items-center space-x-5 group cursor-pointer">
              <div className="w-12 h-12 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-sm flex items-center justify-center group-hover:bg-[#00E5FF] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300">
                <svg className="w-5 h-5 text-[#00E5FF] group-hover:text-[#030712] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">LinkedIn</p>
                <a href="https://www.linkedin.com/in/yuri-mauricio-993b3b396/" target="_blank" rel="noreferrer" className="text-gray-300 font-light hover:text-[#00E5FF] transition-colors">Yuri Mauricio</a>
              </div>
            </div>

            <div className="flex items-center space-x-5 group cursor-pointer">
              <div className="w-12 h-12 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-sm flex items-center justify-center group-hover:bg-[#00E5FF] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300">
                <svg className="w-5 h-5 text-[#00E5FF] group-hover:text-[#030712] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .592 0 1.324v21.351C0 23.408.597 24 1.325 24H12.82v-9.294H9.692V11.29h3.128V8.414c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.417h-3.12V24h6.116C23.403 24 24 23.408 24 22.675V1.324C24 .592 23.403 0 22.675 0z" /></svg>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Facebook</p>
                <a href="https://www.facebook.com/yuri.mauricio.52" target="_blank" rel="noreferrer" className="text-gray-300 font-light hover:text-[#00E5FF] transition-colors">Yuri Mauricio</a>
              </div>
            </div>

            <div className="flex items-center space-x-5 group cursor-pointer">
              <div className="w-12 h-12 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-sm flex items-center justify-center group-hover:bg-[#00E5FF] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300">
                <svg className="w-5 h-5 text-[#00E5FF] group-hover:text-[#030712] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.338 3.608 1.313.975.975 1.25 2.242 1.312 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.337-2.633 1.312-3.608.975-.975 2.242-1.25 3.608-1.312C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.773.128 4.633.394 3.678 1.35 2.723 2.305 2.457 3.445 2.399 4.724 2.341 6.004 2.329 6.413 2.329 12s.012 5.996.07 7.276c.058 1.279.324 2.419 1.279 3.374.955.955 2.095 1.221 3.374 1.279C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.279-.058 2.419-.324 3.374-1.279.955-.955 1.221-2.095 1.279-3.374.058-1.28.07-1.689.07-7.276s-.012-5.996-.07-7.276c-.058-1.279-.324-2.419-1.279-3.374-.955-.955-2.095-1.221-3.374-1.279C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0-2.88 0 1.44 1.44 0 0 0 2.88 0z" /></svg>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Instagram</p>
                <a href="https://www.instagram.com/yurinishaira/" target="_blank" rel="noreferrer" className="text-gray-300 font-light hover:text-[#00E5FF] transition-colors">@yurinishaira</a>
              </div>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="bg-[#0B1B2E]/40 backdrop-blur-md border border-[#00E5FF]/20 border-t-2 border-t-[#00E5FF] rounded-sm p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl font-semibold text-white tracking-wide mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-mono tracking-widest uppercase text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="w-full px-4 py-3 bg-[#030712]/50 border border-gray-700 rounded-sm focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] text-gray-200 transition-all font-light" 
                  placeholder="Your Name" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono tracking-widest uppercase text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full px-4 py-3 bg-[#030712]/50 border border-gray-700 rounded-sm focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] text-gray-200 transition-all font-light" 
                  placeholder="your.email@example.com" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono tracking-widest uppercase text-gray-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  className="w-full px-4 py-3 bg-[#030712]/50 border border-gray-700 rounded-sm focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] text-gray-200 transition-all resize-none font-light" 
                  placeholder="How can I help you?" 
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full px-6 py-4 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF] font-semibold tracking-widest uppercase text-sm rounded-sm hover:bg-[#00E5FF] hover:text-[#030712] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] flex justify-center items-center gap-2 group"
              >
                Transmit Message
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;