import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DESTINATIONS, CUSTOM_EXPERIENCES } from '../../data/mockData';
import type { Destination } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: Destination | null;
  initialAddonIds?: string[];
  initialTotalPrice?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDestination,
  initialAddonIds = [],
  initialTotalPrice,
}) => {
  if (!isOpen) return null;

  const { formatPrice } = useCurrency();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [selectedDestId, setSelectedDestId] = useState<string>(
    initialDestination?.id || DESTINATIONS[0].id
  );
  const [checkIn, setCheckIn] = useState('2026-09-10');
  const [checkOut, setCheckOut] = useState('2026-09-17');
  const [guestsCount, setGuestsCount] = useState(2);
  const [suitesCount, setSuitesCount] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(initialAddonIds);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const currentDest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  const calculateTotal = () => {
    if (initialTotalPrice && step === 1) return initialTotalPrice;
    const destCost = currentDest.pricePerNight * 7 * suitesCount; // default 7 nights
    const addonsCost = CUSTOM_EXPERIENCES.filter((e) => selectedAddons.includes(e.id)).reduce(
      (sum, item) => sum + item.price,
      0
    );
    return destCost + addonsCost;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF5D6', '#0F2E28', '#FFFFFF']
        });
      } catch (err) {
        console.error('Confetti err:', err);
      }
      setStep(4);
    } else {
      setStep((prev) => (prev + 1) as any);
    }
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-3xl glass-card rounded-3xl border border-white/20 shadow-2xl overflow-hidden z-10 my-auto p-6 sm:p-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#D4AF37] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Stepper Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
              <span>Reserve Haute Voyage</span>
              <span>Step {step} of 4</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    step >= s ? 'bg-[#D4AF37]' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Destination & Dates */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-white">Select Sanctuary & Travel Dates</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#C4B59D] font-bold block mb-2">
                    Chosen Estate / Destination
                  </label>
                  <select
                    value={selectedDestId}
                    onChange={(e) => setSelectedDestId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.id} className="bg-[#090D16] text-white">
                        {d.title} ({d.country}) — {formatPrice(d.pricePerNight)}/night
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#C4B59D] font-bold block mb-1">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#C4B59D] font-bold block mb-1">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#090D16] font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Configure Suites & Addons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Suites & Addons */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-white">Suites & VIP Experiences</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-2xl border border-white/10">
                  <span className="text-xs text-white/70 block mb-1">Total Guests</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                      className="w-8 h-8 rounded-full border border-white/20 text-white font-bold"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-[#D4AF37]">{guestsCount}</span>
                    <button
                      onClick={() => setGuestsCount(guestsCount + 1)}
                      className="w-8 h-8 rounded-full border border-white/20 text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="glass-card p-4 rounded-2xl border border-white/10">
                  <span className="text-xs text-white/70 block mb-1">Master Suites</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSuitesCount(Math.max(1, suitesCount - 1))}
                      className="w-8 h-8 rounded-full border border-white/20 text-white font-bold"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-[#D4AF37]">{suitesCount}</span>
                    <button
                      onClick={() => setSuitesCount(suitesCount + 1)}
                      className="w-8 h-8 rounded-full border border-white/20 text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Addon Selector */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-3">
                  Include Private Charter Services
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {CUSTOM_EXPERIENCES.map((exp) => {
                    const isSel = selectedAddons.includes(exp.id);
                    return (
                      <div
                        key={exp.id}
                        onClick={() => toggleAddon(exp.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                          isSel ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white' : 'bg-white/5 border-white/10 text-white/70'
                        }`}
                      >
                        <div>
                          <span className="font-semibold block">{exp.name}</span>
                          <span className="text-[10px] text-white/50">{exp.description}</span>
                        </div>
                        <span className="font-mono text-[#D4AF37] font-bold">+{formatPrice(exp.price)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-2xl border border-white/20 text-white text-xs"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#090D16] font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Guest Info */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h3 className="text-2xl font-serif text-white">Lead Traveler Information</h3>

              <div>
                <label className="text-xs text-white/70 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Lord Alexander Sterling"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/70 block mb-1">Private Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@sterling.com"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/70 block mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7700 900077"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/70 block mb-1">Special Preferences / Dietary / Helipad Handoff</label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Require private jet tarmac greeting and vegan Michelin dining..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-between">
                <span className="text-xs text-white/80 font-medium">Estimated Voyage Investment</span>
                <span className="text-xl font-bold font-mono text-[#D4AF37]">{formatPrice(calculateTotal())}</span>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-2xl border border-white/20 text-white text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#090D16] font-bold text-xs uppercase tracking-wider shadow-lg gold-glow"
                >
                  Confirm Imperial Reservation
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Celebration & Voucher Confirmation */}
          {step === 4 && (
            <div className="text-center space-y-6 py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-3xl font-serif text-white">Voyage Confirmed</h3>

              <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                Your reservation for <strong className="text-[#D4AF37]">{currentDest.title}</strong> has been secured under protocol code <strong className="font-mono text-white">#AE-2026-889</strong>. Your dedicated Senior Concierge will contact you within 15 minutes.
              </p>

              <div className="p-6 rounded-2xl glass-card border border-white/15 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Lead Guest:</span>
                  <span className="text-white font-semibold">{fullName || 'Lord Sterling'}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Sanctuary:</span>
                  <span className="text-[#D4AF37] font-semibold">{currentDest.title}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Dates:</span>
                  <span className="text-white">{checkIn} to {checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Total Paid:</span>
                  <span className="text-[#D4AF37] font-bold font-mono text-sm">{formatPrice(calculateTotal())}</span>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl bg-[#D4AF37] text-[#090D16] font-bold text-xs uppercase tracking-wider"
                >
                  Return to Sanctuary
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
