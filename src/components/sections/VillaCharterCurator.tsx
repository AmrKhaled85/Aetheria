import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Users, BedDouble, Navigation, Star } from 'lucide-react';
import { VILLAS_AND_CHARTERS } from '../../data/mockData';
import type { VillaCategory } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface VillaCharterProps {
  onOpenBooking: () => void;
}

export const VillaCharterCurator: React.FC<VillaCharterProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<VillaCategory | 'All'>('All');
  const { formatPrice } = useCurrency();

  const categories: (VillaCategory | 'All')[] = ['All', 'Islands', 'Yacht Charters', 'Chateaux', 'Safaris'];

  const filteredVillas = activeTab === 'All'
    ? VILLAS_AND_CHARTERS
    : VILLAS_AND_CHARTERS.filter((v) => v.category === activeTab);

  return (
    <section id="estates" className="py-24 bg-[#050810] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Private Estates & Charters
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Exclusive Sanctuary Portfolio
          </h2>
          <p className="text-sm text-white/70 mt-3 font-light leading-relaxed">
            Reserved entirely for single-party buyouts, equipped with private helipads, dedicated culinary teams, and round-the-clock butler service.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-full glass-pill border border-white/15 flex flex-wrap justify-center gap-2 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === cat
                    ? 'bg-[#D4AF37] text-[#090D16] shadow-lg gold-glow scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Display */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredVillas.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-3xl overflow-hidden border border-white/10 glass-card-hover flex flex-col md:flex-row"
              >
                {/* Left Image */}
                <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/70 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1 text-xs text-white font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Right Details */}
                <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C4B59D] font-semibold block">
                      {item.location}
                    </span>
                    <h3 className="text-xl font-serif text-white font-medium mt-1">
                      {item.name}
                    </h3>

                    {/* Capacity & Amenities Icons */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-white/80">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Up to {item.guests} Guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{item.bedrooms} Master Suites</span>
                      </div>
                      {item.butlerIncluded && (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Crown className="w-3.5 h-3.5" />
                          <span>24/7 Butler</span>
                        </div>
                      )}
                      {item.helipad && (
                        <div className="flex items-center gap-2 text-[#D4AF37]">
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Helipad Access</span>
                        </div>
                      )}
                    </div>

                    {/* Highlights bullet points */}
                    <ul className="mt-4 space-y-1.5">
                      {item.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="text-[11px] text-white/70 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Booking Trigger */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/40 uppercase block">Buyout Rate</span>
                      <span className="text-lg font-bold text-[#D4AF37] font-mono">
                        {formatPrice(item.pricePerNight)}
                      </span>
                      <span className="text-[10px] text-white/40"> / night</span>
                    </div>

                    <button
                      onClick={onOpenBooking}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#090D16] text-xs font-bold transition-all"
                    >
                      Inquire Buyout
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
