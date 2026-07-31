import React from 'react';
import { motion } from 'framer-motion';
import { Crown, ShieldCheck, Leaf, Lock, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-[#050810] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              The Aetheria Promise
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Why Travel With Us
          </h2>
          <p className="text-sm text-white/70 mt-3 font-light leading-relaxed">
            The key reasons why discerning travelers choose Aetheria for their luxury trips around the globe.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1 - Large Span (2 Cols) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 glass-card p-8 rounded-3xl border border-white/10 glass-card-hover flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-all duration-500" />
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-6">
                <Crown className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold block mb-1">
                VIP Care
              </span>
              <h3 className="text-2xl font-serif text-white font-medium">
                24/7 Personal Butler & Fast Airport Clearance
              </h3>
              <p className="text-xs text-white/70 mt-3 font-light leading-relaxed max-w-lg">
                Enjoy seamless airport transfers, private jet tarmac greetings, and round-the-clock personal butler support throughout your stay.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#D4AF37] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Fast-Track Airport Service Guarantee</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-3xl border border-white/10 glass-card-hover flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                Sustainability
              </span>
              <h3 className="text-xl font-serif text-white font-medium">
                100% Eco-Friendly Aviation
              </h3>
              <p className="text-xs text-white/70 mt-3 font-light leading-relaxed">
                We contribute a portion of every booking directly toward global ocean and coral reef protection.
              </p>
            </div>

            <div className="mt-6 text-[11px] text-white/50">
              Verified Sustainable Travel
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-3xl border border-white/10 glass-card-hover flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold block mb-1">
                Privacy
              </span>
              <h3 className="text-xl font-serif text-white font-medium">
                Complete Privacy & Security
              </h3>
              <p className="text-xs text-white/70 mt-3 font-light leading-relaxed">
                Private villa buyouts and non-disclosure agreements to ensure total peace of mind for your family.
              </p>
            </div>

            <div className="mt-6 text-[11px] text-white/50">
              100% Confidential
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
