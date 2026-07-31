import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';

export const TestimonialsPress: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIdx];

  return (
    <section className="py-24 bg-[#090D16] relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Global Accolades
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Words of Distinction
          </h2>
        </div>

        {/* Testimonial Card Slider */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl relative">
          <Quote className="w-16 h-16 text-[#D4AF37]/15 absolute top-6 left-6 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 relative z-10 text-center sm:text-left"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-lg sm:text-2xl font-serif text-white italic font-normal leading-relaxed">
                "{current.quote}"
              </p>

              {/* Author Details */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.clientName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{current.clientName}</h4>
                    <p className="text-xs text-[#D4AF37]">{current.title} • <span className="text-white/50">{current.source}</span></p>
                  </div>
                </div>

                <div className="text-xs text-white/50 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  Booked: {current.destinationBooked}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-white/10 hover:border-[#D4AF37] text-white/80 hover:text-[#D4AF37] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-white/10 hover:border-[#D4AF37] text-white/80 hover:text-[#D4AF37] transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
