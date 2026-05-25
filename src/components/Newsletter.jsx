import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="w-full py-24 px-6 bg-[#050508] border-t border-white/5 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">Join the Aura Club</h3>
        <p className="text-white/40 mb-8 text-sm md:text-base">Subscribe for exclusive drops, early access, and performance insights.</p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto theme-adaptive" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <button type="submit" className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-cyan-400 transition-colors font-medium">
            Join <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}