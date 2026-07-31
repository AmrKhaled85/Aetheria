import React, { useState, useEffect } from 'react';
import { Compass, Heart, Phone, Menu, X, Sparkles, User, LogOut, ChevronDown } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

interface UserState {
  name: string;
  email: string;
}

interface NavbarProps {
  user: UserState | null;
  onOpenConcierge: () => void;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenConcierge, onOpenAuth, onSignOut }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { wishlistIds, setIsWishlistOpen } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090D16]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center text-[#090D16] font-bold shadow-md group-hover:scale-105 transition-transform">
              <span className="font-cinzel text-base font-extrabold tracking-wider">Æ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg font-bold tracking-[0.18em] text-white group-hover:text-[#D4AF37] transition-colors leading-none">
                AETHERIA
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C4B59D] mt-0.5 font-medium">
                Luxury Travel
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-white/80">
            <a href="#expeditions" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-1">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              Destinations
            </a>
            <a href="#estates" className="hover:text-[#D4AF37] transition-colors py-1">
              Villas & Charters
            </a>
            <a href="#itinerary" className="hover:text-[#D4AF37] transition-colors py-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Custom Trip
            </a>
            <a href="#why-us" className="hover:text-[#D4AF37] transition-colors py-1">
              Why Choose Us
            </a>
            <a href="#journal" className="hover:text-[#D4AF37] transition-colors py-1">
              Travel Journal
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#D4AF37]/50 text-white/80 hover:text-[#D4AF37] transition-all"
              title="Saved Items"
            >
              <Heart className="w-4 h-4" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#D4AF37] text-[#090D16] text-[10px] font-bold flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Auth / User Pill */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#FFF5D6] text-xs font-medium transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#090D16] font-bold text-[10px] flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-card rounded-2xl border border-white/15 shadow-2xl p-3 z-50">
                    <div className="p-2 border-b border-white/10 mb-2">
                      <span className="text-xs font-bold text-white block truncate">{user.name}</span>
                      <span className="text-[10px] text-white/50 block truncate">{user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        onSignOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D4AF37]/50 bg-white/5 hover:bg-[#D4AF37] hover:text-[#090D16] text-[#FFF5D6] text-xs font-semibold uppercase tracking-wider transition-all duration-300"
              >
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Sign In</span>
              </button>
            )}

            {/* VIP Concierge Button */}
            <button
              onClick={onOpenConcierge}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#090D16] text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </button>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-xl border border-white/10 text-white/80"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/90 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-white/10 px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-3 text-xs font-medium uppercase tracking-wider text-white/80">
            <a
              href="#expeditions"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D4AF37] py-1 border-b border-white/5"
            >
              Destinations
            </a>
            <a
              href="#estates"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D4AF37] py-1 border-b border-white/5"
            >
              Villas & Charters
            </a>
            <a
              href="#itinerary"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D4AF37] py-1 border-b border-white/5"
            >
              Custom Trip
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D4AF37] py-1 border-b border-white/5"
            >
              Why Choose Us
            </a>
            <a
              href="#journal"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D4AF37] py-1 border-b border-white/5"
            >
              Travel Journal
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            {user ? (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">{user.name}</span>
                  <span className="text-[10px] text-[#D4AF37]">Logged In</span>
                </div>
                <button
                  onClick={() => {
                    onSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 text-xs"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> Sign In
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#090D16] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
