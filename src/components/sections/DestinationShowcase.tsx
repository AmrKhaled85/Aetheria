import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../../data/mockData';
import type { Destination } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';

interface DestinationShowcaseProps {
  onSelectDestination: (dest: Destination) => void;
  onOpenBookingWithDest: (dest: Destination) => void;
}

export const DestinationShowcase: React.FC<DestinationShowcaseProps> = ({
  onSelectDestination,
  onOpenBookingWithDest,
}) => {
  const { formatPrice } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <section id="expeditions" className="py-24 bg-[#090D16] relative overflow-hidden">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Curated Sanctuaries
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              Featured Luxury Expeditions
            </h2>
          </div>

          <p className="text-sm text-white/70 max-w-md font-light leading-relaxed">
            Hand-picked private overwater retreats, alpine chateaux, and game reserves reserved for discerning travelers.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, idx) => {
            const isBookmarked = isInWishlist(dest.id);

            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group relative rounded-3xl overflow-hidden glass-card glass-card-hover border border-white/10 flex flex-col justify-between"
              >
                {/* Card Top Image & Badges */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={dest.mainImage}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-black/30" />

                  {/* Tag Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/60 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                      {dest.tag}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(dest.id);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full border backdrop-blur-md transition-all ${
                      isBookmarked
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-[#090D16]'
                        : 'bg-black/40 border-white/20 text-white/80 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-xs font-semibold text-white">
                    <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                    <span>{dest.rating}</span>
                    <span className="text-white/50 text-[10px]">({dest.reviewsCount})</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#C4B59D] uppercase tracking-widest font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{dest.country} • {dest.region}</span>
                    </div>

                    <h3
                      onClick={() => onSelectDestination(dest)}
                      className="text-xl font-serif font-medium text-white group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      {dest.title}
                    </h3>

                    <p className="text-xs text-white/60 line-clamp-2 mt-2 font-light leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  {/* Features Tag List */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {dest.features.slice(0, 3).map((feat, fIdx) => (
                      <span key={fIdx} className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 text-white/70 border border-white/5">
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Price & Action Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/50 uppercase tracking-wider block">Rates From</span>
                      <span className="text-lg font-bold text-[#D4AF37] font-mono">
                        {formatPrice(dest.pricePerNight)}
                      </span>
                      <span className="text-[10px] text-white/40 font-normal"> / night</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectDestination(dest)}
                        className="px-3.5 py-2 rounded-xl text-xs text-white/80 hover:text-white border border-white/10 hover:border-white/30 transition-all"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onOpenBookingWithDest(dest)}
                        className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#090D16] text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
