import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowUpRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../../data/mockData';
import type { JournalArticle } from '../../types';

interface HauteJournalProps {
  onSelectArticle: (article: JournalArticle) => void;
}

export const HauteJournal: React.FC<HauteJournalProps> = ({ onSelectArticle }) => {
  return (
    <section id="journal" className="py-24 bg-[#090D16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Private Journal
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              Stories & Destination Secrets
            </h2>
          </div>

          <p className="text-sm text-white/70 max-w-md font-light leading-relaxed">
            Essays on oceanic stewardship, high-altitude culinary pairings, and private island aviation logistics.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <motion.article
              key={article.id}
              whileHover={{ y: -6 }}
              onClick={() => onSelectArticle(article)}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 glass-card-hover cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/70 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-white/50 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 mt-2 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                  <span>Read Essay</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
