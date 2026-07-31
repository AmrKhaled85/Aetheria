import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Users, MapPin, Compass, ChevronRight, Eye } from 'lucide-react';
import { DESTINATIONS } from '../../data/mockData';
import type { Destination } from '../../types';

interface HeroProps {
  onSelectDestination: (dest: Destination) => void;
  onOpenBooking: () => void;
}

export const CinematicHero: React.FC<HeroProps> = ({ onSelectDestination, onOpenBooking }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [showGuestPopover, setShowGuestPopover] = useState(false);
  const [viewMode, setViewMode] = useState<'cinematic' | 'map'>('cinematic');

  const currentDestination = DESTINATIONS[activeSlide % DESTINATIONS.length];

  const filteredDestinations = DESTINATIONS.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Background Image/Video Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDestination.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={currentDestination.mainImage}
              alt={currentDestination.title}
              className="w-full h-full object-cover"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090D16]/80 via-transparent to-[#090D16]/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating View Mode Switcher */}
      <div className="absolute top-24 right-6 z-20 hidden md:flex items-center gap-2 p-1.5 rounded-xl glass-pill border border-white/20">
        <button
          onClick={() => setViewMode('cinematic')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            viewMode === 'cinematic' ? 'bg-[#D4AF37] text-[#090D16] font-bold shadow-md' : 'text-white/80 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Photo Gallery
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            viewMode === 'map' ? 'bg-[#D4AF37] text-[#090D16] font-bold shadow-md' : 'text-white/80 hover:text-white'
          }`}
        >
          <Compass className="w-3.5 h-3.5" /> Interactive Map
        </button>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-6">
        
        {/* Subtitle Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="w-8 h-[2px] bg-[#D4AF37]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Luxury Travel & Private Charters
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="max-w-4xl space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-white leading-[1.1]">
            Explore Extraordinary Destinations <br />
            <span className="italic font-normal gold-gradient-text">In Pure Luxury.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light max-w-2xl leading-relaxed">
            Handpicked private islands, luxury villas, and exclusive charters designed for unforgettable journeys around the world.
          </p>
        </motion.div>

        {/* Dynamic Search & Booking Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 p-3 sm:p-4 rounded-2xl glass-card border border-white/20 shadow-2xl backdrop-blur-2xl max-w-5xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Destination Autocomplete Search */}
            <div className="md:col-span-5 relative">
              <label className="text-[10px] uppercase tracking-wider text-[#C4B59D] font-bold block mb-1 px-3">
                Destination or Villa
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-[#D4AF37] absolute left-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDestDropdown(true);
                  }}
                  onFocus={() => setShowDestDropdown(true)}
                  placeholder="Where would you like to go? (e.g. Bora Bora, Maldives)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {showDestDropdown && (
                <div className="absolute left-0 right-0 mt-2 glass-card rounded-2xl border border-white/15 shadow-2xl py-2 z-50 max-h-60 overflow-y-auto">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold">
                    Popular Destinations
                  </div>
                  {filteredDestinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => {
                        onSelectDestination(dest);
                        setSearchQuery(dest.title);
                        setShowDestDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="font-semibold text-white block">{dest.title}</span>
                        <span className="text-[10px] text-white/50">{dest.country}</span>
                      </div>
                      <span className="text-[10px] text-[#D4AF37] font-mono">${dest.pricePerNight.toLocaleString()}/night</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dates Selection */}
            <div className="md:col-span-3">
              <label className="text-[10px] uppercase tracking-wider text-[#C4B59D] font-bold block mb-1 px-3">
                Travel Dates
              </label>
              <div className="relative flex items-center">
                <Calendar className="w-4 h-4 text-[#D4AF37] absolute left-3.5" />
                <input
                  type="date"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>
            </div>

            {/* Guests Selector */}
            <div className="md:col-span-2 relative">
              <label className="text-[10px] uppercase tracking-wider text-[#C4B59D] font-bold block mb-1 px-3">
                Guests
              </label>
              <button
                onClick={() => setShowGuestPopover(!showGuestPopover)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 flex items-center justify-between hover:border-[#D4AF37]/50"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span>{guestCount} Guests</span>
                </div>
              </button>

              {showGuestPopover && (
                <div className="absolute right-0 mt-2 w-48 glass-card rounded-2xl border border-white/15 shadow-2xl p-4 z-50">
                  <span className="text-xs font-semibold text-white block mb-2">Number of Guests</span>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-8 h-8 rounded-full border border-white/20 text-white font-bold hover:border-[#D4AF37]"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-[#D4AF37]">{guestCount}</span>
                    <button
                      onClick={() => setGuestCount(guestCount + 1)}
                      className="w-8 h-8 rounded-full border border-white/20 text-white font-bold hover:border-[#D4AF37]"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search / Explore CTA */}
            <div className="md:col-span-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#090D16] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </motion.div>

        {/* Destination Showcase Controller */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
          
          {/* Active Highlight */}
          <div
            onClick={() => onSelectDestination(currentDestination)}
            className="flex items-center gap-4 cursor-pointer glass-card p-3 rounded-2xl border border-white/15 hover:border-[#D4AF37] transition-all group"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden">
              <img src={currentDestination.mainImage} alt={currentDestination.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block">Featured Destination</span>
              <h4 className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">{currentDestination.title}</h4>
              <p className="text-[10px] text-white/60">{currentDestination.region} • {currentDestination.climateTemp}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform ml-2" />
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center gap-3">
            {DESTINATIONS.slice(0, 4).map((dest, idx) => (
              <button
                key={dest.id}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeSlide % 4 === idx ? 'w-10 bg-[#D4AF37]' : 'w-3 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
