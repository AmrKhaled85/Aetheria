import React from 'react';
import { TRAVEL_STATS } from '../../data/mockData';

export const TravelStats: React.FC = () => {
  return (
    <section className="py-16 bg-[#050810] border-y border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TRAVEL_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4">
              <span className="text-3xl sm:text-5xl font-bold font-mono gold-gradient-text">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C4B59D]/80 font-semibold mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
