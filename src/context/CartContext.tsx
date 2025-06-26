import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  features?: string[];
  icon?: React.ReactNode;
}

interface CartContextType {
  items: Product[];
  totalItems: number;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setItems(prevItems => [...prevItems, product]);
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    totalItems: items.length,
    removeFromCart,
    clearCart,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 