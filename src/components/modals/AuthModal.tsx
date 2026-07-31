import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('sterling@aetheria.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Lord Alexander Sterling');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const loggedName = name || email.split('@')[0];
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuccess({ name: loggedName, email });
        setIsSuccess(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-md glass-card rounded-3xl border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 z-10 gold-glow my-auto text-center overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-1">
            VIP Portal Access
          </span>

          <h3 className="text-2xl font-serif text-white">
            {mode === 'signin' ? 'Sign In to Aetheria' : 'Join Imperial Society'}
          </h3>

          <p className="text-xs text-white/60 mt-1 font-light">
            {mode === 'signin'
              ? 'Access private estate buyouts and member-only itineraries.'
              : 'Create your private credentials for exclusive travel privileges.'}
          </p>

          {isSuccess ? (
            <div className="py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-serif text-white font-medium">
                Authenticated Successfully
              </h4>
              <p className="text-xs text-[#D4AF37]">Welcome, {name || email}!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
              {mode === 'signup' && (
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#C4B59D] font-bold block mb-1">
                    Full Name & Title
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-[#D4AF37] absolute left-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lord Alexander Sterling"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#C4B59D] font-bold block mb-1">
                  Private Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sterling@aetheria.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#C4B59D] font-bold block mb-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="w-4 h-4 text-[#D4AF37] absolute left-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#090D16] font-bold text-xs uppercase tracking-wider transition-all shadow-lg gold-glow flex items-center justify-center gap-2"
                >
                  <span>{mode === 'signin' ? 'Sign In To Account' : 'Register Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="text-center pt-3 border-t border-white/10 text-xs text-white/60">
                {mode === 'signin' ? (
                  <p>
                    Don't have a private account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-[#D4AF37] font-semibold hover:underline"
                    >
                      Request Membership
                    </button>
                  </p>
                ) : (
                  <p>
                    Already a registered member?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="text-[#D4AF37] font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
