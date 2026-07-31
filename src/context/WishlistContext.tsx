import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aetheria_wishlist');
      return saved ? JSON.parse(saved) : ['dest-1', 'villa-1'];
    } catch {
      return ['dest-1', 'villa-1'];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('aetheria_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isInWishlist = (id: string) => wishlistIds.includes(id);

  const clearWishlist = () => setWishlistIds([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
