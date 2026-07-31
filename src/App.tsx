import { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistProvider } from './context/WishlistContext';
import { AudioProvider } from './context/AudioContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CinematicHero } from './components/hero/CinematicHero';
import { DestinationShowcase } from './components/sections/DestinationShowcase';
import { VillaCharterCurator } from './components/sections/VillaCharterCurator';
import { InteractiveItineraryBuilder } from './components/sections/InteractiveItineraryBuilder';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { TravelStats } from './components/sections/TravelStats';
import { TestimonialsPress } from './components/sections/TestimonialsPress';
import { HauteJournal } from './components/sections/HauteJournal';
import { ExclusiveMembership } from './components/sections/ExclusiveMembership';

import { DestinationDetailModal } from './components/modals/DestinationDetailModal';
import { BookingModal } from './components/modals/BookingModal';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { ConciergeModal } from './components/modals/ConciergeModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { AuthModal } from './components/modals/AuthModal';

import type { Destination, JournalArticle } from './types';

function MainApp() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [bookingAddonIds, setBookingAddonIds] = useState<string[]>([]);
  const [bookingTotalPrice, setBookingTotalPrice] = useState<number | undefined>(undefined);

  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('aetheria_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem('aetheria_user', JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('aetheria_user');
  };

  const handleOpenBooking = (dest?: Destination | null) => {
    if (dest) {
      setSelectedDestination(dest);
    }
    setBookingAddonIds([]);
    setBookingTotalPrice(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithAddons = (addonIds: string[], totalPrice: number) => {
    setBookingAddonIds(addonIds);
    setBookingTotalPrice(totalPrice);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F4F0EA] relative selection:bg-[#D4AF37]/30 selection:text-[#FFF8E7]">
      
      {/* Header Bar */}
      <Navbar
        user={user}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Hero Section */}
      <CinematicHero
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Featured Destinations */}
      <DestinationShowcase
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onOpenBookingWithDest={(dest) => handleOpenBooking(dest)}
      />

      {/* Private Estates & Charters */}
      <VillaCharterCurator
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Itinerary Customizer */}
      <InteractiveItineraryBuilder
        onOpenBookingWithAddons={handleOpenBookingWithAddons}
      />

      {/* Why Choose Us - Bento Box */}
      <WhyChooseUs />

      {/* Travel Stats Metrics */}
      <TravelStats />

      {/* Press & Client Accolades */}
      <TestimonialsPress />

      {/* Haute Journal Articles */}
      <HauteJournal
        onSelectArticle={(article) => setSelectedArticle(article)}
      />

      {/* Exclusive Society Access */}
      <ExclusiveMembership />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onOpenBooking={(dest) => handleOpenBooking(dest)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDestination={selectedDestination}
        initialAddonIds={bookingAddonIds}
        initialTotalPrice={bookingTotalPrice}
      />

      <WishlistDrawer
        onOpenBooking={() => handleOpenBooking()}
      />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <WishlistProvider>
        <AudioProvider>
          <MainApp />
        </AudioProvider>
      </WishlistProvider>
    </CurrencyProvider>
  );
}
