'use client';

import { useCart } from './CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      isBundle: product.isBundle,
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <Link href={`/producto/${product.id}`} className="block relative">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.originalPrice && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                OFERTA
              </span>
            )}
            {product.isBundle && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                PACK
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {product.category}
        </p>

        {/* Title */}
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Savings Badge */}
        {product.savings && (
          <div className="mb-4 bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full inline-block">
            Ahorras ${product.savings.toFixed(2)}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-orange-500 transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
}
