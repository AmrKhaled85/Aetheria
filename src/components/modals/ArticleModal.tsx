import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, Share2 } from 'lucide-react';
import type { JournalArticle } from '../../types';

interface ArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

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
          className="relative w-full max-w-3xl glass-card rounded-3xl border border-white/20 shadow-2xl overflow-hidden z-10 my-auto p-6 sm:p-10 max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#D4AF37]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                {article.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-white font-medium leading-tight">
                {article.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-white/50 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1.5 text-[#D4AF37]">
                  <User className="w-3.5 h-3.5" />
                  {article.author} ({article.authorTitle})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden border border-white/10">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4 text-sm text-white/80 font-light leading-relaxed">
              {article.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs text-white/50">
              <span>Published: {article.date}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Essay link copied to clipboard.');
                }}
                className="flex items-center gap-1.5 text-[#D4AF37] hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Essay
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
