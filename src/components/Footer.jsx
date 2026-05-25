import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-[#050508] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-2xl font-medium tracking-widest text-white uppercase">
          Aura
        </h1>
        
        <div className="flex gap-8 text-sm text-white/40 font-medium theme-adaptive">
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}