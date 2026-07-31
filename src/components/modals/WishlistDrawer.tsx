import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { DESTINATIONS, VILLAS_AND_CHARTERS } from '../../data/mockData';
import { useCurrency } from '../../context/CurrencyContext';

interface WishlistDrawerProps {
  onOpenBooking: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onOpenBooking }) => {
  const { isWishlistOpen, setIsWishlistOpen, wishlistIds, toggleWishlist, clearWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  if (!isWishlistOpen) return null;

  // Find saved items
  const savedDestinations = DESTINATIONS.filter((d) => wishlistIds.includes(d.id));
  const savedVillas = VILLAS_AND_CHARTERS.filter((v) => wishlistIds.includes(v.id));

  const totalEstimate = savedDestinations.reduce((acc, item) => acc + item.pricePerNight * 7, 0) +
    savedVillas.reduce((acc, item) => acc + item.pricePerNight * 7, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full glass-card border-l border-white/20 shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                <h3 className="text-xl font-serif text-white font-medium">Saved Sanctuaries</h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {wishlistIds.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Heart className="w-12 h-12 text-white/20 mx-auto" />
                <p className="text-xs text-white/60">No saved sanctuaries in your wishlist yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedDestinations.map((item) => (
                  <div key={item.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <img src={item.mainImage} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
                      <p className="text-[10px] text-white/50">{item.country}</p>
                      <span className="text-xs font-mono text-[#D4AF37] font-bold block mt-1">
                        {formatPrice(item.pricePerNight)}/night
                      </span>
                    </div>
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="p-2 text-white/40 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {savedVillas.map((item) => (
                  <div key={item.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                      <p className="text-[10px] text-white/50">{item.location}</p>
                      <span className="text-xs font-mono text-[#D4AF37] font-bold block mt-1">
                        {formatPrice(item.pricePerNight)}/night
                      </span>
                    </div>
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="p-2 text-white/40 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {wishlistIds.length > 0 && (
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-white/60">Estimated 7-Night Package:</span>
                <span className="font-mono text-[#D4AF37] font-bold text-base">{formatPrice(totalEstimate)}</span>
              </div>

              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-2xl bg-[#D4AF37] text-[#090D16] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg gold-glow"
              >
                <span>Request Portfolio Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={clearWishlist}
                className="w-full text-center text-[10px] text-white/40 hover:text-white/70 uppercase tracking-widest"
              >
                Clear All Saved Items
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
