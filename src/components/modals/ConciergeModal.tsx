import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PhoneCall, CheckCircle2 } from 'lucide-react';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [urgency, setUrgency] = useState('Immediate (Within 15 mins)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      setSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg glass-card rounded-3xl border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8 z-10 gold-glow my-auto text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
            <PhoneCall className="w-6 h-6" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-1">
            VIP Protocol
          </span>

          <h3 className="text-2xl font-serif text-white">Direct Senior Concierge Handoff</h3>

          {submitted ? (
            <div className="py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-semibold text-white">Callback Dispatched</h4>
              <p className="text-xs text-white/70 max-w-xs mx-auto">
                Senior Officer Jean-Pierre will connect to <strong className="text-[#D4AF37]">{phone}</strong> under confidential protocol within 15 minutes.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-2xl bg-[#D4AF37] text-[#090D16] font-bold text-xs uppercase"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
              <div>
                <label className="text-xs text-white/70 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lady Victoria Sinclair"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs text-white/70 block mb-1">Confidential Phone / Signal</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+41 22 819 0000"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs text-white/70 block mb-1">Urgency Window</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option className="bg-[#090D16]" value="Immediate (Within 15 mins)">Immediate (Within 15 mins)</option>
                  <option className="bg-[#090D16]" value="Within 2 Hours">Within 2 Hours</option>
                  <option className="bg-[#090D16]" value="Scheduled Evening Call">Scheduled Evening Call</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#090D16] font-bold text-xs uppercase tracking-wider shadow-lg"
                >
                  Dispatch Priority Callback
                </button>
              </div>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
