import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Shield, Award, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [times, setTimes] = useState({
    monaco: '',
    tokyo: '',
    newyork: '',
    dubai: ''
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        monaco: now.toLocaleTimeString('en-US', { timeZone: 'Europe/Monaco', hour: '2-digit', minute: '2-digit' }),
        tokyo: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }),
        newyork: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
        dubai: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' })
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050810] text-[#E2E8F0] pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      
      {/* Subtle background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Live Luxury Time Clocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl glass-card border border-white/10 mb-16">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] uppercase tracking-widest text-[#C4B59D]/70 font-semibold">Monaco Harbor</span>
            <span className="font-mono text-lg font-bold text-[#D4AF37]">{times.monaco || '20:45'}</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] uppercase tracking-widest text-[#C4B59D]/70 font-semibold">Tokyo Ginza</span>
            <span className="font-mono text-lg font-bold text-[#D4AF37]">{times.tokyo || '03:45'}</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] uppercase tracking-widest text-[#C4B59D]/70 font-semibold">New York Fifth Ave</span>
            <span className="font-mono text-lg font-bold text-[#D4AF37]">{times.newyork || '14:45'}</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[10px] uppercase tracking-widest text-[#C4B59D]/70 font-semibold">Dubai International</span>
            <span className="font-mono text-lg font-bold text-[#D4AF37]">{times.dubai || '22:45'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-[#0F172A] flex items-center justify-center text-[#D4AF37]">
                <span className="font-cinzel text-xl font-bold">Æ</span>
              </div>
              <span className="font-cinzel text-2xl font-bold tracking-[0.25em] text-white">
                AETHERIA
              </span>
            </div>
            
            <p className="text-sm text-white/70 leading-relaxed font-light max-w-md">
              Architects of unrepeatable luxury journeys, private island sanctuaries, and hyper-custom aviation expeditions for distinguished global travelers.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-3">
                Join The Private Gazette
              </span>

              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold p-3 glass-pill rounded-xl">
                  <CheckCircle className="w-4 h-4" />
                  Invitation granted. Welcome to Aetheria VIP Circle.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter private email address..."
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#090D16] text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Request Access
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
              Expeditions
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#expeditions" className="hover:text-white transition-colors">French Polynesia</a></li>
              <li><a href="#expeditions" className="hover:text-white transition-colors">Swiss Engadin Alps</a></li>
              <li><a href="#expeditions" className="hover:text-white transition-colors">Amalfi Cliff Estates</a></li>
              <li><a href="#expeditions" className="hover:text-white transition-colors">Kyoto Arashiyama</a></li>
              <li><a href="#expeditions" className="hover:text-white transition-colors">Serengeti Concession</a></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
              Estates & Charters
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#estates" className="hover:text-white transition-colors">Private Islands</a></li>
              <li><a href="#estates" className="hover:text-white transition-colors">Superyacht Charters</a></li>
              <li><a href="#estates" className="hover:text-white transition-colors">Alpine Chateaux</a></li>
              <li><a href="#estates" className="hover:text-white transition-colors">Private Jet Fleets</a></li>
              <li><a href="#estates" className="hover:text-white transition-colors">Wine Estates</a></li>
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
              Headquarters
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Place du Casino 12,<br />
              98000 Monte Carlo, Monaco<br />
              <span className="text-[#D4AF37]">concierge@aetheria-voyages.com</span>
            </p>

            <div className="pt-2 flex items-center gap-4 text-white/50 text-xs">
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Carbon Neutral</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Virtuoso Ultra VIP</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 AETHERIA Haute Expeditions Ltd. All Rights Reserved. Privacy & Confidentiality Shielded.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms of Distinction</a>
            <a href="#" className="hover:text-white transition-colors">Confidentiality Protocol</a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
