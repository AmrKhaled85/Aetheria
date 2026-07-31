import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import type { Destination } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';

interface ModalProps {
  destination: Destination | null;
  onClose: () => void;
  onOpenBooking: (dest: Destination) => void;
}

export const DestinationDetailModal: React.FC<ModalProps> = ({
  destination,
  onClose,
  onOpenBooking,
}) => {
  if (!destination) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const { formatPrice } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isBookmarked = isInWishlist(destination.id);
  const allImages = [destination.mainImage, ...destination.galleryImages];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-white/20 shadow-2xl overflow-hidden z-10 my-auto"
        >
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#D4AF37] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Gallery Column (5 cols) */}
            <div className="md:col-span-6 bg-black/40 p-6 flex flex-col justify-between space-y-4">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={allImages[activeImageIdx]}
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={() => toggleWishlist(destination.id)}
                  className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md border ${
                    isBookmarked ? 'bg-[#D4AF37] text-[#090D16] border-[#D4AF37]' : 'bg-black/60 text-white border-white/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#D4AF37] scale-105' : 'border-white/10 opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Column (6 cols) */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{destination.country} • {destination.region}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                  {destination.title}
                </h2>

                <p className="text-xs text-white/50">{destination.subtitle}</p>

                <div className="flex items-center gap-4 text-xs text-white/80 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <span className="font-bold text-white">{destination.rating}</span>
                  </div>
                  <span>•</span>
                  <span>Climate: {destination.climateTemp}</span>
                  <span>•</span>
                  <span className="text-[#C4B59D]">Best: {destination.bestMonths}</span>
                </div>

                <p className="text-xs text-white/70 font-light leading-relaxed pt-2">
                  {destination.description}
                </p>

                {/* Features */}
                <div className="pt-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2">
                    Included VIP Services
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {destination.features.map((f, i) => (
                      <div key={i} className="text-[11px] text-white/80 flex items-center gap-1.5 p-1.5 rounded-lg bg-white/5 border border-white/5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block">Price Per Night</span>
                  <span className="text-2xl font-bold font-mono text-[#D4AF37]">
                    {formatPrice(destination.pricePerNight)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking(destination);
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#090D16] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg gold-glow"
                >
                  <span>Reserve Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
