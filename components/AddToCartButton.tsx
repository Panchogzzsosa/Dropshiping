'use client';

import { useCart } from './CartContext';
import { Product } from '@/lib/products';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      isBundle: product.isBundle,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
        added 
          ? 'bg-green-500 text-white' 
          : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30'
      }`}
    >
      {added ? (
        <>
          <Check className="h-5 w-5" />
          ¡Añadido al carrito!
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          Añadir al Carrito - ${product.price.toFixed(2)}
        </>
      )}
    </button>
  );
}
