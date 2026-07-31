import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plane, UtensilsCrossed, Navigation, Anchor, Check, ArrowRight } from 'lucide-react';
import { CUSTOM_EXPERIENCES } from '../../data/mockData';
import { useCurrency } from '../../context/CurrencyContext';

interface ItineraryBuilderProps {
  onOpenBookingWithAddons: (addonIds: string[], totalPrice: number) => void;
}

export const InteractiveItineraryBuilder: React.FC<ItineraryBuilderProps> = ({
  onOpenBookingWithAddons,
}) => {
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['exp-1', 'exp-2']);
  const { formatPrice } = useCurrency();

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const basePrice = 12000;
    const addonsTotal = CUSTOM_EXPERIENCES.filter((exp) =>
      selectedAddonIds.includes(exp.id)
    ).reduce((sum, item) => sum + item.price, 0);
    return basePrice + addonsTotal;
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-5 h-5 text-[#D4AF37]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-[#D4AF37]" />;
      case 'Navigation':
        return <Navigation className="w-5 h-5 text-[#D4AF37]" />;
      case 'Anchor':
        return <Anchor className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="itinerary" className="py-24 bg-[#090D16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Trip Customizer
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Build Your Custom Dream Trip
          </h2>
          <p className="text-sm text-white/70 mt-3 font-light leading-relaxed">
            Choose your private flights, Michelin dining, and underwater adventures to build a personalized luxury package.
          </p>
        </div>

        {/* Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Grid */}
          <div className="lg:col-span-8 space-y-4">
            {CUSTOM_EXPERIENCES.map((exp) => {
              const isSelected = selectedAddonIds.includes(exp.id);

              return (
                <motion.div
                  key={exp.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => toggleAddon(exp.id)}
                  className={`p-6 rounded-3xl cursor-pointer border transition-all duration-300 flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#151D2A]/90 border-[#D4AF37] shadow-xl gold-glow'
                      : 'glass-card border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl border ${isSelected ? 'bg-[#D4AF37]/20 border-[#D4AF37]' : 'bg-white/5 border-white/10'}`}>
                      {renderIcon(exp.iconName)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-serif text-white font-medium">
                          {exp.name}
                        </h4>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-[#C4B59D]">
                          {exp.category}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1 font-light leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-sm font-bold font-mono text-[#D4AF37]">
                      +{formatPrice(exp.price)}
                    </span>
                    <div className={`mt-2 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-[#090D16]' : 'border-white/30 text-transparent'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37]">
                  Package Summary
                </span>
                <span className="text-[10px] text-white/50">{selectedAddonIds.length} Extra Experiences</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-white/80">
                  <span>Base Villa Suite Accommodation</span>
                  <span className="font-mono text-white">{formatPrice(12000)}</span>
                </div>

                {CUSTOM_EXPERIENCES.filter((e) => selectedAddonIds.includes(e.id)).map((item) => (
                  <div key={item.id} className="flex justify-between text-white/60">
                    <span className="truncate max-w-[200px]">• {item.name}</span>
                    <span className="font-mono text-[#D4AF37]">+{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/50 uppercase block">Estimated Trip Total</span>
                  <span className="text-2xl font-bold text-[#D4AF37] font-mono">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenBookingWithAddons(selectedAddonIds, calculateTotal())}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#090D16] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <span>Reserve Custom Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-white/40 text-center">
                Includes private airport greeting and 24/7 personal customer support.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
