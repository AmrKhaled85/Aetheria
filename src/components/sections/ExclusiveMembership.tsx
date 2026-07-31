import React, { useState } from 'react';
import { KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';

export const ExclusiveMembership: React.FC = () => {
  const [invited, setInvited] = useState(false);
  const [email, setEmail] = useState('');

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setInvited(true);
    }
  };

  return (
    <section className="py-24 bg-[#050810] relative overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-card p-8 sm:p-14 rounded-3xl border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden text-center gold-glow">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto mb-6">
            <KeyRound className="w-7 h-7" />
          </div>

          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold block mb-2">
            By Invitation Only
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight max-w-2xl mx-auto">
            The Aetheria Private Society
          </h2>

          <p className="text-sm text-white/70 max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Gain priority access to newly unlisted private islands, secret yacht charters before public release, and invitation-only sommelier harvests.
          </p>

          {invited ? (
            <div className="mt-8 max-w-md mx-auto p-4 rounded-2xl glass-pill border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Invitation Granted. VIP Pass: <strong className="font-mono text-white tracking-wider">AETH-2026-VIP</strong></span>
            </div>
          ) : (
            <form onSubmit={handleRequestAccess} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter private email..."
                required
                className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/20 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#090D16] text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 shrink-0"
              >
                <span>Request Key</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 text-[10px] uppercase tracking-widest text-white/40">
            Strict Confidentiality • Limited to 500 Global Members
          </div>

        </div>

      </div>
    </section>
  );
};
