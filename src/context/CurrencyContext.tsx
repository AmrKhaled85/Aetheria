import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Currency } from '../types';
import { CURRENCIES } from '../data/mockData';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (priceInUSD: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = Math.round(priceInUSD * config.rate);
    return `${config.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
